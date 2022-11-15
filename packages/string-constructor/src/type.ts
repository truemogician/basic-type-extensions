export { }

declare global {
	interface StringConstructor {
		/**
		 * The empty string.
		 */
		empty: "";

		/**
		 * Checks whether a string is `null`, `undefined` or empty
		 * @param value A string to be checked.
		 */
		isNullOrEmpty(value: string | null | undefined): value is null | undefined | "";

		/**
		 * Checks whether a string is `null`, `undefined` or whitespace.
		 * @param value A string to be checked.
		 */
		isNullOrWhiteSpace(value: string | null | undefined): boolean;
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