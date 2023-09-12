import Path from "path";
import AsyncFs from "fs/promises";
import {
	isStringPair, isTransformPair,
	type RestructurerConfig, type StructureOperation
} from "./types";

export default async function restructure(config: RestructurerConfig) {
	async function process(operation: StructureOperation) {
		let { copy, move, delete: del, transform } = operation;
		if (copy?.length) {
			copy = isStringPair(copy) ? [copy] : copy;
			await Promise.all(copy.map(async ([src, dst]) => {
				const srcPath = Path.resolve(config.root, src);
				await AsyncFs.access(srcPath);
				const dstPath = Path.resolve(config.root, dst);
				await AsyncFs.mkdir(Path.dirname(dstPath), { recursive: true });
				await AsyncFs.copyFile(srcPath, dstPath);
			}));
		}
		if (move) {
			move = isStringPair(move) ? [move] : move;
			await Promise.all(move.map(async ([src, dst]) => {
				const srcPath = Path.resolve(config.root, src);
				await AsyncFs.access(srcPath);
				const dstPath = Path.resolve(config.root, dst);
				await AsyncFs.mkdir(Path.dirname(dstPath), { recursive: true });
				await AsyncFs.rename(srcPath, dstPath);
			}));
		}
		if (del) {
			del = Array.isArray(del) ? del : [del];
			await Promise.all(del.map(async path => {
				path = Path.resolve(config.root, path);
				await AsyncFs.access(path);
				await AsyncFs.rm(path, { recursive: true });
			}));
		}
		if (transform) {
			transform = isTransformPair(transform) ? [transform] : transform;
			await Promise.all(transform.map(async ([path, transform]) => {
				path = Path.resolve(config.root, path);
				await AsyncFs.access(path);
				const content = await AsyncFs.readFile(path);
				const transformed = await transform(content);
				if (transformed !== content)
					await AsyncFs.writeFile(path, transformed);
			}));
		}
	}
	const operations = Array.isArray(config.operations) ? config.operations : [config.operations];
	for (const operation of operations)
		await process(operation);
}