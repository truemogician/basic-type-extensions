import type { PartialDeep } from "type-fest";
import type { CleanOption } from "./object-constructor";

export { CleanOption } from "./object-constructor";

export interface RightAssignOptions {
	/**
	 * If `true`, right assignment will also be applied to object properties nestedly.
	 */
	nested?: boolean;

	/**
	 * If `true`, getters of `source` will also be included.
	 */
	getter?: boolean;
}

type StringKeyObject<TValue = any> = { [K: string]: TValue; }

declare global {
	interface ObjectConstructor {
		/**
		 * Checks whether an object is empty, which means it has no properties, both enumerable and non-enumerable.
		 * @note Symbol properties are also checked.
		 * @note `null` and `undefined` are also considered empty.
		 * @note Empty arrays have an enumerable property `length` with value `0`, so they are not considered empty.  
		 * To include empty arrays, use `Object.isEnumerablyEmpty` instead.
		 */
		isEmpty(obj?: object | null): boolean;

		/**
		 * Checks whether an object has at least one property, both enumerable and non-enumerable.
		 * @note Symbol properties are also checked.
		 * @note Empty arrays have an enumerable property `length` with value `0`, so they are considered to have properties.  
		 * To exclude empty arrays, use `Object.hasEnumerableProperties` instead.
		 */
		hasProperties(obj?: object | null): obj is object;

		/**
		 * Checks whether an object is enumerably empty, which means it has no enumerable properties. 
		 * @note Enumerable symbol properties are also checked.
		 * @note `null` and `undefined` are also considered empty.
		 */
		isEnumerablyEmpty(obj?: object | null): boolean;

		/**
		 * Checks whether an object has at least one enumerable property.
		 * @note Enumerable symbol properties are also checked.
		 */
		hasEnumerableProperties(obj?: object | null): obj is object;

		/**
		 * Checks whether `value` is `null` or `undefined`.
		 */
		isNullOrUndefined(value: any): value is null | undefined;

		/**
		 * Checks whether `value` is a primitive value, which means it is not an object or a function.
		 * @note `null` is considered a primitive value, though `typeof null` is `"object"`.
		 */
		isPrimitive(value: any): value is undefined | null | boolean | number | string | symbol | bigint;

		/**
		 * Returns an object containing all accessor descriptors of an object.
		 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
		 */
		getGetterDescriptors<T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };

		/**
		 * Returns an object containing all accessor descriptors of an object.
		 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
		 */
		getSetterDescriptors<T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };

		/**
		 * Returns an object containing all accessor descriptors of an object.
		 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
		 */
		getAccessorDescriptors<T extends object>(object: T): { [P in keyof T]?: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };

		/**
		 * Assigns common properties from `source` to `target`.
		 * @param target Target object.
		 * @param source Source object.
		 */
		innerAssign<T extends object>(target: T, source: PartialDeep<T> & StringKeyObject): T;

		/**
		 * Assigns common properties from `sources` to `target`.
		 * @param target Target object.
		 * @param sources Array of source objects.
		 */
		innerAssign<T extends object>(target: T, ...sources: (PartialDeep<T> & StringKeyObject)[]): T;

		/**
		 * Assigns all properties from `source` to `target`.
		 * @param target Target object.
		 * @param source Source object.
		 */
		rightAssign<T extends object, R extends object>(target: T, source: R, options?: RightAssignOptions): T & R;

		/**
		 * Assigns common properties from `sources` to `target`, getters in `sources` also included.
		 * @param target Target object.
		 * @param sources Array of source objects.
		 */
		innerAssignWithGetter<T extends object>(target: T, ...sources: (PartialDeep<T> & StringKeyObject)[]): T;

		/**
		 * Assigns common properties from `sources` to `target`, setters in `target` also included.
		 * @param target Target object.
		 * @param sources Array of source objects.
		 */
		innerAssignWithSetter<T extends object>(target: T, ...sources: (PartialDeep<T> & StringKeyObject)[]): T;

		/**
		 * Assigns common properties from `sources` to `target`, getters in `sources` and setters in `target` also included.
		 * @param target Target object.
		 * @param sources Array of source objects.
		 */
		innerAssignWithAccessor<T extends object>(target: T, ...sources: (PartialDeep<T> & StringKeyObject)[]): T;

		/**
		 * Shallow copys an instance.
		 * @param src Source instance.
		 */
		copy<T>(src: T): T;

		/**
		 * Deep clones an instance.
		 * @param src Source instance.
		 */
		clone<T>(src: T): T;

		/**
		 * Cleans `null` and `undefined` properties of an object.
		 * @param src Object to clean.
		 */
		clean<T extends object>(src: T): PartialDeep<T>;

		/**
		 * Cleans empty properties of an object.
		 * @param src Object to clean.
		 * @param options Options to determine the kinds of properties to remove.
		 * @param recursive If `true`, nested objects will also be cleaned. Default is `true`.
		 */
		clean<T extends object>(src: T, options: CleanOption, recursive?: boolean): PartialDeep<T>;

		/**
		 * Cleans an object.
		 * @param src Object to clean.
		 * @param predicate Function to determine whether a property should be cleaned.
		 * @param recursive If `true`, nested objects will also be cleaned. Default is `true`.
		 */
		clean<T extends object>(src: T, predicate: (key: string, value: any) => boolean, recursive?: boolean): PartialDeep<T>;

		/**
		 * Deletes some properties from an object.
		 * @param src Object to remove properties from.
		 * @param keys Properties to delete.
		 */
		delete<T extends object, K extends keyof T>(src: T, ...keys: K[]): Omit<T, K>;

		/**
		 * Deletes some properties from an object.
		 * @param src Object to remove properties from.
		 * @param keys Properties to delete.
		 */
		delete<T extends object, K extends keyof T>(src: T, keys: K[]): Omit<T, K>;
	}
}