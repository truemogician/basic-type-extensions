import type { PartialDeep } from "type-fest";

export enum CleanOption {
	Undefined = 1 << 0,
	Null = 1 << 1,
	EmptyObject = 1 << 2,
	EmptyString = 1 << 3,
	All = (1 << 4) - 1
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
		 * Check whether `value` has no properties or is null or undefined
		 */
		isNullOrEmpty(value: any): boolean;
		/**
		 * Check whether `value` is a primitive value
		 */
		isPrimitive(value: any): boolean;
		/**
		 * Returns an object containing all accessor descriptors of an object
		 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
		 */
		getGetterDescriptors<T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };
		/**
		 * Returns an object containing all accessor descriptors of an object
		 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
		 */
		getSetterDescriptors<T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };
		/**
		 * Returns an object containing all accessor descriptors of an object
		 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
		 */
		getAccessorDescriptors<T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };
		/**
		 * Assign values of the common properties of `target` and `source` from `source` to `target`
		 * @param target Target object
		 * @param source Source object
		 */
		innerAssign<T extends object>(target: T, source: PartialDeep<T> & StringKeyObject): T;
		/**
		 * Assign values of the common properties of `target` and `sources` from `sources` to `target`
		 * @param target Target object
		 * @param sources Array of source objects
		 */
		innerAssign<T extends object>(target: T, ...sources: (PartialDeep<T> & StringKeyObject)[]): T;
		/**
		 * Assign values of the common properties of `target` and `sources` from `sources` to `target`, getters in `sources` also included.
		 * @param target Target object
		 * @param sources Array of source objects
		 */
		innerAssignWithGetter<T extends object>(target: T, ...sources: (PartialDeep<T> & StringKeyObject)[]): T;
		/**
		 * Assign values of the common properties of `target` and `sources` from `sources` to `target`, setters in `target` also included.
		 * @param target Target object
		 * @param sources Array of source objects
		 */
		innerAssignWithSetter<T extends object>(target: T, ...sources: (PartialDeep<T> & StringKeyObject)[]): T;
		/**
		 * Assign values of the common properties of `target` and `sources` from `sources` to `target`, getters in `sources` and setters in `target` also included.
		 * @param target Target object
		 * @param sources Array of source objects
		 */
		innerAssignWithAccessor<T extends object>(target: T, ...sources: (PartialDeep<T> & StringKeyObject)[]): T;
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
		clean<T extends object>(src: T, options?: CleanOption): PartialDeep<T>;
		/**
		 * Clean object by a predicate function
		 * @param src Object to clean
		 * @param predicate A function to decide whether a property should be removed
		 */
		clean<T extends object>(src: T, predicate: (key: string, value: any) => boolean): PartialDeep<T>;
		/**
		 * Delete some properties from an object
		 * @param src Object to remove properties from
		 * @param keys Properties to delete
		 */
		delete<T extends object, K extends keyof T>(src: T, ...keys: K[]): Omit<T, K>;
		/**
		 * Delete some properties from an object
		 * @param src Object to remove properties from
		 * @param keys Properties to delete
		 */
		delete<T extends object, K extends keyof T>(src: T, keys: K[]): Omit<T, K>;
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
function getAccessorDescriptors<T extends object>(object: T, config: Partial<Record<"getter" | "setter", boolean>>): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor } {
	const result: { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor } = {};
	do {
		const descriptors = Object.getOwnPropertyDescriptors(object);
		for (const key in descriptors) {
			if (result[key] != undefined)
				continue;
			const descriptor = descriptors[key];
			if (config.getter && descriptor.get || config.setter && descriptor.set)
				(result as any)[key] = descriptor;
		}
		object = Object.getPrototypeOf(object);
	} while (object)
	return result;
}
Object.getGetterDescriptors = function <T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor } {
	return getAccessorDescriptors(object, { getter: true });
}
Object.getSetterDescriptors = function <T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor } {
	return getAccessorDescriptors(object, { setter: true });
}
Object.getAccessorDescriptors = function <T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor } {
	return getAccessorDescriptors(object, { getter: true, setter: true });
}
function innerAssign<T extends object>(target: T, config: Partial<Record<"getter" | "setter", boolean>>, sources: any[]): T {
	const keys = Object.getOwnPropertyNames(target).filter(name => {
		const descriptor = Object.getOwnPropertyDescriptor(target, name);
		return descriptor.writable || config.setter && descriptor.set;
	});
	if (config.setter) {
		const accessors = getAccessorDescriptors(target, { setter: true })
		keys.push(...Object.keys(accessors));
	}
	for (const src of sources) {
		const srcKeys = Object.getOwnPropertyNames(src).filter(name => {
			const descriptor = Object.getOwnPropertyDescriptor(src, name);
			return descriptor.get ? config.getter : !descriptor.set;
		});
		if (config.getter) {
			const accessors = getAccessorDescriptors(src, { getter: true })
			srcKeys.push(...Object.keys(accessors));
		}
		const inter = Array.intersection(keys, srcKeys);
		inter.forEach(key => (target as any)[key] = src[key]);
	}
	return target;
}
Object.innerAssign = function <T extends object>(target: T, ...sources: any[]): T {
	return innerAssign(target, {}, sources);
}
Object.innerAssignWithGetter = function <T extends object>(target: T, ...sources: any[]): T {
	return innerAssign(target, { getter: true }, sources);
}
Object.innerAssignWithSetter = function <T extends object>(target: T, ...sources: any[]): T {
	return innerAssign(target, { setter: true }, sources);
}
Object.innerAssignWithAccessor = function <T extends object>(target: T, ...sources: any[]): T {
	return innerAssign(target, { getter: true, setter: true }, sources);
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
Object.clean = function <T extends object>(src: T, param?: CleanOption | ((key: string, value: any) => boolean)) {
	if (typeof param == "function") {
		for (const key in src) {
			const value = src[key];
			if (param(key, value))
				delete src[key];
			else if (typeof value == "object")
				Object.clean(value as unknown as object, param);
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
				Object.clean(value as unknown as object, options);
				if ((options & CleanOption.EmptyObject) && Object.isEmpty(value))
					delete src[key];
			}
		}
	}
	return src;
}
Object.delete = function <T extends object, K extends keyof T>(src: T, param: K | K[], ...params: K[]): Omit<T, K> {
	const keys = param instanceof Array ? param : [param, ...params];
	for (const key of keys)
		delete src[key];
	return src;
}