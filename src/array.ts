/**
 * Options to control asynchronious array operations
 */
export interface AsyncOptions {
	/**
	 * Maximum number of promises to evaluate in parallel
	 * If undefined or less than 1, all promises will be evaluated in parallel
	 */
	maxConcurrency?: number;
}

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
		 * @returns Whether the item is successfully removed
		 */
		removeAt(index: number): boolean;

		/**
		 * Remove items in `indices` from array
		 * @param indices Indices of items to be removed
		 * @returns Whether all items are successfully removed
		 */
		removeAt(...indices: number[]): boolean;

		/**
		 * Calculate the summary of the array
		 * @param predicate A function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		sum(predicate?: (value: T) => number): number;

		/**
		 * Calculate the summary of the array
		 * @param predicate An asynchronous function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 * @param options Asynchronous operation options
		 */
		sumAsync(predicate: (value: T) => Promise<number>, options?: AsyncOptions): Promise<number>;

		/**
		 * Calculate the product of the array
		 * @param predicate A function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		product(predicate?: (value: T) => number): number;

		/**
		 * Calculate the product of the array.
		 * @param predicate An asynchronous function that map each element from `T` to `number`. Default conversion function will be used when ommited.
		 * @param options Asynchronous operation options.
		 */
		productAsync(predicate: (value: T) => Promise<number>, options?: AsyncOptions): Promise<number>;

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
		 * @param options Asynchronous operation options
		 */
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any, options?: AsyncOptions): Promise<void>

		/**
		 * Calls a defined asynchronous callback function on each element of an array, and returns an array that contains the results
		 * @param callbackfn An asynchronous function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array
		 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value
		 * @param options Asynchronous operation options
		 */
		mapAsync<TResult>(callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any, options?: AsyncOptions): Promise<TResult[]>

		/**
		 * Search for the index of a specific value in an **ordered** array
		 * @param value The value to search for in the array
		 * @param compareFn Compare function
		 * @return 
		 * - #### Ascending array  
		 *  The index of the first largest element that is less than or equal to `value`.  
		 *  If `value` is less than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	The index of the first smallest element that is greater than or equal to `value`.  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is less than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `-1` will be returned.
		 */
		binarySearch(value: T, compareFn?: (a: T, b: T) => number): number;

		/**
		 * Search for the index of a specific value in an **ordered** array
		 * @param value The value to search for in the array
		 * @param compareFn Compare function
		 * @param bound Default is "lower"
		 * @return 
		 * - #### Ascending array
		 *  The index of the first largest element that is less than or equal to `value` if `bound` is `"lower"`.  
		 *  Or the index of the smallest element that is greater than `value` if `bound` is `"upper"`.  
		 *  If `value` is less than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	The index of the first smallest element that is greater than or equal to `value` if `bound` is `"lower"`.  
		 *  Or the index of the largest element that is less than `value` if `bound` is `"upper"`.  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is less than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `-1` will be returned.
		 */
		binarySearch(value: T, bound?: "lower" | "upper", compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the extremum in a **unimodal** array
		 * @param compareFn Compare function
		 * @return The index of the first extremum.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearch(compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the extremum in a **unimodal** array
		 * @param compareFn Compare function
		 * @param bound Default is "lower"
		 * @return The index of the first extremum if `bound` is `"lower"`,  
		 * or the index of the last extremum if `bound` is `"upper"`.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearch(bound?: "lower" | "upper", compareFn?: (a: T, b: T) => number): number;
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

Array.prototype.sumAsync = async function <T>(this: Array<T>, predicate: (value: T) => Promise<number>, options?: AsyncOptions): Promise<number> {
	let result = 0;
	await this.forEachAsync(async value => {
		result += await predicate(value);
	}, null, options);
	return result;
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

Array.prototype.productAsync = async function <T>(this: Array<T>, predicate: (value: T) => Promise<number>, options?: AsyncOptions): Promise<number> {
	let result = 1;
	await this.forEachAsync(async value => {
		result *= await predicate(value);
	}, null, options);
	return result;
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

Array.prototype.forEachAsync = function <T>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any, options?: AsyncOptions): Promise<void> {
	if (this.length == 0)
		return Promise.resolve();
	return new Promise(resolve => {
		let finished = 0;
		if (options?.maxConcurrency >= 1 && this.length > options?.maxConcurrency) {
			let index = 0;
			const execute = async () => {
				const idx = index++;
				if (idx >= this.length)
					return;
				await callbackfn.call(thisArg, this[idx], idx, this);
				++finished;
				if (finished == this.length)
					resolve();
				else
					execute();
			}
			for (let i = 0; i < options.maxConcurrency; ++i)
				execute();
		}
		else {
			this.forEach(async (value, index, array) => {
				await callbackfn(value, index, array);
				++finished;
				if (finished == this.length)
					resolve();
			}, thisArg)
		}
	});
}

Array.prototype.mapAsync = async function <T, TResult>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any, options?: AsyncOptions): Promise<TResult[]> {
	const results = new Array<TResult>(this.length);
	await this.forEachAsync(async (value, index, array) => {
		const result = await callbackfn(value, index, array);
		results[index] = result;
	}, thisArg, options);
	return results;
}

Array.prototype.binarySearch = function <T>(this: Array<T>, value: T, param2?: Comparer<T> | "upper" | "lower", param3?: Comparer<T>): number {
	if (this.length == 0)
		return -1;
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