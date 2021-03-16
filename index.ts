export { }
declare global {
	interface Array<T> {
		last(index?: number): T;
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
		wait(predict: (...args: any[]) => boolean, timeout: number, maxTimeout?: number, ...args: any[]): Promise<boolean>;
	}
	interface StringConstructor {
		empty: string;
		isNullOrEmpty(value: string): boolean;
		isNullOrWhiteSpace(value: string): boolean;
	}
	interface String {
		remove(from: number, length?: number): string;
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
Promise.sleep = async function (milliseconds: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
Promise.wait = async function (predict: (...args: any[]) => boolean, timeout: number, maxTimeout: number = 0, ...args: any[]): Promise<boolean> {
	return new Promise<boolean>(resolve => {
		if (predict(...args))
			return resolve(true);
		let count = 0;
		const timer = setInterval(
			function () {
				if (maxTimeout > 0 && ++count * timeout > maxTimeout) {
					clearInterval(timer);
					return resolve(false);
				}
				else if (predict(...args)) {
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