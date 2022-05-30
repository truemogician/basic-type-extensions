export { };
declare global {
	interface ArrayConstructor {
		/**
		 * Calculate the intersection of two arrays
		 * @param array1 The first array
		 * @param array2 The second array
		 * @returns Intersection result. For duplicate values, the minor amount of which will be kept
		 */
		intersection<T = any>(array1: T[], array2: T[]): T[];
		/**
		 * Calculate the intersection of multiple arrays
		 * @param arrays Arrays
		 * @returns Intersection result. For duplicate values, the minimum amount of which will be kept
		 */
		intersection<T = any>(...arrays: T[][]): T[];
		/**
		 * Calculate the union of two arrays
		 * @param array1 The first array
		 * @param array2 The second array
		 * @returns Union result. For duplicate values, the major amount of which will be kept
		 */
		union<T = any>(array1: T[], array2: T[]): T[];
		/**
		 * Calculate the union of multiple arrays
		 * @param arrays Arrays
		 * @returns Union result. For duplicate values, the maximum amount of which will be kept
		 */
		union<T = any>(...arrays: T[][]): T[];
		/**
		 * Calculate the `source` array's complement array to the `universal` array
		 */
		complement<T = any>(source: T[], universal: T[]): T[];
		/**
		 * Calculate the the source array's difference set to the target array
		 */
		difference<T = any>(source: T[], target: T[]): T[];
		/**
		 * Create an array of integers from `begin` to `end`
		 * @param begin Beginning number, included
		 * @param end Ending number, included
		 */
		range(begin: number, end: number): number[];
		/**
		 * Create an array of integers from `begin` to `end`
		 * @param begin Beginning number, included
		 * @param end Ending number, included
		 */
		range(begin: number, end: number, step: number): number[];
		/**
		 * Create an array of integers from `begin` to `end` filtered by `predicate`
		 * @param begin Beginning number, included
		 * @param end Ending number, included
		 * @param predicate Determines whether a number will be included
		 */
		range(begin: number, end: number, predicate: (item: number) => boolean): number[];
		/**
		 * Create an array of integers from `begin` to `end` filtered by `predicate`
		 * @param begin Beginning number, included
		 * @param end Ending number, included
		 * @param predicate Determines whether a number will be included
		 */
		range(begin: number, end: number, step: number, predicate: (item: number) => boolean): number[];
	}
	interface Array<T> {
		/**
		 * Index the array backward
		 * @param index Backward index. Default is 0
		 */
		last(index?: number): T;
		/**
		 * Insert a value into an ascending array using binary search
		 * @param value Value to be inserted
		 * @returns The index where `value` is inserted
		 */
		insert(value: T): number;
		/**
		 * Insert a value into specific position
		 * @param value Value to be inserted
		 * @param index Index where `value` will be inserted
		 * @returns True if `value` is successfully inserted
		 */
		insertAt(value: T, index: number): boolean;
		/**
		 * Remove all items that equals to `value` from array
		 * @param value Value to be remoevd
		 * @returns The number of items removed
		 */
		remove(value: T): number;
		/**
		 * Remove all items that equals to any `values` from array
		 * @param values Values to be remoevd
		 * @returns The number of items removed
		 */
		remove(...values: T[]): number;
		/**
		 * Remove the item at `index` from array
		 * @param index Index of item to be removed
		 * @returns True if item is successfully removed
		 */
		removeAt(index: number): boolean;
		/**
		 * Calculate the summary of the array
		 * @param predicate A function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		sum(predicate?: (value: T) => number): number;
		/**
		 * Calculate the summary of the array
		 * @param predicate An asynchronous function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		sumAsync(predicate: (value: T) => Promise<number>): Promise<number>;
		/**
		 * Calculate the product of the array
		 * @param predicate A function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		product(predicate?: (value: T) => number): number;
		/**
		 * Calculate the product of the array
		 * @param predicate An asynchronous function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		productAsync(predicate: (value: T) => Promise<number>): Promise<number>;
		/**
		 * Get the minimum item in array
		 * @param compareFn Compare function
		 */
		minimum(compareFn?: (a: T, b: T) => number): T;
		/**
		 * Get the minimum item in array using key comparison
		 * @param keys Array of key-generation functions
		 */
		minimum(...keys: ((obj: T) => any)[]): T;
		/**
		 * Get the maximum item in array
		 * @param compareFn Compare function
		 */
		maximum(compareFn?: (a: T, b: T) => number): T;
		/**
		 * Get the maximum item in array using key comparison
		 * @param keys Array of key-generation functions
		 */
		maximum(...keys: ((obj: T) => any)[]): T;
		/**
		 * Group an array by its key
		 * @param key Map key selector
		 */
		groupBy<U>(key: (obj: T) => U): Map<U, T[]>;
		/**
		 * Sort the array using key sort
		 * @param keys Array of key-generation functions
		 */
		keySort(...keys: ((obj: T) => any)[]): T[];
		/**
		 * Shuffle the array randomly
		 */
		shuffle(): T[];
		/**
		 * Repeat the array `count` times
		 * @param count Default is 1, which means no repeat
		 */
		repeat(count?: number): T[];
		/**
		 * Check whether the array has common elements with another array
		 * @param array Another array
		 */
		intersects(array: Array<T>): boolean;
		/**
		 * Check whether the array is ascending
		 * @param predicate Compare function
		 */
		isAscending(predicate?: (a: T, b: T) => number): boolean;
		/**
		 * Check whether the array is ascending using key comparison
		 * @param keys Array of key-generation functions
		 */
		isAscending(...keys: ((obj: T) => any)[]): boolean;
		/**
		 * Check whether the array is descending
		 * @param predicate Compare function
		 */
		isDescending(predicate?: (a: T, b: T) => number): boolean;
		/**
		 * Check whether the array is descending using key comparison
		 * @param keys Array of key-generation functions
		 */
		isDescending(...keys: ((obj: T) => any)[]): boolean;
		/**
		 * Performs the specified asynchronous action for each element in an array
		 * @param callbackfn  An asynchronous function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array
		 * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If `thisArg` is omitted, undefined is used as the this value
		 */
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any): Promise<void>
		/**
		 * Calls a defined asynchronous callback function on each element of an array, and returns an array that contains the results.
		 * @param callbackfn An asynchronous function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
		 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
		 */
		mapAsync<TResult>(callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any): Promise<TResult[]>
	}
}
type Comparer<T> = (a: T, b: T) => number;
type Mapper<T, R = any> = (obj: T) => R;
const defaultComparer = function <T>(a: T, b: T): number {
	return a < b ? -1 : a > b ? 1 : 0;
}
const keyOrderComparer = function <T>(...keys: Mapper<T>[]): Comparer<T> {
	return (a, b) => {
		for (const key of keys) {
			if (key(a) < key(b))
				return -1;
			else if (key(a) > key(b))
				return 1;
		}
		return 0;
	}
}
Array.intersection = function <T = any>(...arrays: T[][]): T[] {
	if (arrays.length == 0)
		return null;
	else if (arrays.length == 1)
		return arrays[0];
	let tmp1 = new Array<T>();
	let tmp2 = new Array<T>();
	let result = new Array<T>();
	Object.assign(result, arrays[0]);
	if (!result.isAscending())
		result.keySort();
	for (let k = 1; k < arrays.length; ++k) {
		tmp1 = result;
		tmp2 = new Array<T>();
		Object.assign(tmp2, arrays[k]);
		if (!tmp2.isAscending())
			tmp2.keySort();
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
		if (!result.length)
			return result;
	}
	return result;
}
Array.union = function <T = any>(...arrays: T[][]): T[] {
	if (arrays.length == 0)
		return null;
	else if (arrays.length == 1)
		return arrays[0];
	let tmp1 = new Array<T>();
	let tmp2 = new Array<T>();
	let result = new Array<T>();
	Object.assign(result, arrays[0]);
	if (!result.isAscending())
		result.keySort();
	for (let k = 1; k < arrays.length; ++k) {
		tmp1 = result;
		tmp2 = new Array<T>();
		Object.assign(tmp2, arrays[k]);
		if (!tmp2.isAscending())
			tmp2.keySort();
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
	if (Object.isNullOrEmpty(source))
		return Object.copy(universal);
	if (Object.isNullOrEmpty(universal))
		return null;
	if (source.length > universal.length)
		return null;
	const src = Object.copy(source);
	const dst = Object.copy(universal);
	if (!src.isAscending())
		src.keySort();
	if (!dst.isAscending())
		dst.keySort();
	const result = new Array<T>();
	let i = 0;
	for (let j = 0; j < dst.length; ++j) {
		if (i == src.length || src[i] != dst[j])
			result.push(dst[j]);
		else
			++i;
	}
	return i == src.length ? result : null;
}
Array.difference = function <T = any>(source: T[], target: T[]): T[] {
	if (Object.isNullOrEmpty(source))
		return [];
	if (Object.isNullOrEmpty(target))
		return Object.copy(source);
	const src = Object.copy(source);
	const dst = Object.copy(target);
	if (!src.isAscending())
		src.keySort();
	if (!dst.isAscending())
		dst.keySort();
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
Array.prototype.last = function <T>(this: Array<T>, index: number = 0): T {
	return this[this.length - index - 1];
}
Array.prototype.insert = function <T>(this: Array<T>, value: T): number {
	let l = 0, r = this.length - 1, m;
	while (l <= r) {
		m = l + (r - l >> 1);
		if (value <= this[m])
			r = m - 1;
		else
			l = m + 1;
	}
	this.splice(l, 0, value);
	return l;
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
	return count;
}
Array.prototype.removeAt = function <T>(this: Array<T>, index: number): boolean {
	if (index < 0 || index >= this.length || !Number.isSafeInteger(index))
		return false;
	this.splice(index, 1);
	return true;
}
Array.prototype.sum = function <T>(this: Array<T>, predicate?: (value: T) => number): number {
	let result = 0;
	if (!predicate)
		predicate = value => {
			switch (typeof value) {
				case "number": return value
				case "boolean": return Number(value)
				case "string": return Number.parseFloat(value)
				default: throw new Error(typeof value + " cannot be converted to number");
			}
		}
	this.forEach(value => result += predicate!(value));
	return result;
}
Array.prototype.sumAsync = async function <T>(this: Array<T>, predicate: (value: T) => Promise<number>): Promise<number> {
	let result = 0;
	let count = 0;
	return new Promise<number>(resolve => {
		this.forEach(value => {
			predicate(value).then(res => {
				result += res;
				++count;
				if (count == this.length)
					resolve(result);
			});
		});
	});
}
Array.prototype.product = function <T>(this: Array<T>, predicate?: (value: T) => number): number {
	let result = 1;
	if (!predicate)
		predicate = value => {
			switch (typeof value) {
				case "number": return value
				case "boolean": return Number(value)
				case "string": return Number.parseFloat(value)
				default: throw new Error(typeof value + " cannot be converted to number");
			}
		}
	this.forEach(value => result *= predicate!(value));
	return result;
}
Array.prototype.productAsync = async function <T>(this: Array<T>, predicate: (value: T) => Promise<number>): Promise<number> {
	let result = 1;
	let count = 0;
	return new Promise<number>(resolve => {
		this.forEach(value => {
			predicate(value).then(res => {
				result *= res;
				++count;
				if (count == this.length)
					resolve(result);
			});
		});
	});
}
Array.prototype.minimum = function <T>(this: Array<T>, func?: Comparer<T> | Mapper<T>, ...keys: Mapper<T>[]) {
	if (!this?.length)
		return undefined;
	let compare: Comparer<T> = !func
		? defaultComparer
		: func.length == 2 ? func : keyOrderComparer(func as Mapper<T>, ...keys);
	let result = this[0];
	for (let i = 1; i < this.length; ++i) {
		if (compare(this[i], result) < 0)
			result = this[i];
	}
	return result;
}
Array.prototype.maximum = function <T>(this: Array<T>, func?: Comparer<T> | Mapper<T>, ...keys: Mapper<T>[]) {
	if (!this?.length)
		return undefined;
	let compare: Comparer<T> = !func
		? defaultComparer
		: func.length == 2 ? func : keyOrderComparer(func as Mapper<T>, ...keys);
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
Array.prototype.keySort = function <T>(this: Array<T>, ...keys: Mapper<T>[]): T[] {
	if (!this || this.length < 2)
		return this;
	const compare = keys?.length ? keyOrderComparer(...keys) : defaultComparer;
	return this.sort(compare);
}
Array.prototype.shuffle = function <T>(this: Array<T>): T[] {
	let temp: T;
	for (let i = this.length, j; i > 0;) {
		j = Math.floor(Math.random() * i);
		--i;
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
	return this;
}
Array.prototype.repeat = function <T>(this: Array<T>, count: number = 1): T[] {
	if (count < 0)
		return null;
	const result = new Array<T>(this.length * count);
	for (let i = 0, j = 0; i < result.length; ++i, ++j) {
		if (j == this.length)
			j = 0;
		result[i] = this[j];
	}
	return result;
}
Array.prototype.intersects = function <T>(this: Array<T>, array: Array<T>): boolean {
	let tmp1 = new Array<T>(), tmp2 = new Array<T>();
	Object.assign(tmp1, this);
	if (!tmp1.isAscending())
		tmp1.keySort();
	Object.assign(tmp2, array);
	if (!tmp2.isAscending())
		tmp2.keySort();
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
Array.prototype.isAscending = function <T>(this: Array<T>, func?: Comparer<T> | Mapper<T>, ...keys: Mapper<T>[]): boolean {
	let compare: Comparer<T> = !func
		? defaultComparer
		: func.length == 2 ? func : keyOrderComparer(func as Mapper<T>, ...keys);
	for (let i = 1; i < this.length; ++i)
		if (compare(this[i - 1], this[i]) > 0)
			return false;
	return true;
}
Array.prototype.isDescending = function <T>(this: Array<T>, func?: Comparer<T> | Mapper<T>, ...keys: Mapper<T>[]): boolean {
	let compare: Comparer<T> = !func
		? defaultComparer
		: func.length == 2 ? func : keyOrderComparer(func as Mapper<T>, ...keys);
	for (let i = 1; i < this.length; ++i)
		if (compare(this[i - 1], this[i]) < 0)
			return false;
	return true;
}
Array.prototype.forEachAsync = function <T>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any): Promise<void> {
	if (this.length == 0)
		return Promise.resolve();
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
Array.prototype.mapAsync = async function <T, TResult>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any): Promise<TResult[]> {
	const results = new Array<TResult>(this.length);
	await this.forEachAsync(async (value, index, array) => {
		const result = await callbackfn(value, index, array);
		results[index] = result;
	}, thisArg);
	return results;
}