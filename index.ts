export { }
declare global {
	interface ArrayConstructor {
		intersection<T = any>(array1: T[], array2: T[]): T[];
		intersection<T = any>(...arrays: T[][]): T[];
		union<T = any>(array1: T[], array2: T[]): T[];
		union<T = any>(...arrays: T[][]): T[];
	}
	interface Array<T> {
		last(index?: number): T;
		sum(predicate?: (value: T) => number): number;
		sumAsync(predicate: (value: T) => Promise<number>): Promise<number>;
		product(predicate?: (value: T) => number): number;
		productAsync(predicate: (value: T) => Promise<number>): Promise<number>;
		minimum(compareFn?: (a: T, b: T) => number): T;
		minimum(...keys: ((obj: T) => any)[]): T;
		maximum(compareFn?: (a: T, b: T) => number): T;
		maximum(...keys: ((obj: T) => any)[]): T;
		keySort(...keys: ((obj: T) => any)[]): T[];
		shuffle(): T[];
		repeat(count?: number): T[];
		intersects(array: Array<T>): boolean;
		isAscending(predicate?: (a: T, b: T) => number): boolean;
		isAscending(...keys: ((obj: T) => any)[]): boolean;
		isDescending(predicate?: (a: T, b: T) => number): boolean;
		isDescending(...keys: ((obj: T) => any)[]): boolean;
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<void>, thisArg?: any): Promise<void>
	}
	interface PromiseConstructor {
		sleep(milliseconds: number): Promise<void>;
		wait(predicate: (...args: any[]) => boolean, timeout: number, maxTimeout?: number, ...args: any[]): Promise<boolean>;
	}
	interface StringConstructor {
		empty: string;
		isNullOrEmpty(value: string | null): boolean;
		isNullOrWhiteSpace(value: string | null): boolean;
	}
	interface String {
		remove(from: number, length?: number): string;
		splitAt(index: number, charAtIndex?: "pred" | "succ" | "both" | "none"): string[];
		splitAt(indices: number[], charAtIndex?: "pred" | "succ" | "both" | "none"): string[]
	}
	interface ObjectConstructor {
		isEmpty(value: {}): boolean;
		isNullOrUndefined(value: any): boolean;
		innerAssign<T>(target: T, source: any): T;
		innerAssign<T>(target: T, ...sources: any[]): T;
		clone<T>(src: T): T;
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
Promise.wait = async function (predicate: (...args: any[]) => boolean, timeout: number, maxTimeout: number = 0, ...args: any[]): Promise<boolean> {
	return new Promise<boolean>(resolve => {
		if (predicate(...args))
			return resolve(true);
		let count = 0;
		const timer = setInterval(
			function () {
				if (maxTimeout > 0 && ++count * timeout > maxTimeout) {
					clearInterval(timer);
					return resolve(false);
				}
				else if (predicate(...args)) {
					clearInterval(timer);
					return resolve(true);
				}
			},
			timeout,
			...args
		)
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
//#endregion