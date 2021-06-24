export { }
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
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<void>, thisArg?: any): Promise<void>
	}
	interface PromiseConstructor {
		/**
		 * Sleep for a period of time
		 * @param milliseconds Number of milliseconds to sleep
		 */
		sleep(milliseconds: number): Promise<void>;
		/**
		 * Wait until `predicate` returns true or `timeout` limit is exceeded
		 * @param interval Checking interval, unit: ms
		 * @param timeout Max waiting time, unit: ms
		 * @param args Arguments to be passed to `predicate`
		 */
		wait(predicate: (...args: any[]) => boolean, interval: number, timeout?: number, ...args: any[]): Promise<boolean>;
		/**
		 * Wait until `predicate` returns true or `timeout` limit is exceeded
		 * @param interval Checking interval, unit: ms
		 * @param timeout Max waiting time, unit: ms
		 * @param args Arguments to be passed to `predicate`
		 */
		wait(predicate: (...args: any[]) => Promise<boolean>, interval: number, timeout?: number, ...args: any[]): Promise<boolean>;
	}
	interface StringConstructor {
		/**
		 * An empty string
		 */
		empty: string;
		/**
		 * Check whether `value` is null or empty string
		 */
		isNullOrEmpty(value: string | null): boolean;
		/**
		 * Check whether `value` is null or contains whitespace only
		 */
		isNullOrWhiteSpace(value: string | null): boolean;
	}
	interface String {
		/**
		 * Remove `length` characters from string starting at `from`
		 * @param from Start index
		 * @param length Number of characters to remove
		 */
		remove(from: number, length?: number): string;
		/**
		 * Split the string into two substrings
		 * @param index Where the string will be splited at
		 * @param charAtIndex Determines how the character at `index` will be handled. Default is `"succ"`
		 * `"pre"`: Place in the preceding substring  
		 * `"succ"`: Place in the succeeding substring  
		 * `"both"`: Place in both substrings  
		 * `"none"`: Ignore the character
		 */
		splitAt(index: number, charAtIndex?: "pred" | "succ" | "both" | "none"): string[];
		/**
		 * Split the string into multiple substrings
		 * @param indices Array of indices indicating where the string will be splited at
		 * @param charAtIndex Determines how the character at `index` will be handled. Default is `"succ"`   
		 * `"pre"`: Place in the preceding substring  
		 * `"succ"`: Place in the succeeding substring  
		 * `"both"`: Place in both substrings  
		 * `"none"`: Ignore the character
		 */
		splitAt(indices: number[], charAtIndex?: "pred" | "succ" | "both" | "none"): string[]
	}
	interface ObjectConstructor {
		/**
		 * Check whether `value` has no keys
		 */
		isEmpty(value: {}): boolean;
		/**
		 * Check whether `value` is null or undefined
		 */
		isNullOrUndefined(value: any): boolean;
		/**
		 * Assign values of the common keys of `target` and `source` from `source` to `target`
		 * @param target Target object
		 * @param source Source object
		 */
		innerAssign<T>(target: T, source: any): T;
		/**
		 * Assign values of the common keys of `target` and `sources` from `sources` to `target`
		 * @param target Target object
		 * @param sources Array of source objects
		 */
		innerAssign<T>(target: T, ...sources: any[]): T;
		/**
		 * Deep clone an instance
		 * @param src Source instance
		 */
		clone<T>(src: T): T;
		/**
		 * Clean null and undefined keys of an object
		 * @param src Source object
		 * @param preserveEmptyObject True to preserve subobjects with no keys. Default is false
		 */
		clean<T>(src: T, preserveEmptyObject?: boolean): { [K in keyof T]?: T[K] };
	}
	interface Math {
		/**
		 * Returns a random integer between `min` and `max`
		 * @param min Lower bound
		 * @param max Upper bound (not reachable)
		 */
		randomInteger(min: number, max: number): number;
		/**
		 * Returns a random integer between 0 and `max`
		 * @param max Upper bound (not reachable)
		 */
		randomInteger(max: number): number;
		/**
		 * Returns a random float number between `min` and `max`
		 * @param min Lower bound
		 * @param max Upper bound
		 */
		randomFloat(min: number, max: number): number;
		/**
		 * Returns a random float number between 0 and `max`
		 * @param max Upper bound
		 */
		randomFloat(max: number): number;
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
//#region ArrayConstructor
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
//#endregion
//#region Array
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
Array.prototype.remove = function <T>(this: Array<T>, value: T): number {
	let count = 0;
	for (let i = this.length - 1; i >= 0; --i)
		if (this[i] === value) {
			this.splice(i, 1);
			++count;
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
//#endregion

//#region PromiseConstructor
Promise.sleep = async function (milliseconds: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
Promise.wait = async function (predicate: (...args: any[]) => boolean | Promise<boolean>, interval: number, timeout: number = 0, ...args: any[]): Promise<boolean> {
	return new Promise<boolean>(async resolve => {
		let result = predicate(...args);
		if (typeof result == "boolean" && result)
			return resolve(true);
		if (typeof result != "boolean") {
			if (timeout == 0 && await result)
				return resolve(true);
			else if (timeout > 0) {
				const res = await Promise.race([result, Promise.sleep(timeout)]);
				if (typeof res != "boolean")
					return resolve(false);
				else if (res === true)
					return resolve(true);
			}
		}
		let count = 0;
		let lastFinished = true;
		const timer = setInterval(
			async function () {
				++count;
				if (timeout > 0 && count * interval > timeout) {
					clearInterval(timer);
					return resolve(false);
				}
				else if (lastFinished) {
					result = predicate(...args);
					if (typeof result == "boolean" && result) {
						clearInterval(timer);
						return resolve(true);
					}
					if (typeof result != "boolean") {
						lastFinished = false;
						if (timeout == 0 && await result) {
							clearInterval(timer);
							return resolve(true);
						}
						else if (timeout > 0) {
							const res = await Promise.race([result, Promise.sleep(timeout - count * interval)]);
							if (typeof res != "boolean" || res === true) {
								clearInterval(timer);
								return resolve(res === true);
							}
						}
						lastFinished = true;
					}
				}
			},
			interval,
			...args
		);
	});
}
//#endregion

//#region StringConstructor
String.empty = "";
String.isNullOrEmpty = function (value: string | null): boolean {
	return value == null || value == "";
}
String.isNullOrWhiteSpace = function (value: string | null): boolean {
	return value == null || /^\s*$/.test(value);
}
//#endregion
//#region String
String.prototype.remove = function (this: string, from: number, length?: number): string {
	if (length && length <= 0)
		return this;
	else if (length && from + length < this.length)
		return this.substr(0, from) + this.substr(from + length)
	else
		return this.substr(0, from);
}
String.prototype.splitAt = function (this: string, indices: number | number[], charAtIndex: "pred" | "succ" | "both" | "none" = "succ"): string[] {
	if (typeof indices == "number")
		indices = [indices];
	if (!indices.isAscending())
		indices.keySort();
	let start = 0, end = 1;
	for (let negative = indices[0] < 0; end < indices.length; negative = indices[end++] < 0) {
		if (negative)
			start = end;
		if (indices[end] > this.length)
			break;
	}
	indices = indices.slice(start, end);
	if (!indices.length)
		return [this];
	const result = new Array<string>();
	const pred = (charAtIndex == "pred" || charAtIndex == "both") ? 1 : 0;
	const succ = (charAtIndex == "succ" || charAtIndex == "both") ? 1 : 0;
	let sub = this.substr(0, indices[0] + pred);
	if (sub != "")
		result.push(sub);
	for (let i = 1; i < indices.length; ++i) {
		if (indices[i] == indices[i - 1])
			continue;
		start = indices[i - 1] + 1 - succ, end = indices[i] + pred;
		if (start < end)
			result.push(this.substring(start, end));
	}
	sub = this.substr(indices.last() + 1 - succ);
	if (sub != "")
		result.push(sub);
	return result;
}
//#endregion

//#region ObjectConstructor
Object.isEmpty = function (value: {}): boolean {
	return Object.keys(value).length == 0;
}
Object.isNullOrUndefined = function (value: any): boolean {
	return value == null || value == undefined;
}
Object.innerAssign = function <T>(target: T, source: any, ...sources: any[]): T {
	const keys = Object.keys(target);
	for (const src of [source, ...sources]) {
		const srcKeys = Object.keys(src);
		const inter = Array.intersection(keys, srcKeys);
		inter.forEach(key => (target as any)[key] = src[key]);
	}
	return target;
}
Object.clone = require("lodash.clonedeep")
Object.clean = function <T>(src: T, preserveEmptyObject: boolean = false) {
	for (const key in src) {
		if (src[key] === null || src[key] === undefined)
			delete src[key];
		else if (typeof src[key] == "object") {
			Object.clean(src[key], preserveEmptyObject);
			if (!preserveEmptyObject && Object.isEmpty(src[key]))
				delete src[key];
		}
	}
	return src;
}
//#endregion

//#region Math
Math.randomInteger = function (param1: number, param2?: number): number {
	const min = Math.ceil(param2 === undefined ? 0 : param1);
	const max = Math.floor(param2 === undefined ? param1 : param2);
	return min + Math.floor((max - min) * Math.random());
}
Math.randomFloat = function (param1: number, param2?: number): number {
	const min = param2 === undefined ? 0 : param1;
	const max = param2 === undefined ? param1 : param2;
	return min + (max - min) * Math.random();
}
//#endregion