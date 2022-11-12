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
