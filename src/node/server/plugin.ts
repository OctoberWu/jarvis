import { JarvisDevServer } from "./index";

export type ServerHook = (server: JarvisDevServer) => (() => void) | void | Promise<(() => void) | void>;

export interface Plugin {
	configureServer?: ServerHook;
}