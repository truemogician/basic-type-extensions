export enum CleanOption {
	Undefined = 1 << 0,
	Null = 1 << 1,
	EmptyObject = 1 << 2,
	EmptyString = 1 << 3,
	All = (1 << 4) - 1
}

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
		 * Assign all values from `source` to `target`
		 * @param target Target object
		 * @param source Source object
		 */
		rightAssign<T extends object, R extends object>(target: T, source: R, options?: RightAssignOptions): T & R;

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
		 * @param recursive If `true`, nested objects will also be cleaned. Default is `true`
		 */
		clean<T extends object>(src: T, options?: CleanOption, recursive?: boolean): PartialDeep<T>;

		/**
		 * Clean object by a predicate function
		 * @param src Object to clean
		 * @param predicate A function to decide whether a property should be removed
		 * @param recursive If `true`, nested objects will also be cleaned. Default is `true`
		 */
		clean<T extends object>(src: T, predicate: (key: string, value: any) => boolean, recursive?: boolean): PartialDeep<T>;

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