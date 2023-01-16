import type { AsyncOptions } from "./types";
import { version } from "../package.json";

type Comparer<T> = (a: T, b: T) => number;
type Selector<T, R = any> = (obj: T) => R;

const defaultComparer = <T>(a: T, b: T): number => a < b ? -1 : a > b ? 1 : 0;

function selectorsToComparer<T>(...selectors: Selector<T>[]): Comparer<T> {
	if (selectors.length == 0)
		return defaultComparer;
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
};

function isSubset<T>(arr1: T[], arr2: T[], proper: boolean, comparer?: Comparer<T>): boolean {
	if (arr1.length > arr2.length || (proper && arr1.length == arr2.length))
		return false;
	if (arr1.length == 0)
		return true;
	comparer ??= defaultComparer;
	const [n, m] = [arr1.length, arr2.length];
	// Compare the complexity, and use the faster one
	if (n * m < n * Math.log2(n) + m * Math.log2(m)) {
		const matched = new Array<boolean>(m);
		for (let i = 0; i < n; ++i) {
			let found = false;
			for (let j = 0; j < m; ++j)
				if (!matched[j] && comparer(arr1[i], arr2[j]) == 0) {
					matched[j] = true;
					found = true;
					break;
				}
			if (!found)
				return false;
		}
	}
	const a = [...arr1].sort(comparer);
	const b = [...arr2].sort(comparer);
	let i: number, j: number;
	for (i = 0, j = 0; i < a.length && j < b.length; ++j) {
		const cmp = comparer(a[i], b[j]);
		if (cmp < 0)
			return false;
		if (cmp == 0)
			++i;
	}
	return i == a.length;
}

const extensions = (<K extends keyof typeof Array.prototype>(e: Pick<typeof Array.prototype, K>) => e)({
	last<T>(this: Array<T>, index: number = 0): T {
		return this[this.length - index - 1];
	},

	insert<T>(this: Array<T>, value: T, compareFn?: Comparer<T>): number {
		const index = this.binarySearch(value, compareFn);
		this.splice(index, 0, value);
		return index;
	},

	insertAt<T>(this: Array<T>, value: T, index: number): boolean {
		if (index < 0 || index >= this.length || !Number.isSafeInteger(index))
			return false;
		this.splice(index, 0, value);
		return true;
	},

	remove<T>(this: Array<T>, ...values: T[]): number {
		const set = new Set(values);
		const indices = new Array<number>();
		for (let i = 0; i < this.length; ++i)
			if (set.has(this[i]))
				indices.push(i);
		this.removeAt(...indices);
		return indices.length;
	},

	removeAt<T>(this: Array<T>, ...indices: number[]): boolean {
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
	},

	removeBy<T>(this: Array<T>, predicate: (value: T, index: number, array: T[]) => boolean): number {
		const indices = new Array<number>();
		for (let i = 0; i < this.length; ++i)
			if (predicate(this[i], i, this))
				indices.push(i);
		this.removeAt(...indices);
		return indices.length;
	},

	sum<T>(this: Array<T>, predicate?: (value: T) => number): number {
		let result = 0;
		predicate ??= Number;
		this.forEach(value => result += predicate!(value));
		return result;
	},

	product<T>(this: Array<T>, predicate?: (value: T) => number): number {
		let result = 1;
		predicate ??= Number;
		this.forEach(value => result *= predicate!(value));
		return result;
	},

	minimum<T>(this: Array<T>, func?: Comparer<T> | Selector<T>, ...keys: Selector<T>[]) {
		if (!this?.length)
			return undefined;
		let compare: Comparer<T> = !func
			? defaultComparer
			: func.length == 2 ? func : selectorsToComparer(func as Selector<T>, ...keys);
		let result = this[0];
		for (let i = 1; i < this.length; ++i) {
			if (compare(this[i], result) < 0)
				result = this[i];
		}
		return result;
	},

	maximum<T>(this: Array<T>, func?: Comparer<T> | Selector<T>, ...keys: Selector<T>[]) {
		if (!this?.length)
			return undefined;
		let compare: Comparer<T> = !func
			? defaultComparer
			: func.length == 2 ? func : selectorsToComparer(func as Selector<T>, ...keys);
		let result = this[0];
		for (let i = 1; i < this.length; ++i) {
			if (compare(this[i], result) > 0)
				result = this[i];
		}
		return result;
	},

	groupBy<T, U>(this: Array<T>, key: (obj: T) => U): Map<U, T[]> {
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
	},

	sortByKey<T>(this: Array<T>, ...keys: Selector<T>[]): T[] {
		if (!this || this.length < 2)
			return this;
		const compare = keys?.length ? selectorsToComparer(...keys) : defaultComparer;
		return this.sort(compare);
	},

	shuffle<T>(this: Array<T>): T[] {
		for (let i = this.length, j; i > 0;) {
			j = Math.floor(Math.random() * i);
			--i;
			const temp = this[i];
			this[i] = this[j];
			this[j] = temp;
		}
		return this;
	},

	repeat<T>(this: Array<T>, count: number = 1): T[] {
		if (count < 0)
			throw new Error("`count` must be greater than or equal to 0");
		const result = new Array<T>(this.length * count);
		for (let i = 0, j = 0; i < result.length; ++i, ++j) {
			if (j == this.length)
				j = 0;
			result[i] = this[j];
		}
		return result;
	},

	intersects<T>(this: Array<T>, array: Array<T>, comparer?: Comparer<T>): boolean {
		if (!this?.length || !array?.length)
			return false;
		comparer ??= defaultComparer;
		let [a, b] = this.length <= array.length ? [this, array] : [array, this];
		const [n, m] = [a.length, b.length];
		// Compare the complexity, and use the faster one
		if (n * m < n * Math.log2(n) + m * Math.log2(m))
			return a.some(x => b.findIndex(y => comparer!(x, y) == 0) !== -1);
		a = [...a].sort(comparer);
		b = [...b].sort(comparer);
		for (let i = 0, j = 0; i < a.length && j < b.length;) {
			const cmp = comparer(a[i], b[j]);
			if (cmp == 0)
				return true;
			if (cmp < 0)
				++i;
			else
				++j;
		}
		return false;
	},

	isSubsetOf<T>(this: Array<T>, array: Array<T>, comparer?: Comparer<T>): boolean {
		return isSubset(this, array, false, comparer);
	},

	isProperSubsetOf<T>(this: Array<T>, array: Array<T>, comparer?: Comparer<T>): boolean {
		return isSubset(this, array, true, comparer);
	},

	isSupersetOf<T>(this: Array<T>, array: Array<T>, comparer?: Comparer<T>): boolean {
		return isSubset(array, this, false, comparer);
	},

	isProperSupersetOf<T>(this: Array<T>, array: Array<T>, comparer?: Comparer<T>): boolean {
		return isSubset(array, this, true, comparer);
	},

	isAscending<T>(this: Array<T>, func?: Comparer<T> | Selector<T>, ...keys: Selector<T>[]): boolean {
		let compare: Comparer<T> = !func
			? defaultComparer
			: func.length == 2 ? func : selectorsToComparer(func as Selector<T>, ...keys);
		for (let i = 1; i < this.length; ++i)
			if (compare(this[i - 1], this[i]) > 0)
				return false;
		return true;
	},

	isDescending<T>(this: Array<T>, func?: Comparer<T> | Selector<T>, ...keys: Selector<T>[]): boolean {
		let compare: Comparer<T> = !func
			? defaultComparer
			: func.length == 2 ? func : selectorsToComparer(func as Selector<T>, ...keys);
		for (let i = 1; i < this.length; ++i)
			if (compare(this[i - 1], this[i]) < 0)
				return false;
		return true;
	},

	forEachAsync<T>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any, options?: AsyncOptions): Promise<void> {
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
	},

	mapAsync<T, TResult>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any, options?: AsyncOptions): Promise<TResult[]> {
		const results = new Array<TResult>(this.length);
		return new Promise((resolve, reject) => {
			this.forEachAsync(async (value, index, array) => {
				const result = await callbackfn(value, index, array);
				results[index] = result;
			}, thisArg, options)
				.then(() => resolve(results), reject);
		});
	},

	binarySearch<T>(this: Array<T>, value: T, param2?: Comparer<T> | "upper" | "lower", param3?: Comparer<T>): number {
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
	},

	binarySearchByKey<T>(this: Array<T>, value: T, param1?: Selector<T> | "upper" | "lower", ...param2: Selector<T>[]): number {
		const bound = typeof param1 == "string" ? param1 : "lower";
		const selectors = typeof param1 == "function" ? [param1, ...param2] : param2;
		return this.binarySearch(value, bound, selectorsToComparer(...selectors));
	},

	ternarySearch<T>(this: Array<T>, param1?: Comparer<T> | "upper" | "lower", param2?: Comparer<T>): number {
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
	},

	ternarySearchByKey<T>(this: Array<T>, param1?: Selector<T> | "upper" | "lower", ...param2: Selector<T>[]): number {
		const bound = typeof param1 == "string" ? param1 : "lower";
		const selectors = typeof param1 == "function" ? [param1, ...param2] : param2;
		return this.ternarySearch(bound, selectorsToComparer(...selectors));
	},
});

function extend(existing: "skip" | "override" | "throw" = "throw"): void {
	const proto = Array.prototype;
	let name: keyof typeof extensions;
	for (name in extensions) {
		if (proto[name]) {
			if (existing == "skip")
				continue;
			if (existing == "throw" && proto[name].toString() != extensions[name].toString())
				throw new Error(`Array.prototype.${name} already assigned with different implementation`);
		}
		Object.defineProperty(proto, name, {
			value: extensions[name],
			enumerable: false,
			configurable: true,
			writable: true,
		});
	}
}

(() => {
	type Version = [major: number, minor: number, patch: number, suffix?: string];

	function stringToVersion(version: string): Version | undefined {
		const groups = version.match(/^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<suffix>.+))?$/)?.groups;
		if (!groups)
			return undefined;
		const result = [Number(groups.major), Number(groups.minor), Number(groups.patch)] as Version;
		if (groups.suffix != null)
			result.push(groups.suffix);
		return result;
	}

	function compareVersion(a: Version, b: Version): -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | undefined {
		for (let i = 0; i < 3; i++) {
			const [x, y] = [a[i], b[i]] as [number, number];
			if (x < y)
				return (i - 4) as any;
			if (x > y)
				return (4 - i) as any;
		}
		if (a[3] === b[3])
			return 0;
		if (a[3] == undefined)
			return 1;
		if (b[3] == undefined)
			return -1;
		return undefined;
	}

	const key = "ArrayExtensionsVersion";
	const symbols = Object.getOwnPropertySymbols(Array.prototype).filter(s => s.description == key);
	if (symbols.length > 1)
		throw new Error("Multiple version check symbols found in Array.prototype.");
	if (symbols.length == 0) {
		extend("throw");
		const symbol = Symbol(key);
		Object.defineProperty(Array.prototype, symbol, {
			value: version,
			enumerable: false,
			configurable: false,
			writable: true
		});
	}
	else {
		const symbol = symbols[0];
		const curVersion = stringToVersion(version)!;
		const loadedVersionStr = Array.prototype[symbol as any];
		if (typeof loadedVersionStr == "string") {
			const loadedVersion = stringToVersion(loadedVersionStr);
			if (loadedVersion) {
				const cmp = compareVersion(curVersion, loadedVersion);
				switch (cmp) {
					case -2:	// Version with newer patch loaded, just skip
					case -1:	// Released version loaded, just skip
					case 0:		// Same version already loaded
						return;
					case 1:		// Current version is a released version, override
					case 2:		// Current version has a newer patch, override
						extend("override");
						Array.prototype[symbol as any] = version;
						const descriptor = Object.getOwnPropertyDescriptor(Array.prototype, symbol)!;
						if (descriptor.enumerable) {
							if (!descriptor.configurable)
								throw new Error("Array extensions version check is enumerable (which should not be) but not configurable.");
							descriptor.enumerable = false;
							Object.defineProperty(Array.prototype, symbol, descriptor);
						}
						return;
					default:
						throw new Error(`Current version is ${version}, but '@basic-type-extensions@${loadedVersionStr}' is already loaded.`);
				}
			}
		}
		throw new Error(`Misconfigured array extensions version check: ${loadedVersionStr}.`);
	}
})();