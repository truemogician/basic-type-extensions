export { }

declare global {
	interface ArrayConstructor {
		/**
		 * Calculates the intersection of two arrays.
		 * @param array1 The first array.
		 * @param array2 The second array.
		 * @returns The intersection array. For repetitious elements, the minor amount of which will be kept.
		 */
		intersection<T = any>(array1: readonly T[], array2: readonly T[]): T[];

		/**
		 * Calculates the intersection of multiple arrays.
		 * @returns The intersection array. For repetitious elements, the minimum amount of which will be kept.
		 */
		intersection<T = any>(...arrays: (readonly T[])[]): T[];

		/**
		 * Calculates the union of two arrays.
		 * @param array1 The first array.
		 * @param array2 The second array.
		 * @returns The union array. For repetitious elements, the major amount of which will be kept.
		 */
		union<T = any>(array1: readonly T[], array2: readonly T[]): T[];

		/**
		 * Calculates the union of multiple arrays.
		 * @returns The union array. For repetitious elements, the maximum amount of which will be kept.
		 */
		union<T = any>(...arrays: (readonly T[])[]): T[];

		/**
		 * Calculates `source`'s complement array to `universal`
		 */
		complement<T = any>(source: readonly T[], universal: readonly T[]): T[];

		/**
		 * Calculates `source`'s difference set to `target`.
		 */
		difference<T = any>(source: readonly T[], target: readonly T[]): T[];

		/**
		 * Creates an array of integers from `begin` to `end`.
		 * @param begin Beginning number, included in result.
		 * @param end Ending number, included in result.
		 */
		range(begin: number, end: number): number[];

		/**
		 * Creates an array of integers from `begin` to `end` with `step`.
		 * @param begin Beginning number, included in result.
		 * @param end Ending number, included in result.
		 * @param step Step size.
		 */
		range(begin: number, end: number, step: number): number[];

		/**
		 * Creates an array of integers from `begin` to `end` filtered by `predicate`.
		 * @param begin Beginning number, included in result.
		 * @param end Ending number, included in result.
		 * @param predicate Function used to determine whether a number will be included.
		 */
		range(begin: number, end: number, predicate: (item: number) => boolean): number[];

		/**
		 * Creates an array of integers from `begin` to `end` with `step` filtered by `predicate`.
		 * @param begin Beginning number, included in result.
		 * @param end Ending number, included in result.
		 * @param step Step size.
		 * @param predicate Function used to determine whether a number will be included.
		 */
		range(begin: number, end: number, step: number, predicate: (item: number) => boolean): number[];
	}
}