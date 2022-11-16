import Path from "path";
import FileManagerPlugin from "filemanager-webpack-plugin";
import type { Configuration } from "webpack";

const outputRoot = Path.resolve(__dirname, "lib");
const config: Configuration = {
	mode: "production",
	entry: Path.resolve(__dirname, "src/array.ts"),
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
		iife: false,
		clean: true
	},
	devtool: "source-map",
	optimization: {
		minimize: false
	},
	plugins: [
		new FileManagerPlugin({
			events: {
				onEnd: [
					{
						move: [{
							source: Path.resolve(outputRoot, "src/types.d.ts"),
							destination: Path.resolve(outputRoot, "types.d.ts"),
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