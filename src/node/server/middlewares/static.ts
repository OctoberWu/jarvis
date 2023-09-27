import { NextHandleFunction } from 'connect';
import sirv from 'sirv';

export function staticMiddleware(): NextHandleFunction {
	const serveFromRoot = sirv('./', { dev: true })
	return async (req, res, next) => {
		serveFromRoot(req, res, next);
	};
}