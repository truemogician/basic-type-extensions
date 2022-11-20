type OrArray<T> = T | T[];

export interface StructureOperation {
	copy?: OrArray<[source: string, destination: string]>;

	move?: OrArray<[source: string, destination: string]>;

	delete?: string | string[];

	transform?: OrArray<[source: string, transform: (content: Buffer) => string | Buffer | Promise<string | Buffer>]>;
}

export interface RestructurerConfig {
	root: string;

	operations: StructureOperation | StructureOperation[];
}

export function isStringPair(pair: any): pair is [string, string] {
	return Array.isArray(pair) && pair.length == 2 && typeof pair[0] == "string" && typeof pair[1] == "string";
}

export function isTransformPair(pair: any): pair is [string, (content: Buffer) => string | Buffer | Promise<string | Buffer>] {
	return Array.isArray(pair) && pair.length == 2 && typeof pair[0] == "string" && typeof pair[1] == "function";
}

export function isStructureOperation(config: any): config is StructureOperation {
	if (config != null && typeof config == "object") {
		const { copy, move, delete: del, transform } = config;
		if (copy != null && (!Array.isArray(copy) || !(isStringPair(copy) || copy.every(isStringPair))))
			return false;
		if (move != null && (!Array.isArray(move) || !(isStringPair(move) || move.every(isStringPair))))
			return false;
		if (del != null && !(typeof del == "string" || (Array.isArray(del) && del.every(path => typeof path == "string"))))
			return false;
		if (transform != null && (!Array.isArray(transform) || !(isTransformPair(transform) || transform.every(isTransformPair))))
			return false;
		return true;
	}
	return false;
}

export function isRestructurerConfig(config: any): config is RestructurerConfig {
	if (config != null && typeof config == "object") {
		if (typeof config.root != "string")
			return false;
		if (Array.isArray(config.operations)) {
			for (const operation of config.operations)
				if (!isStructureOperation(operation))
					return false;
			return true;
		}
		else if (isStructureOperation(config.operations))
			return true;
	}
	return false;
}