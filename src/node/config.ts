import { Plugin } from "./server/plugin";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export interface UserConfig {
	root?: string;
	plugins?: Plugin[];
}

export type UserConfigExport = UserConfig | Promise<UserConfig>;

export function defineConfig(config: UserConfigExport) {
	return config;
}

export type ResolvedConfig = Readonly<{
	plugins?: Plugin[];
}>

export async function resolveConfig(): Promise<ResolvedConfig> {
	const configFilePath = pathToFileURL(resolve(process.cwd(), './jarvis.config.js'));
	const config = await import(configFilePath.href);
	return config.default.default;
}