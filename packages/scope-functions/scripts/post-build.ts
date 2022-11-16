import Path from "path";
import FileSystem from "fs";
import config, { type PostBuildConfig } from "../configs/post-build.config";

const outputDir = Path.resolve(__dirname, "../lib");

async function process(config: PostBuildConfig) {
	if (config.copy)
		await Promise.all(config.copy.map(async ([src, dst]) => {
			const srcPath = Path.resolve(outputDir, src);
			const dstPath = Path.resolve(outputDir, dst);
			await FileSystem.promises.copyFile(srcPath, dstPath);
		}));
	if (config.move)
		await Promise.all(config.move.map(async ([src, dst]) => {
			const srcPath = Path.resolve(outputDir, src);
			const dstPath = Path.resolve(outputDir, dst);
			await FileSystem.promises.rename(srcPath, dstPath);
		}));
	if (config.delete)
		await Promise.all(config.delete.map(async path => {
			await FileSystem.promises.unlink(Path.resolve(outputDir, path));
		}));
}

(async () => {
	if (Array.isArray(config))
		for (const conf of config)
			await process(conf);
	else
		await process(config);
})();