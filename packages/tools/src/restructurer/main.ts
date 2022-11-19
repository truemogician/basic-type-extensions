import Path from "path";
import AsyncFs from "node:fs/promises";
import type { RestructurerConfig, StructureOperation } from "./types";

export default async function restructure(config: RestructurerConfig) {
	async function process(operation: StructureOperation) {
		if (operation.copy)
			await Promise.all(operation.copy.map(async ([src, dst]) => {
				const srcPath = Path.resolve(config.root, src);
				await AsyncFs.access(srcPath);
				const dstPath = Path.resolve(config.root, dst);
				await AsyncFs.mkdir(Path.dirname(dstPath), { recursive: true });
				await AsyncFs.copyFile(srcPath, dstPath);
			}));
		if (operation.move)
			await Promise.all(operation.move.map(async ([src, dst]) => {
				const srcPath = Path.resolve(config.root, src);
				await AsyncFs.access(srcPath);
				const dstPath = Path.resolve(config.root, dst);
				await AsyncFs.mkdir(Path.dirname(dstPath), { recursive: true });
				await AsyncFs.rename(srcPath, dstPath);
			}));
		if (operation.delete)
			await Promise.all(operation.delete.map(async path => {
				path = Path.resolve(config.root, path);
				await AsyncFs.access(path);
				await AsyncFs.rm(path, { recursive: true });
			}));
		if (operation.transform)
			await Promise.all(operation.transform.map(async ([path, transform]) => {
				path = Path.resolve(config.root, path);
				await AsyncFs.access(path);
				const content = await AsyncFs.readFile(path);
				const transformed = await transform(content);
				if (transformed !== content)
					await AsyncFs.writeFile(path, transformed);
			}));
	}
	const operations = Array.isArray(config.operations) ? config.operations : [config.operations];
	for (const operation of operations)
		await process(operation);
}