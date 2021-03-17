export { }
declare global {
	interface ArrayConstructor {
		intersection<T = any>(array1: T[], array2: T[]): T[];
		intersection<T = any>(array: T[], ...arrays: T[][]): T[];
		union<T = any>(array1: T[], array2: T[]): T[];
		union<T = any>(array: T[], ...arrays: T[][]): T[];
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
		intersects(array: Array<T>): boolean;
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<void>, thisArg?: any): Promise<void>
	}
	interface PromiseConstructor {
		sleep(milliseconds: number): Promise<void>;
		wait(predicate: (...args: any[]) => boolean, timeout: number, maxTimeout?: number, ...args: any[]): Promise<boolean>;
	}
	interface StringConstructor {
		empty: string;
		isNullOrEmpty(value: string): boolean;
		isNullOrWhiteSpace(value: string): boolean;
	}
	interface String {
		remove(from: number, length?: number): string;
	}
	interface ObjectConstructor {
		isEmpty(value: {}): boolean;
		isNullOrUndefined(value: any): boolean;
		innerAssign<T>(target: T, source: any): T;
		innerAssign<T>(target: T, ...sources: any[]): T;
	}
}
type CompareFunction<T> = (a: T, b: T) => number;
type GetKeyFunction<T> = (obj: T) => any;
Array.intersection = function <T = any>(...arrays: T[][]): T[] {
	if (arrays.length == 1)
		return arrays[0];
	let tmp1 = new Array<T>();
	let tmp2 = new Array<T>();
	let result = new Array<T>();
	Object.assign(result, arrays[0]).sort((a, b) => a < b ? -1 : 1);
	for (let k = 1; k < arrays.length; ++k) {
		tmp1 = result;
		tmp2 = new Array<T>();
		Object.assign(tmp2, arrays[k]).sort((a, b) => a < b ? -1 : 1);
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
	if (arrays.length == 1)
		return arrays[0];
	let tmp1 = new Array<T>();
	let tmp2 = new Array<T>();
	let result = new Array<T>();
	Object.assign(result, arrays[0]).sort((a, b) => a < b ? -1 : 1);
	for (let k = 1; k < arrays.length; ++k) {
		tmp1 = result;
		tmp2 = new Array<T>();
		Object.assign(tmp2, arrays[k]).sort((a, b) => a < b ? -1 : 1);
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
Array.prototype.last = function <T>(this: Array<T>, index: number = 0): T {
	return this[this.length - index - 1];
}
Array.prototype.sum = function <T>(this: Array<T>, predicate?: (value: T) => number): number {
	let result = 0;
	if (!predicate)
		predicate = value => {
			switch (typeof value) {
				case "number": return value
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
Array.prototype.keySort = function <T>(this: Array<T>, ...keys: GetKeyFunction<T>[]): T[] {
	if (!this || this.length < 2)
		return this;
	let compare: CompareFunction<T> = (a, b) => {
		for (const key of keys) {
			if (key(a) < key(b))
				return -1;
			else if (key(a) > key(b))
				return 1;
		}
		return 0;
	}
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
Array.prototype.intersects = function <T>(this: Array<T>, array: Array<T>): boolean {
	let tmp1 = new Array<T>(), tmp2 = new Array<T>();
	Object.assign(tmp1, this).sort((a, b) => a < b ? -1 : 1);
	Object.assign(tmp2, array).sort((a, b) => a < b ? -1 : 1);
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
			timeout
		)
	});
}

String.empty = "";
String.isNullOrEmpty = function (value: string): boolean {
	return value == null || value == "";
}
String.isNullOrWhiteSpace = function (value: string): boolean {
	return value == null || /^\s*$/.test(value);
}
String.prototype.remove = function (this: string, from: number, length?: number): string {
	if (length && from + length < this.length)
		return this.substr(0, from) + this.substr(from + length)
	else
		return this.substr(0, from);
}

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