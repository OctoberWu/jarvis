import connect from 'connect';
import http from 'http';

import { loadInternalPlugins } from '../plugins';
import { Plugin } from './plugin';
import { resolveConfig, ResolvedConfig } from '../config';

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

	for (const plugin of plugins) {
		plugin.configureServer?.(server);
	}


	http.createServer(app).listen(3388);
	console.log('serve at http://localhost:3388');
}