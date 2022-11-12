import type { AsyncOptions } from "./type";

type Comparer<T> = (a: T, b: T) => number;
type Selector<T, R = any> = (obj: T) => R;

const defaultComparer = function <T>(a: T, b: T): number {
	return a < b ? -1 : a > b ? 1 : 0;
}

const keyOrderComparer = function <T>(...selectors: Selector<T>[]): Comparer<T> {
	return (a, b) => {
		for (const selector of selectors) {
			const keyA = selector(a);
			const keyB = selector(b);
			if (keyA < keyB)
				return -1;
			else if (keyA > keyB)
				return 1;
		}
		return 0;
	}
}

function toNumber(value: any): number {
	switch (typeof value) {
		case "number": return value
		case "boolean": return Number(value)
		case "string": return Number.parseFloat(value)
		default: throw new Error(typeof value + " cannot be converted to number");
	}
}

Array.prototype.last = function <T>(this: Array<T>, index: number = 0): T {
	return this[this.length - index - 1];
}

Array.prototype.insert = function <T>(this: Array<T>, value: T, compareFn?: Comparer<T>): number {
	const index = this.binarySearch(value, compareFn);
	this.splice(index, 0, value);
	return index;
}

Array.prototype.insertAt = function <T>(this: Array<T>, value: T, index: number): boolean {
	if (index < 0 || index >= this.length || !Number.isSafeInteger(index))
		return false;
	this.splice(index, 0, value);
	return true;
}

Array.prototype.remove = function <T>(this: Array<T>, ...values: T[]): number {
	const set = new Set(values);
	const indices = new Array<number>();
	for (let i = 0; i < this.length; ++i)
		if (set.has(this[i]))
			indices.push(i);
	this.removeAt(...indices);
	return indices.length;
}

Array.prototype.removeAt = function <T>(this: Array<T>, ...indices: number[]): boolean {
	if (indices.some(idx => idx < 0 || idx >= this.length || !Number.isSafeInteger(idx)))
		return false;
	const count = indices.length;
	if (count > 0) {
		for (let i = indices[0], offset = 0; i < this.length; ++i) {
			if (i == indices[offset])
				++offset;
			else
				this[i - offset] = this[i];
		}
		this.length -= count;
	}
	return true;
}

Array.prototype.sum = function <T>(this: Array<T>, predicate?: (value: T) => number): number {
	let result = 0;
	predicate ??= toNumber;
	this.forEach(value => result += predicate!(value));
	return result;
}

Array.prototype.product = function <T>(this: Array<T>, predicate?: (value: T) => number): number {
	let result = 1;
	predicate ??= toNumber;
	this.forEach(value => result *= predicate!(value));
	return result;
}

Array.prototype.minimum = function <T>(this: Array<T>, func?: Comparer<T> | Selector<T>, ...keys: Selector<T>[]) {
	if (!this?.length)
		return undefined;
	let compare: Comparer<T> = !func
		? defaultComparer
		: func.length == 2 ? func : keyOrderComparer(func as Selector<T>, ...keys);
	let result = this[0];
	for (let i = 1; i < this.length; ++i) {
		if (compare(this[i], result) < 0)
			result = this[i];
	}
	return result;
}

Array.prototype.maximum = function <T>(this: Array<T>, func?: Comparer<T> | Selector<T>, ...keys: Selector<T>[]) {
	if (!this?.length)
		return undefined;
	let compare: Comparer<T> = !func
		? defaultComparer
		: func.length == 2 ? func : keyOrderComparer(func as Selector<T>, ...keys);
	let result = this[0];
	for (let i = 1; i < this.length; ++i) {
		if (compare(this[i], result) > 0)
			result = this[i];
	}
	return result;
}

Array.prototype.groupBy = function <T, U>(this: Array<T>, key: (obj: T) => U): Map<U, T[]> {
	const map = new Map();
	for (const item of this) {
		const k = key(item);
		const group = map.get(k);
		if (group)
			group.push(item);
		else
			map.set(k, [item]);
	}
	return map;
}

Array.prototype.sortByKey = function <T>(this: Array<T>, ...keys: Selector<T>[]): T[] {
	if (!this || this.length < 2)
		return this;
	const compare = keys?.length ? keyOrderComparer(...keys) : defaultComparer;
	return this.sort(compare);
}

Array.prototype.shuffle = function <T>(this: Array<T>): T[] {
	for (let i = this.length, j; i > 0;) {
		j = Math.floor(Math.random() * i);
		--i;
		const temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
	return this;
}

Array.prototype.repeat = function <T>(this: Array<T>, count: number = 1): T[] {
	if (count < 0)
		throw new Error("count must be greater than or equal to 0");
	const result = new Array<T>(this.length * count);
	for (let i = 0, j = 0; i < result.length; ++i, ++j) {
		if (j == this.length)
			j = 0;
		result[i] = this[j];
	}
	return result;
}

Array.prototype.intersects = function <T>(this: Array<T>, array: Array<T>): boolean {
	const tmp1 = [...this].sort(defaultComparer);
	const tmp2 = [...array].sort(defaultComparer);
	for (let i = 0, j = 0; i < tmp1.length && j < tmp2.length;) {
		if (tmp1[i] == tmp2[j])
			return true;
		if (i < tmp1.length && (j >= tmp2.length || tmp1[i] < tmp2[j]))
			++i;
		else
			++j;
	}
	return false;
}

Array.prototype.isAscending = function <T>(this: Array<T>, func?: Comparer<T> | Selector<T>, ...keys: Selector<T>[]): boolean {
	let compare: Comparer<T> = !func
		? defaultComparer
		: func.length == 2 ? func : keyOrderComparer(func as Selector<T>, ...keys);
	for (let i = 1; i < this.length; ++i)
		if (compare(this[i - 1], this[i]) > 0)
			return false;
	return true;
}

Array.prototype.isDescending = function <T>(this: Array<T>, func?: Comparer<T> | Selector<T>, ...keys: Selector<T>[]): boolean {
	let compare: Comparer<T> = !func
		? defaultComparer
		: func.length == 2 ? func : keyOrderComparer(func as Selector<T>, ...keys);
	for (let i = 1; i < this.length; ++i)
		if (compare(this[i - 1], this[i]) < 0)
			return false;
	return true;
}

Array.prototype.forEachAsync = function <T>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any, options?: AsyncOptions): Promise<void> {
	if (this.length == 0)
		return Promise.resolve();
	const maxConcurrency = options?.maxConcurrency ?? 0;
	return new Promise((resolve, reject) => {
		let finished = 0;
		const getStatus = (promise: Promise<unknown>) =>
			promise.then(
				() => true,
				error => {
					reject(error);
					return false;
				}
			);
		if (maxConcurrency >= 1 && this.length > maxConcurrency) {
			let index = 0;
			const execute = async () => {
				const idx = index++;
				if (idx >= this.length)
					return;
				const success = await getStatus(callbackfn.call(thisArg, this[idx], idx, this));
				if (success) {
					++finished;
					if (finished == this.length)
						resolve();
					else
						execute();
				}
			}
			for (let i = 0; i < maxConcurrency; ++i)
				execute();
		}
		else {
			this.forEach(async (value, index, array) => {
				const success = await getStatus(callbackfn(value, index, array));
				if (!success)
					return;
				++finished;
				if (finished == this.length)
					resolve();
			}, thisArg)
		}
	});
}

Array.prototype.mapAsync = function <T, TResult>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any, options?: AsyncOptions): Promise<TResult[]> {
	const results = new Array<TResult>(this.length);
	return new Promise((resolve, reject) => {
		this.forEachAsync(async (value, index, array) => {
			const result = await callbackfn(value, index, array);
			results[index] = result;
		}, thisArg, options)
			.then(() => resolve(results), reject);
	});
}

Array.prototype.binarySearch = function <T>(this: Array<T>, value: T, param2?: Comparer<T> | "upper" | "lower", param3?: Comparer<T>): number {
	if (this.length == 0)
		return 0;
	const bound = typeof param2 == "string" ? param2 : "lower";
	const compare: Comparer<T> = typeof param2 == "function" ? param2 : param3 || defaultComparer;
	const desc = compare(this[0], this[this.length - 1]) > 0;
	let left = 0, right = this.length - 1;
	while (left <= right) {
		const mid = (left + right) >> 1;
		let cmp = compare(this[mid], value);
		if (desc)
			cmp = -cmp;
		if (cmp < 0)
			left = mid + 1;
		else if (cmp > 0)
			right = mid - 1;
		else {
			if (bound == "lower")
				right = mid - 1;
			else
				left = mid + 1;
		}
	}
	return left;
}

Array.prototype.binarySearchByKey = function <T>(this: Array<T>, value: T, param1?: Selector<T> | "upper" | "lower", ...param2: Selector<T>[]): number {
	const bound = typeof param1 == "string" ? param1 : "lower";
	const selectors = typeof param1 == "function" ? [param1, ...param2] : param2;
	return this.binarySearch(value, bound, keyOrderComparer(...selectors));
}

Array.prototype.ternarySearch = function <T>(this: Array<T>, param1?: Comparer<T> | "upper" | "lower", param2?: Comparer<T>): number {
	if (this.length <= 1)
		return this.length - 1;
	const bound = typeof param1 == "string" ? param1 : "lower";
	const compare: Comparer<T> = typeof param1 == "function" ? param1 : param2 || defaultComparer;
	const mid = (this.length - 1) >> 1;
	const min = compare(this[0], this[mid]) > 0 || compare(this.last(), this[mid]) > 0;
	let left = 0, right = this.length - 1;
	while (true) {
		if (right == left)
			return right;
		if (right - left == 1) {
			let cmp = compare(this[left], this[right]);
			if (min)
				cmp = -cmp;
			return cmp > 0 ? left : cmp < 0 ? right : bound == "lower" ? left : right;
		}
		const third = (right - left) / 3;
		const mid1 = Math.floor(left + third);
		const mid2 = Math.ceil(right - third);
		let cmp = compare(this[mid1], this[mid2]);
		if (min)
			cmp = -cmp;
		if (cmp > 0)
			right = mid2 - 1;
		else if (cmp < 0)
			left = mid1 + 1;
		else {
			if (bound == "lower")
				right = mid2 - 1;
			else
				left = mid1 + 1;
		}
	}
}

Array.prototype.ternarySearchByKey = function <T>(this: Array<T>, param1?: Selector<T> | "upper" | "lower", ...param2: Selector<T>[]): number {
	const bound = typeof param1 == "string" ? param1 : "lower";
	const selectors = typeof param1 == "function" ? [param1, ...param2] : param2;
	return this.ternarySearch(bound, keyOrderComparer(...selectors));
}