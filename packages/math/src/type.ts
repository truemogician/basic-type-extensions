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

		/**
		 * Returns a supplied numeric expression rounded to a specific precision.
		 * @param x The value to be rounded to a specific precision.
		 * @param precision The number of digits to appear after the decimal point. Could be negative.
		 */
		roundTo(x: number, precision: number): number;

		/**
		 * Returns the smallest number greater than or equal to its numeric argument with specified precision.
		 * @param x A numeric expression.
		 * @param precision The number of digits to appear after the decimal point. Could be negative.
		 */
		ceilTo(x: number, precision: number): number;

		/**
		 * Returns the greatest number less than or equal to its numeric argument with specified precision.
		 * @param x A numeric expression.
		 * @param precision The number of digits to appear after the decimal point. Could be negative.
		 */
		floorTo(x: number, precision: number): number;
	}
}