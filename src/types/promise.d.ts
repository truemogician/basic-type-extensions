export { };

declare global {
	interface PromiseConstructor {
		/**
		 * Sleep for a period of time
		 * @param milliseconds Number of milliseconds to sleep
		 */
		sleep(milliseconds: number): Promise<void>;

		/**
		 * Wait until `predicate` returns true or `timeout` limit is exceeded
		 * @param interval Checking interval, unit: ms
		 * @param timeout Max waiting time, unit: ms
		 * @param args Arguments to be passed to `predicate`
		 */
		wait(predicate: (...args: any[]) => boolean, interval: number, timeout?: number, ...args: any[]): Promise<boolean>;

		/**
		 * Wait until `predicate` returns true or `timeout` limit is exceeded
		 * @param interval Checking interval, unit: ms
		 * @param timeout Max waiting time, unit: ms
		 * @param args Arguments to be passed to `predicate`
		 */
		wait(predicate: (...args: any[]) => Promise<boolean>, interval: number, timeout?: number, ...args: any[]): Promise<boolean>;
	}
}