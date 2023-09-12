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

describe("approximation", () => {
	const number = 1234.5678;
	test("roundTo", () => {
		expect(Math.roundTo(number, 2)).toBeCloseTo(1234.57);
		expect(Math.roundTo(number, 1)).toBeCloseTo(1234.6);
		expect(Math.roundTo(number, 0)).toBeCloseTo(1235);
		expect(Math.roundTo(number, -1)).toBeCloseTo(1230);
		expect(Math.roundTo(number, -2)).toBeCloseTo(1200);
	});

	test("ceilTo", () => {
		expect(Math.ceilTo(number, 2)).toBeCloseTo(1234.57);
		expect(Math.ceilTo(number, 1)).toBeCloseTo(1234.6);
		expect(Math.ceilTo(number, 0)).toBeCloseTo(1235);
		expect(Math.ceilTo(number, -1)).toBeCloseTo(1240);
		expect(Math.ceilTo(number, -2)).toBeCloseTo(1300);
	});

	test("floorTo", () => {
		expect(Math.floorTo(number, 2)).toBeCloseTo(1234.56);
		expect(Math.floorTo(number, 1)).toBeCloseTo(1234.5);
		expect(Math.floorTo(number, 0)).toBeCloseTo(1234);
		expect(Math.floorTo(number, -1)).toBeCloseTo(1230);
		expect(Math.floorTo(number, -2)).toBeCloseTo(1200);
	})
})