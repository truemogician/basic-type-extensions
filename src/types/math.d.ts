export { }

declare global {
	interface Math {
		/**
		 * Returns a random integer between `min` and `max`.
		 * @param min Lower bound.
		 * @param max Upper bound, exclusive.
		 */
		randomInteger(min: number, max: number): number;

		/**
		 * Returns a random integer between 0 and `max`.
		 * @param max Upper bound, exclusive.
		 */
		randomInteger(max: number): number;

		/**
		 * Returns a random float number between `min` and `max`.
		 * @param min Lower bound.
		 * @param max Upper bound.
		 */
		randomFloat(min: number, max: number): number;

		/**
		 * Returns a random float number between 0 and `max`.
		 * @param max Upper bound.
		 */
		randomFloat(max: number): number;
	}
}