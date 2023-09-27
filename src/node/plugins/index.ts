
import { Plugin } from "../server/plugin"
import { staticPlugin } from "./static";
import { cssPlugin } from './css';
import { transformPlugin } from "./transfrom";

export function loadInternalPlugins(): Plugin[] {
	return [transformPlugin(), cssPlugin(), staticPlugin()];
}