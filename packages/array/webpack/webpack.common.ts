import Path from "path";
import FileManagerPlugin from "filemanager-webpack-plugin";
import type { Configuration } from "webpack";

const outputRoot = Path.resolve(__dirname, "../lib");
const config: Configuration = {
	entry: Path.resolve(__dirname, "../src/array.ts"),
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	output: {
		filename: "array.js",
		path: outputRoot,
		clean: true
	},
	plugins: [
		new FileManagerPlugin({
			events: {
				onEnd: [
					{
						copy: [{
							source: Path.resolve(outputRoot, "src/type.d.ts"),
							destination: Path.resolve(outputRoot, "type.d.ts"),
						}]
					},
					{
						delete: [Path.resolve(outputRoot, "src")]
					}
				]
			}
		})
	]
};

export default config;