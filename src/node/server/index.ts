import connect from 'connect'
import http from 'http'
import colors from 'picocolors'

import { loadInternalPlugins } from '../plugins'
import { Plugin } from './plugin'
import { resolveConfig, ResolvedConfig } from '../config'
import { transformMiddleware } from './middlewares/transform'

export interface JarvisDevServer {
	plugins: Plugin[];
	app: connect.Server;
	config: ResolvedConfig;
}

export async function createServer() {
	const config = await resolveConfig();

	const plugins = [...(config?.plugins || []), ...loadInternalPlugins()];
	const app = connect();

	// --- launch a server ---
	const server: JarvisDevServer = {
		plugins,
		app,
		config,
	}

	app.use(transformMiddleware(server));

	for (const plugin of plugins) {
		plugin.configureServer?.(server);
	}


	http.createServer(app).listen(3388);
	console.log(colors.yellow('serve at http://localhost:3388'))
}