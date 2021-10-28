export enum CleanOption {
	Undefined = 1 << 0,
	Null = 1 << 1,
	EmptyObject = 1 << 2,
	EmptyString = 1 << 3,
	All = (1 << 4) - 1
}

type DeepPartial<T extends {}> = {
	[K in keyof T]?: T[K] extends (infer Item)[] ? (DeepPartial<Item> | Item)[] : DeepPartial<T[K]>;
}

type StringKeyObject<TValue = any> = { [K: string]: TValue; }

declare global {
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
		 * Check whether `value` has no keys or is null or undefined
		 */
		isNullOrEmpty(value: any): boolean;
		/**
		 * Check whether `value` is a primitive value
		 */
		isPrimitive(value: any): boolean;
		/**
		 * Assign values of the common keys of `target` and `source` from `source` to `target`
		 * @param target Target object
		 * @param source Source object
		 */
		innerAssign<T extends {}>(target: T, source: DeepPartial<T> & StringKeyObject): T;
		/**
		 * Assign values of the common keys of `target` and `sources` from `sources` to `target`
		 * @param target Target object
		 * @param sources Array of source objects
		 */
		innerAssign<T extends {}>(target: T, ...sources: (DeepPartial<T> & StringKeyObject)[]): T;
		/**
		 * Shallow copy an instance
		 * @param src Source instance
		 */
		copy<T>(src: T): T;
		/**
		 * Deep clone an instance
		 * @param src Source instance
		 */
		clone<T>(src: T): T;
		/**
		 * Clean empty properties of an object
		 * @param src Object to clean
		 * @param options Options to decide the kinds of properties to remove, default is null and undefined
		 */
		clean<T extends {}>(src: T, options?: CleanOption): DeepPartial<T>;
		/**
		 * Clean object by a predicate function
		 * @param src Object to clean
		 * @param predicate A function to decide whether a property should be removed
		 */
		clean<T extends {}>(src: T, predicate: (key: string, value: any) => boolean): DeepPartial<T>;
	}
}

Object.isEmpty = function (value: {}): boolean {
	return Object.keys(value).length == 0;
}
Object.isNullOrUndefined = function (value: any): boolean {
	return value == null || value == undefined;
}
Object.isNullOrEmpty = function (value: any): boolean {
	return value == null || Object.keys(value).length == 0;
}
Object.isPrimitive = function (value: any): boolean {
	if (value === null)
		return true;
	const type = typeof value;
	return type != "object" && type != "function";
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
Object.copy = function <T = any>(src: T): T {
	if (src === null)
		return null;
	switch (typeof src) {
		case "object":
			let result = src.constructor();
			Object.assign(result, src);
			return result;
		case "function":
			return src.bind({});
		default:
			return src;
	}
}
Object.clone = require("lodash.clonedeep");
Object.clean = function <T extends {}>(src: T, param?: CleanOption | ((key: string, value: any) => boolean)) {
	if (typeof param == "function") {
		for (const key in src) {
			const value = src[key];
			if (param(key, value))
				delete src[key];
			else if (typeof value == "object")
				Object.clean(value, param);
		}
	}
	else {
		const options: CleanOption = param ?? (CleanOption.Null | CleanOption.Undefined);
		for (const key in src) {
			const value = src[key];
			if ((options & CleanOption.Null) && value === null)
				delete src[key];
			else if ((options & CleanOption.Undefined) && value === undefined)
				delete src[key];
			else if ((options & CleanOption.EmptyString) && value as any === "")
				delete src[key];
			else if (typeof value == "object") {
				Object.clean(value, options);
				if ((options & CleanOption.EmptyObject) && Object.isEmpty(value))
					delete src[key];
			}
		}
	}
	return src;
}