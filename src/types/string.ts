export { }
declare global {
	interface StringConstructor {
		/**
		 * The empty string.
		 */
		empty: string;

		/**
		 * Checks whether a string is `null` or empty
		 * @param value String to check.
		 */
		isNullOrEmpty(value: string | null): boolean;

		/**
		 * Checks whether a string is `null` or whitespace.
		 * @param value String to check.
		 */
		isNullOrWhiteSpace(value: string | null): boolean;
	}

	interface String {
		/**
		 * Removes some characters from string starting at certain position.
		 * @param from Start index.
		 * @param length Number of characters to remove.
		 */
		remove(from: number, length?: number): string;

		/**
		 * Splits the string into two substrings.
		 * @param index Index of the split point.
		 * @param charAtIndex Determines how the character at `index` will be handled. Default is `"succ"`.  
		 * - `"pre"`: Place in the preceding substring  
		 * - `"succ"`: Place in the succeeding substring  
		 * - `"both"`: Place in both substrings  
		 * - `"none"`: Ignore the character
		 */
		splitAt(index: number, charAtIndex?: "pred" | "succ" | "both" | "none"): string[];

		/**
		 * Splits the string into multiple substrings.
		 * @param indices Arrays of indices of the split points.
		 * @param charAtIndex Determines how the character at `index` will be handled. Default is `"succ"`.   
		 * - `"pre"`: Place in the preceding substring  
		 * - `"succ"`: Place in the succeeding substring  
		 * - `"both"`: Place in both substrings  
		 * - `"none"`: Ignore the character
		 */
		splitAt(indices: number[], charAtIndex?: "pred" | "succ" | "both" | "none"): string[]
	}
}