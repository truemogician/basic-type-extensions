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
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
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
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
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
		 * @param predicate Function used to map each element from `T` to `number`. If omitted, `Number` will be used.
		 */
		sum(predicate?: (value: T) => number): number;

		/**
		 * Calculates the product of the array
		 * @param predicate Function used to map each element from `T` to `number`. If omitted, `Number` will be used.
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
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
		 * ```
		 */
		intersects(array: Array<T>, compareFn?: (a: T, b: T) => number): boolean;

		/**
		 * Checks whether the current array is a subset of another.
		 * @param array Another array.
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
		 * ```
		 */
		isSubsetOf(array: Array<T>, compareFn?: (a: T, b: T) => number): boolean;

		/**
		 * Checks whether the current array is a proper subset of another.
		 * @param array Another array.
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
		 * ```
		 */
		isProperSubsetOf(array: Array<T>, compareFn?: (a: T, b: T) => number): boolean;

		/**
		 * Checks whether the current array is a superset of another.
		 * @param array Another array.
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
		 * ```
		 */
		isSupersetOf(array: Array<T>, compareFn?: (a: T, b: T) => number): boolean;

		/**
		 * Checks whether the current array is a proper superset of another.
		 * @param array Another array.
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
		 * ```
		 */
		isProperSupersetOf(array: Array<T>, compareFn?: (a: T, b: T) => number): boolean;

		/**
		 * Checks whether the array is in ascending order.
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
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
		 * @param compareFn Function used to compare two elements. If omitted, the following default comparer will be used:
		 * ```js
		 * const defaultComparer = (a, b) => a < b ? -1 : a > b ? 1 : 0
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