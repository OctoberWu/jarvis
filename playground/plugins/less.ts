import { Plugin } from '../..';
import { NextHandleFunction } from 'connect';
import { cleanUrl } from '../../src/node/utils';
import { readFile } from 'fs/promises';
import postcss from 'postcss';
import atImport from 'postcss-import';
import less from 'less';
import { dirname } from 'path';

export function lessPlugin(): Plugin {
  return {
    configureServer(server) {
      server.app.use(lessMiddleware());
    },
  };
}

const lessLangRE = new RegExp(/\.less$/);
export const isLessRequest = (request: string): boolean => lessLangRE.test(request);

function lessMiddleware(): NextHandleFunction {
  return async function viteLessMiddleware(req, res, next) {
    if (req.method !== 'GET') {
      return next();
    }

    const url: string = cleanUrl(req.url!);

    if (isLessRequest(url)) {
      const filePath = url.startsWith('/') ? '.' + url : url;
      const rawCode = await readFile(filePath, 'utf-8');

      // --- pre-process less ---
      const lessResult = await less.render(rawCode, {
        // find the directory for @import
        paths: [dirname(filePath)],
      });
      // --- post-process css ---
      const postcssResult = await postcss([atImport()]).process(lessResult.css, {
        from: filePath, // find the path for @import
        to: filePath,   // find the path for @import
      });

      res.setHeader('Content-Type', 'application/javascript');
      return res.end(`
        var style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.innerHTML = \`${postcssResult.css} \`
        document.head.appendChild(style)
      `);
    }

    next();
  };
}
