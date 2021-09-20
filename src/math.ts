export { }
declare global {
	interface Math {
		/**
		 * Returns a random integer between `min` and `max`
		 * @param min Lower bound
		 * @param max Upper bound (not reachable)
		 */
		randomInteger(min: number, max: number): number;
		/**
		 * Returns a random integer between 0 and `max`
		 * @param max Upper bound (not reachable)
		 */
		randomInteger(max: number): number;
		/**
		 * Returns a random float number between `min` and `max`
		 * @param min Lower bound
		 * @param max Upper bound
		 */
		randomFloat(min: number, max: number): number;
		/**
		 * Returns a random float number between 0 and `max`
		 * @param max Upper bound
		 */
		randomFloat(max: number): number;
	}
}

Math.randomInteger = function (param1: number, param2?: number): number {
	const min = Math.ceil(param2 === undefined ? 0 : param1);
	const max = Math.floor(param2 === undefined ? param1 : param2);
	return min + Math.floor((max - min) * Math.random());
}
Math.randomFloat = function (param1: number, param2?: number): number {
	const min = param2 === undefined ? 0 : param1;
	const max = param2 === undefined ? param1 : param2;
	return min + (max - min) * Math.random();
}