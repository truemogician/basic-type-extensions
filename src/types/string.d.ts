export { }
declare global {
	interface StringConstructor {
		/**
		 * An empty string
		 */
		empty: string;

		/**
		 * Check whether `value` is null or empty
		 * @param value String to be checked
		 */
		isNullOrEmpty(value: string | null): boolean;

		/**
		 * Check whether `value` is null or whitespace
		 * @param value String to be checked
		 */
		isNullOrWhiteSpace(value: string | null): boolean;
	}

	interface String {
		/**
		 * Remove `length` characters from string starting at `from`
		 * @param from Start index
		 * @param length Number of characters to remove
		 */
		remove(from: number, length?: number): string;

		/**
		 * Split the string into two substrings
		 * @param index Where the string will be splited at
		 * @param charAtIndex Determines how the character at `index` will be handled. Default is `"succ"`
		 * `"pre"`: Place in the preceding substring  
		 * `"succ"`: Place in the succeeding substring  
		 * `"both"`: Place in both substrings  
		 * `"none"`: Ignore the character
		 */
		splitAt(index: number, charAtIndex?: "pred" | "succ" | "both" | "none"): string[];

		/**
		 * Split the string into multiple substrings
		 * @param indices Array of indices indicating where the string will be splited at
		 * @param charAtIndex Determines how the character at `index` will be handled. Default is `"succ"`   
		 * `"pre"`: Place in the preceding substring  
		 * `"succ"`: Place in the succeeding substring  
		 * `"both"`: Place in both substrings  
		 * `"none"`: Ignore the character
		 */
		splitAt(indices: number[], charAtIndex?: "pred" | "succ" | "both" | "none"): string[]
	}
}