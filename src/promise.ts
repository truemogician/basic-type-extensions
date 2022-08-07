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

Promise.sleep = async function (milliseconds: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

Promise.wait = async function (predicate: (...args: any[]) => boolean | Promise<boolean>, interval: number, timeout: number = 0, ...args: any[]): Promise<boolean> {
	return new Promise<boolean>(async resolve => {
		let result = predicate(...args);
		if (typeof result == "boolean" && result)
			return resolve(true);
		if (typeof result != "boolean") {
			if (timeout == 0 && await result)
				return resolve(true);
			else if (timeout > 0) {
				const res = await Promise.race([result, Promise.sleep(timeout)]);
				if (typeof res != "boolean")
					return resolve(false);
				else if (res === true)
					return resolve(true);
			}
		}
		let count = 0;
		let lastFinished = true;
		const timer = setInterval(
			async function () {
				++count;
				if (timeout > 0 && count * interval > timeout) {
					clearInterval(timer);
					return resolve(false);
				}
				else if (lastFinished) {
					result = predicate(...args);
					if (typeof result == "boolean" && result) {
						clearInterval(timer);
						return resolve(true);
					}
					if (typeof result != "boolean") {
						lastFinished = false;
						if (timeout == 0 && await result) {
							clearInterval(timer);
							return resolve(true);
						}
						else if (timeout > 0) {
							const res = await Promise.race([result, Promise.sleep(timeout - count * interval)]);
							if (typeof res != "boolean" || res === true) {
								clearInterval(timer);
								return resolve(res === true);
							}
						}
						lastFinished = true;
					}
				}
			},
			interval,
			...args
		);
	});
}
