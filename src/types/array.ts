/**
 * Options to control asynchronious array operations
 */
export interface AsyncOptions {
	/**
	 * Maximum number of promises to evaluate in parallel.  
	 * If `undefined` or less than `1`, all promises will be evaluated in parallel.
	 */
	maxConcurrency?: number;
}

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

	interface ReadonlyArray<T> {
		/**
		 * Gets the last element of the array.
		 */
		last(): T;

		/**
		 * Index the array in reverse order.
		 * @param index Backward index. Default is `0`.
		 */
		last(index: number): T;

		/**
		 * Calculates the minimum value of the array.
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 */
		minimum(compareFn?: (a: T, b: T) => number): T;

		/**
		 * Calculates the minimum value of the array.
		 * @param selectors A series of key selector functions.
		 */
		minimum(...selectors: ((obj: T) => any)[]): T;

		/**
		 * Calculates the maximum value of the array.
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 */
		maximum(compareFn?: (a: T, b: T) => number): T;

		/**
		 * Calculates the maximum value of the array.
		 * @param selectors A series of key selector functions.
		 */
		maximum(...selectors: ((obj: T) => any)[]): T;

		/**
		 * Calculates the summary of the array.
		 * @param predicate Function used to map each element from `T` to `number`.  
		 */
		sum(predicate?: (value: T) => number): number;

		/**
		 * Calculate the product of the array
		 * @param predicate Function used to map each element from `T` to `number`.  
		 */
		product(predicate?: (value: T) => number): number;

		/**
		 * Groups an array by its keys.
		 * @param selector Key selector function.
		 */
		groupBy<U>(selector: (obj: T) => U): Map<U, T[]>;

		/**
		 * Repeats the array for specified times.
		 * @param count Times to repeat. Default is `1`.
		 * @returns A new array formed by the specified number of repetitions of the given array.
		 */
		repeat(count?: number): T[];

		/**
		 * Checks whether the array has common elements with another.
		 * @param array Another array.
		 */
		intersects(array: Array<T>): boolean;

		/**
		 * Checks whether the array is in ascending order.
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 */
		isAscending(compareFn?: (a: T, b: T) => number): boolean;

		/**
		 * Checks whether the array is in ascending order.
		 * @param selectors A series of key selector functions.
		 */
		isAscending(...selectors: ((obj: T) => any)[]): boolean;

		/**
		 * Checks whether the array is in descending order.
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 */
		isDescending(compareFn?: (a: T, b: T) => number): boolean;

		/**
		 * Checks whether the array is in descending order.
		 * @param selectors A series of key selector functions.
		 */
		isDescending(...selectors: ((obj: T) => any)[]): boolean;

		/**
		 * Performs the specified asynchronous action for each element in an array.
		 * @param callbackfn  An asynchronous function that accepts up to three arguments. `forEachAsync` calls `callbackfn` one time for each element in the array.
		 * @param thisArg  An object to which the this keyword can refer in `callbackfn`. If `thisArg` is omitted, `undefined` is used as `this`.
		 * @param options Asynchronous operation options.
		 */
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any, options?: AsyncOptions): Promise<void>

		/**
		 * Calls a defined asynchronous callback function on each element of an array, and returns an array that contains the results.
		 * @param callbackfn  An asynchronous function that accepts up to three arguments. `forEachAsync` calls `callbackfn` one time for each element in the array.
		 * @param thisArg  An object to which the this keyword can refer in `callbackfn`. If `thisArg` is omitted, `undefined` is used as `this`.
		 * @param options Asynchronous operation options.
		 */
		mapAsync<TResult>(callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any, options?: AsyncOptions): Promise<TResult[]>

		/**
		 * Searches for the index of a specific value in an **ordered** array.
		 * @param value The value to search for in the array.
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 * @return 
		 * - #### Ascending array  
		 *  The index of the first element that is equal to or greater than `value`.  
		 *  If `value` is less than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	The index of the first element that is smaller than or equal to `value`.  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is less than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `0` will be returned.
		 */
		binarySearch(value: T, compareFn?: (a: T, b: T) => number): number;

		/**
		 * Search for the index of a specific value in an **ordered** array.
		 * @param value The value to search for in the array.
		 * @param bound Default is "lower".
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 * @return 
		 * - #### Ascending array
		 *  If `bound` is `"lower"`, the index of the first element that is equal to or greater than `value`.  
		 *  If `bound` is `"upper"`, the index of the first element that is greater than `value` .  
		 *  If `value` is smaller than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	If `bound` is `"lower"`, the index of the first element that is smaller than or equal to `value`.  
		 *  If `bound` is `"upper"`, the index of the first element that is smaller than `value` .  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is smaller than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `-1` will be returned.
		 */
		binarySearch(value: T, bound: "lower" | "upper", compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the index of a specific value in an **ordered** array.
		 * @param value The value to search for in the array.
		 * @param selectors A series of key selector functions.
		 * @return 
		 * - #### Ascending array  
		 *  The index of the first element that is equal to or greater than `value`.  
		 *  If `value` is less than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	The index of the first element that is smaller than or equal to `value`.  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is less than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `0` will be returned.
		 */
		binarySearchByKey(value: T, ...selectors: ((value: T) => any)[]): number;

		/**
		 * Search for the index of a specific value in an **ordered** array.
		 * @param value The value to search for in the array.
		 * @param bound Default is "lower".
		 * @param selectors A series of key selector functions.
		 * @return 
		 * - #### Ascending array
		 *  If `bound` is `"lower"`, the index of the first element that is equal to or greater than `value`.  
		 *  If `bound` is `"upper"`, the index of the first element that is greater than `value` .  
		 *  If `value` is smaller than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	If `bound` is `"lower"`, the index of the first element that is smaller than or equal to `value`.  
		 *  If `bound` is `"upper"`, the index of the first element that is smaller than `value` .  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is smaller than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `-1` will be returned.
		 */
		binarySearchByKey(value: T, bound: "lower" | "upper", ...selectors: ((value: T) => any)[]): number;

		/**
		 * Searches for the extremum in a **unimodal** array.
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 * @return The index of the first extremum.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearch(compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the extremum in a **unimodal** array.
		 * @param bound Default is "lower".
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 * @return The index of the first extremum if `bound` is `"lower"`,  
		 * or the index of the last extremum if `bound` is `"upper"`.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearch(bound: "lower" | "upper", compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the extremum in a **unimodal** array.
		 * @param selectors A series of key selector functions.
		 * @return The index of the first extremum.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearchByKey(...selectors: ((value: T) => any)[]): number;

		/**
		 * Searches for the extremum in a **unimodal** array.
		 * @param bound Default is "lower".
		 * @param selectors A series of key selector functions.
		 * @return The index of the first extremum if `bound` is `"lower"`,  
		 * or the index of the last extremum if `bound` is `"upper"`.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearchByKey(bound: "lower" | "upper", ...selectors: ((value: T) => any)[]): number;
	}

	interface Array<T> extends ReadonlyArray<T> {
		/**
		 * Inserts a value into an **ordered** array using binary search.
		 * @param value Value to insert.
		 * @param compareFn Function used to determine the order of the elements. It is expected to return
		 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
		 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
		 * ```ts
		 * [11,2,22,1].sort((a, b) => a - b)
		 * ```
		 * @returns The index where `value` is inserted.
		 */
		insert(value: T, compareFn?: (a: T, b: T) => number): number;

		/**
		 * Inserts a value into specific position into an array.
		 * @param value Value to insert.
		 * @param index Index where `value` will be inserted.
		 * @returns `true` if `value` is successfully inserted.
		 */
		insertAt(value: T, index: number): boolean;

		/**
		 * Removes all items that equals to `value` from an array.
		 * @param value Value to remove.
		 * @returns The number of items removed.
		 */
		remove(value: T): number;

		/**
		 * Removes all items that equals to any `values` from an array.
		 * @param values Values to remove.
		 * @returns The number of items removed
		 */
		remove(...values: T[]): number;

		/**
		 * Removes the item at `index` from an array.
		 * @param index Index of the item to remove.
		 * @returns Whether the item is successfully removed.
		 */
		removeAt(index: number): boolean;

		/**
		 * Removes items in `indices` from an array.
		 * @param indices Indices of items remove.
		 * @returns Whether all items are successfully removed.
		 */
		removeAt(...indices: number[]): boolean;

		/**
		 * Sorts the array in place by keys provided by a series of key selector functions.
		 * @param selectors A series of of key selector functions.
		 */
		sortByKey(...selectors: ((obj: T) => any)[]): T[];

		/**
		 * Shuffles the array randomly in place.
		 * @return A reference to the array.
		 */
		shuffle(): T[];
	}
}