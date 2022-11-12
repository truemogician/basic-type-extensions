import "../src"

test("randomInteger", () => {
	for (let i = 0; i < 10; ++i) {
		let rand = Math.randomInteger(10);
		expect(rand).toBeGreaterThanOrEqual(0);
		expect(rand).toBeLessThan(10);
		rand = Math.randomInteger(5, 10);
		expect(rand).toBeGreaterThanOrEqual(5);
		expect(rand).toBeLessThan(10);
	}
	expect(Math.randomInteger(2, 3)).toBe(2);
});

test("randomFloat", () => {
	for (let i = 0; i < 10; ++i) {
		let rand = Math.randomFloat(2);
		expect(rand).toBeGreaterThanOrEqual(0);
		expect(rand).toBeLessThanOrEqual(2);
		rand = Math.randomFloat(0.5, 2);
		expect(rand).toBeGreaterThanOrEqual(0.5);
		expect(rand).toBeLessThanOrEqual(2);
	}
});