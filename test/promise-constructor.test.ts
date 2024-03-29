import "../src"

test("sleep", async () => {
	const start = Date.now();
	const duration = 1000;
	await Promise.sleep(duration);
	expect(Math.abs(Date.now() - start - duration)).toBeLessThan(50);
});

describe("wait", () => {
	const duration = 500;

	test("default", async () => {
		let flag = false;
		const start = Date.now();
		Promise.sleep(duration).then(() => flag = true);
		await Promise.wait(() => flag, 100).then(result => {
			expect(flag).toBeTruthy();
			expect(result).toBeTruthy();
			expect(Date.now() - start).toBeGreaterThan(duration);
		});
	});

	test("async", async () => {
		let flag = false;
		const start = Date.now();
		Promise.sleep(duration).then(() => flag = true);
		await Promise.wait(() => Promise.sleep(50).then(() => flag), 100).then(result => {
			expect(flag).toBeTruthy();
			expect(result).toBeTruthy();
			expect(Date.now() - start).toBeGreaterThan(duration);
		});
	});

	test("timeout", async () => {
		let flag = false;
		Promise.sleep(duration).then(() => flag = true);
		await Promise.wait(() => flag, 100, 200).then(result => {
			expect(flag).toBeFalsy();
			expect(result).toBeFalsy();
		});
		Promise.sleep(duration).then(() => flag = false);
		const start = Date.now();
		await Promise.wait(() => Promise.sleep(duration + 200).then(() => flag), 100, duration + 100).then(result => {
			expect(flag).toBeFalsy();
			expect(Date.now() - start).toBeLessThan(duration + 200);
		});
	});

	test("arguments", async () => {
		let flag = false;
		const start = Date.now();
		await Promise.wait((getTime: () => number) => getTime() - start > duration, 100, 0, Date.now)
			.then(result => {
				expect(result).toBeTruthy();
				expect(Date.now() - start).toBeGreaterThan(duration);
			})
	});
});