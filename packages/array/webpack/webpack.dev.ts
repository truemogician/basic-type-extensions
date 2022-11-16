import { merge } from "webpack-merge";
import common from "./webpack.common";

export default merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	output: {
		iife: false,
	},
	optimization: {
		minimize: false,
	},
});
