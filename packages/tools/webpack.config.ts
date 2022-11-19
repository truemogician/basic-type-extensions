import Path from "path";
import FileManagerPlugin from "filemanager-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import type { Configuration } from "webpack";

const pathInSrc = (...path: string[]) => Path.resolve(__dirname, "src", ...path);
const outputRoot = Path.resolve(__dirname, "dist");
const pathInOutput = (...path: string[]) => Path.resolve(outputRoot, ...path);

const config: Configuration = {
	mode: "production",
	target: "node",
	externals: [nodeExternals()],
	entry: {
		index: pathInSrc("index.ts"),
		main: pathInSrc("main.ts"),
	},
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
		filename: "[name].js",
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
						mkdir: [pathInOutput("restructurer")]
					},
					{
						move: [{
							source: pathInOutput("src/index.d.ts"),
							destination: pathInOutput("index.d.ts"),
						}, {
							source: pathInOutput("src/restructurer/types.d.ts"),
							destination: pathInOutput("restructurer/types.d.ts"),
						}]
					},
					{
						delete: [pathInOutput("src")]
					}
				]
			}
		})
	]
};

export default config;