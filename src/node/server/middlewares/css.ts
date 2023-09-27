import { NextHandleFunction } from 'connect';
import { cleanUrl, isCssRequest } from '../../utils';
import { readFile } from 'fs/promises'
import postcss from 'postcss';
import atImport from 'postcss-import';

export function cssMiddleware(): NextHandleFunction {
	return async function jarvisTransformMiddleware(req, res, next) {
		if (req.method !== 'GET') {
			return next();
		}

		const url: string = cleanUrl(req.url!);

		if (isCssRequest(url)) {
			const file = url.startsWith('/') ? '.' + url : url;
			const rawCode = await readFile(file, 'utf-8');

			const postcssResult = await postcss([atImport()]).process(rawCode, {
				from: file,
				to: file,
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
	}
}