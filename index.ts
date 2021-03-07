export { }
declare global {
	interface Array<T> {
		last(index?: number): T;
		minimum(compareFn?: (a: T, b: T) => number): T;
		minimum(...keys: ((obj: T) => any)[]): T;
		maximum(compareFn?: (a: T, b: T) => number): T;
		maximum(...keys: ((obj: T) => any)[]): T;
		sort(...keys: ((obj: T) => any)[]): T[];
		intersects(array: Array<T>): boolean;
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<void>, thisArg?: any): Promise<void>
	}
}
type CompareFunction<T> = (a: T, b: T) => number;
type GetKeyFunction<T> = (obj: T) => any;
Array.prototype.last = function <T>(this: Array<T>, index: number = 0): T {
	return this[this.length - index - 1];
}
Array.prototype.minimum = function <T>(this: Array<T>, func?: CompareFunction<T> | GetKeyFunction<T>, ...keys: GetKeyFunction<T>[]) {
	if (!this?.length)
		return undefined;
	let compare: CompareFunction<T> =
		(!func || func.length == 2) ?
			func as CompareFunction<T> :
			(a, b) => {
				for (const key of [func as GetKeyFunction<T>, ...keys]) {
					if (key(a) < key(b))
						return -1;
					else if (key(a) > key(b))
						return 1;
				}
				return 0;
			}
	let result = this[0];
	for (let i = 1; i < this.length; ++i) {
		if (compare(this[i], result) < 0)
			result = this[i];
	}
	return result;
}
Array.prototype.maximum = function <T>(this: Array<T>, func?: CompareFunction<T> | GetKeyFunction<T>, ...keys: GetKeyFunction<T>[]) {
	if (!this?.length)
		return undefined;
	let compare: CompareFunction<T> =
		(!func || func.length == 2) ?
			func as CompareFunction<T> :
			(a, b) => {
				for (const key of [func as GetKeyFunction<T>, ...keys]) {
					if (key(a) < key(b))
						return -1;
					else if (key(a) > key(b))
						return 1;
				}
				return 0;
			}
	let result = this[0];
	for (let i = 1; i < this.length; ++i) {
		if (compare(this[i], result) > 0)
			result = this[i];
	}
	return result;
}
Array.prototype.sort = function <T>(this: Array<T>, func?: CompareFunction<T> | GetKeyFunction<T>, ...keys: GetKeyFunction<T>[]): T[] {
	if (!this || this.length < 2)
		return this;
	let compare: CompareFunction<T> =
		(!func || func.length == 2) ?
			func as CompareFunction<T> :
			(a, b) => {
				for (const key of [func as GetKeyFunction<T>, ...keys]) {
					if (key(a) < key(b))
						return -1;
					else if (key(a) > key(b))
						return 1;
				}
				return 0;
			}
	return this.sort(compare);
}
Array.prototype.intersects = function <T>(this: Array<T>, array: Array<T>): boolean {
	const tmp1 = this.map(x => x).sort((a: T, b: T) => a < b ? -1 : 1);
	const tmp2 = array.map(x => x).sort((a: T, b: T) => a < b ? -1 : 1);
	for (let i = 0, j = 0; i < tmp1.length && j < tmp2.length;) {
		if (tmp1[i] == tmp2[j])
			return true;
		if (i < tmp1.length && (j >= tmp2.length || tmp1[i] < tmp2[j]))
			++i;
		else if (j < tmp2.length && (i >= tmp1.length || tmp2[j] < tmp1[i]))
			++j;
	}
	return false;
}
Array.prototype.forEachAsync = async function <T>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<void>, thisArg?: any): Promise<void> {
	let finishedCount = 0;
	return new Promise(resolve => {
		this.forEach(async (value, index, array) => {
			await callbackfn(value, index, array);
			++finishedCount;
			if (finishedCount == this.length)
				resolve();
		}, thisArg)
	})
}