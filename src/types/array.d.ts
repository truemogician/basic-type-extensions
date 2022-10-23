/**
 * Options to control asynchronious array operations
 */
export interface AsyncOptions {
	/**
	 * Maximum number of promises to evaluate in parallel
	 * If undefined or less than 1, all promises will be evaluated in parallel
	 */
	maxConcurrency?: number;
}

declare global {
	interface ArrayConstructor {
		/**
		 * Calculate the intersection of two arrays
		 * @param array1 The first array
		 * @param array2 The second array
		 * @returns Intersection result. For duplicate values, the minor amount of which will be kept
		 */
		intersection<T = any>(array1: readonly T[], array2: readonly T[]): T[];

		/**
		 * Calculate the intersection of multiple arrays
		 * @param arrays Arrays
		 * @returns Intersection result. For duplicate values, the minimum amount of which will be kept
		 */
		intersection<T = any>(...arrays: (readonly T[])[]): T[];

		/**
		 * Calculate the union of two arrays
		 * @param array1 The first array
		 * @param array2 The second array
		 * @returns Union result. For duplicate values, the major amount of which will be kept
		 */
		union<T = any>(array1: readonly T[], array2: readonly T[]): T[];

		/**
		 * Calculate the union of multiple arrays
		 * @param arrays Arrays
		 * @returns Union result. For duplicate values, the maximum amount of which will be kept
		 */
		union<T = any>(...arrays: (readonly T[])[]): T[];

		/**
		 * Calculate the `source` array's complement array to the `universal` array
		 */
		complement<T = any>(source: readonly T[], universal: readonly T[]): T[];

		/**
		 * Calculate the the source array's difference set to the target array
		 */
		difference<T = any>(source: readonly T[], target: readonly T[]): T[];

		/**
		 * Create an array of integers from `begin` to `end`
		 * @param begin Beginning number, included
		 * @param end Ending number, included
		 */
		range(begin: number, end: number): number[];

		/**
		 * Create an array of integers from `begin` to `end`
		 * @param begin Beginning number, included
		 * @param end Ending number, included
		 */
		range(begin: number, end: number, step: number): number[];

		/**
		 * Create an array of integers from `begin` to `end` filtered by `predicate`
		 * @param begin Beginning number, included
		 * @param end Ending number, included
		 * @param predicate Determines whether a number will be included
		 */
		range(begin: number, end: number, predicate: (item: number) => boolean): number[];

		/**
		 * Create an array of integers from `begin` to `end` filtered by `predicate`
		 * @param begin Beginning number, included
		 * @param end Ending number, included
		 * @param predicate Determines whether a number will be included
		 */
		range(begin: number, end: number, step: number, predicate: (item: number) => boolean): number[];
	}

	interface ReadonlyArray<T> {
		/**
		 * Index the array backward
		 * @param index Backward index. Default is 0
		 */
		last(index?: number): T;

		/**
		 * Get the minimum item in array
		 * @param compareFn Compare function
		 */
		minimum(compareFn?: (a: T, b: T) => number): T;

		/**
		 * Get the minimum item in array using key comparison
		 * @param keys Array of key-generation functions
		 */
		minimum(...keys: ((obj: T) => any)[]): T;

		/**
		 * Get the maximum item in array
		 * @param compareFn Compare function
		 */
		maximum(compareFn?: (a: T, b: T) => number): T;

		/**
		 * Get the maximum item in array using key comparison
		 * @param keys Array of key-generation functions
		 */
		maximum(...keys: ((obj: T) => any)[]): T;

		/**
		 * Calculate the summary of the array
		 * @param predicate A function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		sum(predicate?: (value: T) => number): number;

		/**
		 * Calculate the product of the array
		 * @param predicate A function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		product(predicate?: (value: T) => number): number;

		/**
		 * Group an array by its key
		 * @param key Map key selector
		 */
		groupBy<U>(key: (obj: T) => U): Map<U, T[]>;

		/**
		 * Repeat the array `count` times
		 * @param count Default is 1, which means no repeat
		 */
		repeat(count?: number): T[];

		/**
		 * Check whether the array has common elements with another array
		 * @param array Another array
		 */
		intersects(array: Array<T>): boolean;

		/**
		 * Check whether the array is ascending
		 * @param predicate Compare function
		 */
		isAscending(predicate?: (a: T, b: T) => number): boolean;

		/**
		 * Check whether the array is ascending using key comparison
		 * @param keys Array of key-generation functions
		 */
		isAscending(...keys: ((obj: T) => any)[]): boolean;

		/**
		 * Check whether the array is descending
		 * @param predicate Compare function
		 */
		isDescending(predicate?: (a: T, b: T) => number): boolean;

		/**
		 * Check whether the array is descending using key comparison
		 * @param keys Array of key-generation functions
		 */
		isDescending(...keys: ((obj: T) => any)[]): boolean;

		/**
		 * Performs the specified asynchronous action for each element in an array
		 * @param callbackfn  An asynchronous function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array
		 * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If `thisArg` is omitted, undefined is used as the this value
		 * @param options Asynchronous operation options
		 */
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any, options?: AsyncOptions): Promise<void>

		/**
		 * Calls a defined asynchronous callback function on each element of an array, and returns an array that contains the results
		 * @param callbackfn An asynchronous function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array
		 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value
		 * @param options Asynchronous operation options
		 */
		mapAsync<TResult>(callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any, options?: AsyncOptions): Promise<TResult[]>

		/**
		 * Search for the index of a specific value in an **ordered** array
		 * @param value The value to search for in the array
		 * @param compareFn Compare function
		 * @return 
		 * - #### Ascending array  
		 *  The index of the first largest element that is less than or equal to `value`.  
		 *  If `value` is less than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	The index of the first smallest element that is greater than or equal to `value`.  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is less than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `-1` will be returned.
		 */
		binarySearch(value: T, compareFn?: (a: T, b: T) => number): number;

		/**
		 * Search for the index of a specific value in an **ordered** array
		 * @param value The value to search for in the array
		 * @param compareFn Compare function
		 * @param bound Default is "lower"
		 * @return 
		 * - #### Ascending array
		 *  The index of the first largest element that is less than or equal to `value` if `bound` is `"lower"`.  
		 *  Or the index of the smallest element that is greater than `value` if `bound` is `"upper"`.  
		 *  If `value` is less than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	The index of the first smallest element that is greater than or equal to `value` if `bound` is `"lower"`.  
		 *  Or the index of the largest element that is less than `value` if `bound` is `"upper"`.  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is less than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `-1` will be returned.
		 */
		binarySearch(value: T, bound?: "lower" | "upper", compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the extremum in a **unimodal** array
		 * @param compareFn Compare function
		 * @return The index of the first extremum.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearch(compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the extremum in a **unimodal** array
		 * @param compareFn Compare function
		 * @param bound Default is "lower"
		 * @return The index of the first extremum if `bound` is `"lower"`,  
		 * or the index of the last extremum if `bound` is `"upper"`.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearch(bound?: "lower" | "upper", compareFn?: (a: T, b: T) => number): number;
	}

	interface Array<T> {
		/**
		 * Index the array backward
		 * @param index Backward index. Default is 0
		 */
		last(index?: number): T;

		/**
		 * Insert a value into an ascending array using binary search
		 * @param value Value to be inserted
		 * @returns The index where `value` is inserted
		 */
		insert(value: T): number;

		/**
		 * Insert a value into specific position
		 * @param value Value to be inserted
		 * @param index Index where `value` will be inserted
		 * @returns True if `value` is successfully inserted
		 */
		insertAt(value: T, index: number): boolean;

		/**
		 * Remove all items that equals to `value` from array
		 * @param value Value to be remoevd
		 * @returns The number of items removed
		 */
		remove(value: T): number;

		/**
		 * Remove all items that equals to any `values` from array
		 * @param values Values to be remoevd
		 * @returns The number of items removed
		 */
		remove(...values: T[]): number;

		/**
		 * Remove the item at `index` from array
		 * @param index Index of item to be removed
		 * @returns Whether the item is successfully removed
		 */
		removeAt(index: number): boolean;

		/**
		 * Remove items in `indices` from array
		 * @param indices Indices of items to be removed
		 * @returns Whether all items are successfully removed
		 */
		removeAt(...indices: number[]): boolean;

		/**
		 * Calculate the summary of the array
		 * @param predicate A function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		sum(predicate?: (value: T) => number): number;

		/**
		 * Calculate the product of the array
		 * @param predicate A function that map each element from `T` to `number`. Default conversion function will be used when ommited
		 */
		product(predicate?: (value: T) => number): number;

		/**
		 * Get the minimum item in array
		 * @param compareFn Compare function
		 */
		minimum(compareFn?: (a: T, b: T) => number): T;

		/**
		 * Get the minimum item in array using key comparison
		 * @param keys Array of key-generation functions
		 */
		minimum(...keys: ((obj: T) => any)[]): T;

		/**
		 * Get the maximum item in array
		 * @param compareFn Compare function
		 */
		maximum(compareFn?: (a: T, b: T) => number): T;

		/**
		 * Get the maximum item in array using key comparison
		 * @param keys Array of key-generation functions
		 */
		maximum(...keys: ((obj: T) => any)[]): T;

		/**
		 * Group an array by its key
		 * @param key Map key selector
		 */
		groupBy<U>(key: (obj: T) => U): Map<U, T[]>;

		/**
		 * Sort the array in place by keys provided by a series of key selector functions
		 * @param keys Array of key selector functions
		 */
		keySort(...keys: ((obj: T) => any)[]): T[];

		/**
		 * Shuffle the array randomly in place
		 * @return A reference to the array
		 */
		shuffle(): T[];

		/**
		 * Repeat the array `count` times
		 * @param count Default is 1, which means no repeat
		 */
		repeat(count?: number): T[];

		/**
		 * Check whether the array has common elements with another array
		 * @param array Another array
		 */
		intersects(array: Array<T>): boolean;

		/**
		 * Check whether the array is ascending
		 * @param predicate Compare function
		 */
		isAscending(predicate?: (a: T, b: T) => number): boolean;

		/**
		 * Check whether the array is ascending using key comparison
		 * @param keys Array of key-generation functions
		 */
		isAscending(...keys: ((obj: T) => any)[]): boolean;

		/**
		 * Check whether the array is descending
		 * @param predicate Compare function
		 */
		isDescending(predicate?: (a: T, b: T) => number): boolean;

		/**
		 * Check whether the array is descending using key comparison
		 * @param keys Array of key-generation functions
		 */
		isDescending(...keys: ((obj: T) => any)[]): boolean;

		/**
		 * Performs the specified asynchronous action for each element in an array
		 * @param callbackfn  An asynchronous function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array
		 * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If `thisArg` is omitted, undefined is used as the this value
		 * @param options Asynchronous operation options
		 */
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => Promise<any>, thisArg?: any, options?: AsyncOptions): Promise<void>

		/**
		 * Calls a defined asynchronous callback function on each element of an array, and returns an array that contains the results
		 * @param callbackfn An asynchronous function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array
		 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value
		 * @param options Asynchronous operation options
		 */
		mapAsync<TResult>(callbackfn: (value: T, index: number, array: T[]) => Promise<TResult>, thisArg?: any, options?: AsyncOptions): Promise<TResult[]>

		/**
		 * Search for the index of a specific value in an **ordered** array
		 * @param value The value to search for in the array
		 * @param compareFn Compare function
		 * @return 
		 * - #### Ascending array  
		 *  The index of the first largest element that is less than or equal to `value`.  
		 *  If `value` is less than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	The index of the first smallest element that is greater than or equal to `value`.  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is less than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `-1` will be returned.
		 */
		binarySearch(value: T, compareFn?: (a: T, b: T) => number): number;

		/**
		 * Search for the index of a specific value in an **ordered** array
		 * @param value The value to search for in the array
		 * @param compareFn Compare function
		 * @param bound Default is "lower"
		 * @return 
		 * - #### Ascending array
		 *  The index of the first largest element that is less than or equal to `value` if `bound` is `"lower"`.  
		 *  Or the index of the smallest element that is greater than `value` if `bound` is `"upper"`.  
		 *  If `value` is less than the first element, `0` will be returned.  
		 *  If `value` is greater than the last element, the length of the array will be returned.
		 * - #### Descending array
		 * 	The index of the first smallest element that is greater than or equal to `value` if `bound` is `"lower"`.  
		 *  Or the index of the largest element that is less than `value` if `bound` is `"upper"`.  
		 * 	If `value` is greater than the first element, `0` will be returned.  
		 * 	If `value` is less than the last element, the length of the array will be returned.
		 * 
		 * If the array is empty, `-1` will be returned.
		 */
		binarySearch(value: T, bound?: "lower" | "upper", compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the extremum in a **unimodal** array
		 * @param compareFn Compare function
		 * @return The index of the first extremum.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearch(compareFn?: (a: T, b: T) => number): number;

		/**
		 * Searches for the extremum in a **unimodal** array
		 * @param compareFn Compare function
		 * @param bound Default is "lower"
		 * @return The index of the first extremum if `bound` is `"lower"`,  
		 * or the index of the last extremum if `bound` is `"upper"`.  
		 * If the array is empty, `-1` will be returned.
		 */
		ternarySearch(bound?: "lower" | "upper", compareFn?: (a: T, b: T) => number): number;
	}
}