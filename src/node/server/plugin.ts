import { JarvisDevServer } from "./index";

export type ServerHook = (server: JarvisDevServer) => (() => void) | void | Promise<(() => void) | void>;

export type TransformResult = string | null | void;
export type TransformHook = (code: string, id: string) => Promise<TransformResult> | TransformResult;

export interface Plugin {
	configureServer?: ServerHook;
	transform?: TransformHook;
}