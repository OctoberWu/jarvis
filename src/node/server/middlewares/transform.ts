import { NextHandleFunction } from 'connect';
import { isCssRequest, isJSRequest } from '../../utils';
import { readFile } from 'fs/promises';
import { JarvisDevServer } from '../index';
import { TransformResult } from '../plugin';

export function transformMiddleware(server: JarvisDevServer): NextHandleFunction {
  return async function viteTransformMiddleware(req, res, next) {
    if (req.method !== 'GET') {
      return next();
    }

    const url: string = req.url!;

    if (isJSRequest(url) || isCssRequest(url)) {
      const file = url.startsWith('/') ? '.' + url : url;
      let code: string = await readFile(file, 'utf-8');

      for (const plugin of server.plugins) {
        if (!plugin.transform) continue;
        let result: TransformResult;
        try {
          result = await plugin.transform(code, url);
        } catch (e) {
          console.error(e);
        }
        // --- if false, the hook CANNOT be resolved --- 
        if (!result) continue;
        // --- overwrite the previous transform ---
        code = result;
      }
      res.setHeader('Content-Type', 'application/javascript');
      return res.end(code);
    }
    next();
  };
}
