import { Plugin } from '../server/plugin';
import { isCssRequest } from '../utils';
import postcss from 'postcss';
import atImport from 'postcss-import';
import { dirname } from 'path';
import { isLessRequest } from '../../../playground/plugins/less';
import less from 'less';

export function cssPlugin(): Plugin {
  return {
    async transform(code, url) {
      if (isCssRequest(url)) {
        const file = url.startsWith('/') ? '.' + url : url;

        if (isLessRequest(url)) {
          const lessResult = await less.render(code, {
            paths: [dirname(file)],
          });
          code = lessResult.css;
        }

        const { css } = await postcss([atImport()]).process(code, {
          from: file,
          to: file,
        });

        return css;
      }
    },
  };
}

export function cssPostPlugin(): Plugin {
  return {
    async transform(code, url) {
      if (isCssRequest(url)) {
        return `
        var style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.innerHTML = \`${code} \`
        document.head.appendChild(style)
      `;
      }
    },
  };
}



