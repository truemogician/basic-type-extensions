import type { RestructurerConfig } from "@basic-type-extensions/tools";
import Path from "path";

const config: RestructurerConfig = {
	root: Path.resolve(__dirname, "lib"),
	operations: [
		{
			move: [
				["src/array.js", "array.js"],
				["src/array.js.map", "array.js.map"],
				["src/types.d.ts", "types.d.ts"],
			]
		},
		{
			delete: [
				"src",
				"package.json"
			]
		}
	]
};

export default config;