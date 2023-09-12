import type { RestructurerConfig } from "./src";
import Path from "path";

const config: RestructurerConfig = {
	root: Path.resolve(__dirname, "dist"),
	operations: [
		{
			move: [
				["src/restructurer", "restructurer"],
				["src/index.d.ts", "index.d.ts"],
				["src/main.d.ts", "main.d.ts"],
				["src/main.js", "main.js"],
				["src/main.js.map", "main.js.map"],
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