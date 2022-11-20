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
			],
			transform: ["array.js.map", content => {
				const json = JSON.parse(content.toString("utf-8")) as { sources: string[] };
				json.sources = json.sources.map(source => source.replace(/^\.\.[\/\\]/, ""));
				return JSON.stringify(json);
			}]
		}
	]
};

export default config;