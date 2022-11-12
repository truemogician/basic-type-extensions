function compare<T>(a: T, b: T): number {
	return a < b ? -1 : a > b ? 1 : 0;
}

Array.intersection = function <T = any>(...arrays: T[][]): T[] {
	if (arrays.length == 0)
		throw new Error("No array is provided.");
	else if (arrays.length == 1)
		return arrays[0];
	let result = [...arrays[0]].sort(compare);
	for (let k = 1; k < arrays.length; ++k) {
		const tmp1 = result;
		const tmp2 = [...arrays[k]].sort(compare);
		result = new Array<T>();
		for (let i = 0, j = 0; i < tmp1.length || j < tmp2.length;) {
			if (tmp1[i] == tmp2[j]) {
				result.push(tmp1[i]);
				++i, ++j;
			}
			else if (i < tmp1.length && (j >= tmp2.length || tmp1[i] < tmp2[j]))
				++i;
			else
				++j;
		}
		if (result.length == 0)
			return result;
	}
	return result;
}

Array.union = function <T = any>(...arrays: T[][]): T[] {
	if (arrays.length == 0)
		throw new Error("No array is provided.");
	else if (arrays.length == 1)
		return arrays[0];
	let result = [...arrays[0]].sort(compare);
	for (let k = 1; k < arrays.length; ++k) {
		const tmp1 = result;
		const tmp2 = [...arrays[k]].sort(compare);
		result = new Array<T>();
		for (let i = 0, j = 0; i < tmp1.length || j < tmp2.length;) {
			if (tmp1[i] == tmp2[j]) {
				result.push(tmp1[i]);
				++i, ++j;
			}
			else if (i < tmp1.length && (j >= tmp2.length || tmp1[i] < tmp2[j]))
				result.push(tmp1[i++]);
			else
				result.push(tmp2[j++]);
		}
	}
	return result;
}

Array.complement = function <T = any>(source: T[], universal: T[]): T[] {
	if (source == null || source.length == 0)
		return [...universal];
	if (universal == null || source.length > universal.length)
		throw new Error("The source array is larger than the universal array.");
	const src = [...source].sort(compare);
	const dst = [...universal].sort(compare);
	const result = new Array<T>();
	let i = 0;
	for (let j = 0; j < dst.length; ++j) {
		if (i == src.length || src[i] != dst[j])
			result.push(dst[j]);
		else
			++i;
	}
	if (i != src.length)
		throw new Error("The source array is not a subset of the universal array.");
	return result;
}

Array.difference = function <T = any>(source: T[], target: T[]): T[] {
	if (source == null || source.length == 0)
		return [];
	if (target == null || target.length == 0)
		return [...source];
	const src = [...source].sort(compare);
	const dst = [...target].sort(compare);
	const result = new Array<T>();
	for (let i = 0, j = 0; i < src.length; ++i) {
		while (j < dst.length && dst[j] < src[i])
			++j;
		if (j == dst.length || src[i] != dst[j])
			result.push(src[i]);
		else
			++j;
	}
	return result;
}

Array.range = function (begin: number, end: number, param1?: number | ((item: number) => boolean), param2?: (item: number) => boolean) {
	const step = typeof (param1) == "number" ? param1 : 1;
	const predicate = typeof (param1) != "number" ? param1 : param2;
	let array: number[];
	if (predicate) {
		array = [];
		for (let i = begin; i <= end; i += step)
			if (predicate(i))
				array.push(i);
	}
	else {
		array = new Array<number>(Math.floor((end - begin + 1) / step));
		for (let i = begin, j = 0; i <= end; i += step, ++j)
			array[j] = i;
	}
	return array;
}