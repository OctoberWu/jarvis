import connect from 'connect';
import http from 'http';

import { staticMiddleware } from './middlewares/static';
import { cssMiddleware } from './middlewares/css';
import { transformMiddleware } from './middlewares/transform';

export async function createServer() {
	const app = connect();

	// --- middleware test ---
	// app.use(function (_, res) {
	// 	res.end('Hello from JARVIS');
	// })

	app.use(staticMiddleware());
	app.use(cssMiddleware());
	app.use(transformMiddleware());

	http.createServer(app).listen(3388);
	console.log('serve at http://localhost:3388');
}