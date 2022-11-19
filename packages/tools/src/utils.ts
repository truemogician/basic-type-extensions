import typescript from "typescript";
import requireFrmoString from "require-from-string";
import Path from "path";
import AsyncFs from "fs/promises";

declare var __non_webpack_require__: ((id: string) => any) | undefined;
const dynamicRequire = typeof __non_webpack_require__ === "function" ? __non_webpack_require__ : require;

export async function loadModule(path: string): Promise<any> {
	const ext = Path.extname(path);
	let content = await AsyncFs.readFile(path, "utf-8");
	if (ext === ".json")
		return JSON.parse(content);
	if (ext === ".ts")
		content = typescript.transpileModule(
			content,
			{
				compilerOptions: {
					module: typescript.ModuleKind.CommonJS,
					moduleResolution: typescript.ModuleResolutionKind.NodeJs,
				}
			}
		).outputText;
	const nodeModulesPath = Path.resolve(process.cwd(), "node_modules");
	if (ext === ".js" || ext === ".ts")
		return requireFrmoString(content, path, {
			appendPaths: [Path.dirname(path), nodeModulesPath]
		});
}