import type { PartialDeep } from "type-fest";
import type { RightAssignOptions } from "./type";

export enum CleanOption {
	Undefined = 1 << 0,
	Null = 1 << 1,
	EmptyObject = 1 << 2,
	EmptyString = 1 << 3,
	All = (1 << 4) - 1
}

Object.isEmpty = function (value: any): boolean {
	return value == null || Object.keys(value).length == 0;
}

Object.isNullOrUndefined = function (value: any): boolean {
	return value == null;
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
		const descriptor = Object.getOwnPropertyDescriptor(target, name)!;
		return descriptor.writable || config.setter && descriptor.set;
	});
	if (config.setter) {
		const accessors = getAccessorDescriptors(target, { setter: true })
		keys.push(...Object.keys(accessors));
	}
	for (const src of sources) {
		const srcKeys = Object.getOwnPropertyNames(src).filter(name => {
			const descriptor = Object.getOwnPropertyDescriptor(src, name)!;
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

Object.rightAssign = function <T extends object, R extends object>(target: T, source: R, options?: RightAssignOptions): T & R {
	const srcKeys = Object.getOwnPropertyNames(source).filter(name => {
		const descriptor = Object.getOwnPropertyDescriptor(source, name)!;
		return descriptor.get ? options?.getter : !descriptor.set;
	});
	if (options?.getter) {
		const accessors = getAccessorDescriptors(source, { getter: true })
		srcKeys.push(...Object.keys(accessors));
	}
	for (const key of srcKeys) {
		const value = source[key];
		if (options?.nested) {
			const dst = (target as any)[key];
			if (typeof dst == "object" && typeof value == "object") {
				Object.rightAssign(dst, value, options);
				continue;
			}
		}
		(target as any)[key] = source[key];
	}
	return target as T & R;
}

Object.copy = function <T = any>(src: T): T {
	if (src == null)
		return (src === undefined ? undefined : null) as T;
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

function cleanObject<T extends object>(src: T, param: CleanOption | ((key: string, value: any) => boolean), recursive: boolean, ancestors: object[]): PartialDeep<T> {
	if (ancestors.includes(src))
		return src as PartialDeep<T>;
	if (typeof param == "function") {
		for (const key in src) {
			const value = src[key];
			if (param(key, value))
				delete src[key];
			else if (recursive && typeof value == "object") {
				ancestors.push(src)
				cleanObject(value as unknown as object, param, recursive, ancestors);
				ancestors.pop();
			}
		}
	}
	else {
		for (const key in src) {
			const value = src[key];
			if ((param & CleanOption.Null) && value === null)
				delete src[key];
			else if ((param & CleanOption.Undefined) && value === undefined)
				delete src[key];
			else if ((param & CleanOption.EmptyString) && value as any === "")
				delete src[key];
			else if (recursive && typeof value == "object") {
				ancestors.push(src);
				cleanObject(value as unknown as object, param, recursive, ancestors);
				ancestors.pop();
				if ((param & CleanOption.EmptyObject) && Object.isEmpty(value))
					delete src[key];
			}
		}
	}
	return src as PartialDeep<T>;
}

Object.clean = function <T extends object>(src: T, param?: CleanOption | ((key: string, value: any) => boolean), recursive?: boolean) {
	return cleanObject(src, param ?? (CleanOption.Null | CleanOption.Undefined), recursive !== false, []);
}

Object.delete = function <T extends object, K extends keyof T>(src: T, param: K | K[], ...params: K[]): Omit<T, K> {
	const keys = param instanceof Array ? param : [param, ...params];
	for (const key of keys)
		delete src[key];
	return src;
}