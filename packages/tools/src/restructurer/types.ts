export interface StructureOperation {
	copy?: [source: string, destination: string][];

	move?: [source: string, destination: string][];

	delete?: string[];

	transform?: [source: string, transform: (content: Buffer) => string | Buffer | Promise<string | Buffer>][];
}

export interface RestructurerConfig {
	root: string;

	operations: StructureOperation | StructureOperation[];
}

function isStringPair(pair: any): pair is [string, string] {
	return Array.isArray(pair) && pair.length == 2 && typeof pair[0] == "string" && typeof pair[1] == "string";
}

export function isStructureOperation(config: any): config is StructureOperation {
	if (config != null && typeof config == "object") {
		const { copy, move, delete: del, transform } = config;
		if (copy != null && (!Array.isArray(copy) || !copy.every(isStringPair)))
			return false;
		if (move != null && (!Array.isArray(move) || !move.every(isStringPair)))
			return false;
		if (del != null && (!Array.isArray(del) || !del.every(path => typeof path == "string")))
			return false;
		if (transform != null &&
			(!Array.isArray(transform) ||
				transform.length != 2 ||
				typeof transform[0] != "string" ||
				typeof transform[1] != "function" ||
				transform[1].length != 1
			)
		)
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