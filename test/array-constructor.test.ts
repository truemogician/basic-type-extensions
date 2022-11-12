import "../src";

const arrays: readonly (readonly number[])[] = [
	[0, 1, 2, 3, 4],
	[1, 1, 3, 4, 6, 8],
	[0, 0, 1, 1, 1, 3, 9],
	[1, 1, 3, 7],
];

const arr0 = [0, 1, 2, 3, 4].shuffle();
const arr1 = [1, 1, 3, 4, 6, 8].shuffle();

describe("intersection", () => {
	test("two", () => expect(Array.intersection(arr0, arr1)).toEqual([1, 3, 4]));

	test("multiple", () => expect(Array.intersection(...arrays.slice(1))).toEqual([1, 1, 3]));

	test("one and empty", () => {
		expect(Array.intersection).toThrow();
		expect(Array.intersection(arrays[0])).toEqual(arrays[0]);
	});
});

describe("union", () => {
	test("two", () => expect(Array.union(arr0, arr1)).toEqual([0, 1, 1, 2, 3, 4, 6, 8]));

	test("multiple", () => expect(Array.union(...arrays)).toEqual([0, 0, 1, 1, 1, 2, 3, 4, 6, 7, 8, 9]));

	test("one and empty", () => {
		expect(Array.union).toThrow();
		expect(Array.union(arrays[0])).toEqual(arrays[0]);
	});
});

describe("complement", () => {
	test("normal", () => expect(Array.complement([1, 9, 2, 6], [1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([3, 4, 5, 7, 8]));

	test("duplicate", () => expect(Array.complement([1, 0, 0, 0, 1], [0, 1, 0, 1, 0, 1])).toEqual([1]));

	test("same", () => expect(Array.complement(arr0, arr0)).toEqual([]));

	test("empty", () => expect(Array.complement([], arr0)).toEqual(arr0));

	test("error", () => {
		expect(() => Array.complement(arr0, [])).toThrow();
		expect(() => Array.complement([3, 1, 2], [3, 2, 0])).toThrow()
	});
});

describe("difference", () => {
	test("normal", () => expect(Array.difference([1, 9, 2, 6], [1, 9, 8, 9])).toEqual([2, 6]));

	test("duplicate", () => expect(Array.difference([1, 0, 0, 0, 1], [0, 1, 1, 1])).toEqual([0, 0]));

	test("same", () => expect(Array.difference(arr0, arr0)).toEqual([]));

	test("empty", () => {
		expect(Array.difference([], arr0)).toEqual([]);
		expect(Array.difference(arr0, [])).toEqual(arr0);
	});
});

describe("range", () => {
	test("default", () => expect(Array.range(1, 5)).toStrictEqual([1, 2, 3, 4, 5]));

	test("step", () => expect(Array.range(1, 10, 3)).toStrictEqual([1, 4, 7, 10]));

	test("filter", () => expect(Array.range(0, 4, item => (item & 1) == 0)).toStrictEqual([0, 2, 4]));

	test("step filter", () => expect(Array.range(0, 15, 2, item => item % 3 == 0)).toStrictEqual([0, 6, 12]));
});