import "../src";

const arrays: readonly (readonly number[])[] = [
	[0, 1, 2, 3, 4],
	[1, 1, 3, 4, 6, 8],
	[0, 0, 1, 1, 1, 3, 9],
	[1, 1, 3, 7],
];

describe("ArrayConstructor", () => {
	const arr0 = [0, 1, 2, 3, 4].shuffle();
	const arr1 = [1, 1, 3, 4, 6, 8].shuffle();

	describe("intersection", () => {
		test("two", () => expect(Array.intersection(arr0, arr1)).toEqual([1, 3, 4]));

		test("multiple", () => expect(Array.intersection(...arrays.slice(1))).toEqual([1, 1, 3]));

		test("one and empty", () => {
			expect(Array.intersection()).toBeNull();
			expect(Array.intersection(arrays[0])).toEqual(arrays[0]);
		});
	});

	describe("union", () => {
		test("two", () => expect(Array.union(arr0, arr1)).toEqual([0, 1, 1, 2, 3, 4, 6, 8]));

		test("multiple", () => expect(Array.union(...arrays)).toEqual([0, 0, 1, 1, 1, 2, 3, 4, 6, 7, 8, 9]));

		test("one and empty", () => {
			expect(Array.union()).toBeNull();
			expect(Array.union(arrays[0])).toEqual(arrays[0]);
		});
	});

	describe("complement", () => {
		test("normal", () => expect(Array.complement([1, 9, 2, 6], [1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([3, 4, 5, 7, 8]));

		test("duplicate", () => expect(Array.complement([1, 0, 0, 0, 1], [0, 1, 0, 1, 0, 1])).toEqual([1]));

		test("same", () => expect(Array.complement(arr0, arr0)).toEqual([]));

		test("empty", () => {
			expect(Array.complement([], arr0)).toEqual(arr0);
			expect(Array.complement(arr0, [])).toEqual(null);
		});

		test("wrong", () => expect(Array.complement([3, 1, 2], [3, 2, 0])).toBe(null));
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
});
describe("Array<T>", () => {
	describe("last", () => {
		test("default", () => expect(arrays[0].last()).toBe(4));

		test("regular", () => expect(arrays[0].last(3)).toBe(1));

		test("negative", () => expect(arrays[0].last(-1)).toBeUndefined());

		test("overflow", () => expect(arrays[0].last(100)).toBeUndefined());
	});

	describe("insert", () => {
		test("normal", () => {
			const arr = [0, 1, 2, 3, 4];
			expect(arr.insert(3)).toBe(3);
			expect(arr).toStrictEqual([0, 1, 2, 3, 3, 4]);
		});

		test("border", () => {
			const arr = [0, 1, 2, 3, 4];
			expect(arr.insert(10)).toBe(5);
			expect(arr).toStrictEqual([0, 1, 2, 3, 4, 10]);
			expect(arr.insert(-1)).toBe(0);
			expect(arr).toStrictEqual([-1, 0, 1, 2, 3, 4, 10]);
		});

		test("empty array", () => {
			const arr = new Array<number>();
			expect(arr.insert(10)).toBe(0);
			expect(arr).toStrictEqual([10]);
		});
	});

	describe("insertAt", () => {
		test("normal", () => {
			const arr = [0, 1, 2, 3, 4];
			expect(arr.insertAt(-1, 3)).toBe(true);
			expect(arr).toStrictEqual([0, 1, 2, -1, 3, 4]);
		});

		test("out of range", () => {
			const arr = [0, 1, 2, 3, 4];
			expect(arr.insertAt(-1, 10)).toBe(false);
			expect(arr).toStrictEqual(arrays[0]);
		});
	});

	describe("remove", () => {
		test("single", () => {
			const arr = [0, 0, 1, 1, 1, 3, 9];
			expect(arr.remove(1)).toBe(3);
			expect(arr).toStrictEqual([0, 0, 3, 9]);
		});

		test("multiple", () => {
			const arr = [0, 0, 1, 1, 1, 3, 9];
			expect(arr.remove(0, 1)).toBe(5);
			expect(arr).toStrictEqual([3, 9]);
		});

		test("none", () => {
			const arr = [0, 0, 1, 1, 1, 3, 9];
			expect(arr.remove(10)).toBe(0);
			expect(arr).toStrictEqual(arrays[2]);
		});
	});

	describe("removeAt", () => {
		test("single", () => {
			const arr = [0, 1, 2, 3, 4];
			expect(arr.removeAt(2)).toBe(true);
			expect(arr).toStrictEqual([0, 1, 3, 4]);
		});

		test("multiple", () => {
			const arr = [0, 1, 2, 3, 4];
			expect(arr.removeAt(0, 2, 3)).toBe(true);
			expect(arr).toStrictEqual([1, 4]);
		});

		test("out of range", () => {
			const arr = [0, 1, 2, 3, 4];
			expect(arr.removeAt(10)).toBe(false);
			expect(arr).toStrictEqual(arrays[0]);
		});
	});

	describe("sum", () => {
		test("default", () => expect([true, 2, "3"].sum()).toBe(6));

		test("other", () => expect(() => { [[0], { key: "value" }].sum() }).toThrow());

		test("map", () => { expect(arrays[2].sum(num => num == 1 ? 1 : 0)).toBe(3) });
	});

	describe("product", () => {
		test("default", () => expect([true, 3, "5"].product()).toBe(15));

		test("other", () => expect(() => { [[0], { key: "value" }].product() }).toThrow());

		test("map", () => expect(arrays[2].product(num => num == 1 ? 2 : 1)).toBe(8));
	});

	describe("minimum & maximum", () => {
		test("default", () => {
			const array = [true, 5, 2, false];
			expect(array.minimum()).toBe(false);
			expect(array.maximum()).toBe(5);
		});

		test("keys", () => {
			expect(arrays[1].minimum(num => num & 1, num => -num)).toBe(8);
			expect(arrays[1].maximum(num => num & 1, num => -num)).toBe(1);
		});

		test("undefined", () => {
			expect([].minimum()).toBeUndefined();
			expect([].maximum()).toBeUndefined();
		})
	});

	test("groupBy", () => {
		const arr: Array<[number, number]> = [
			[1, 2],
			[1, 3],
			[1, 6],
			[2, 4],
			[3, 6],
			[3, 0]
		];
		const groups = arr.groupBy(x => x[0]);
		expect(groups.size).toBe(3);
		expect(groups.get(1)).toEqual([[1, 2], [1, 3], [1, 6]]);
		expect(groups.get(2)).toEqual([[2, 4]]);
		expect(groups.get(3)).toEqual([[3, 6], [3, 0]]);
	});

	describe("sortByKey", () => {
		test("default", () => expect([1, 11, false, 2, 8, 3].sortByKey()).toEqual([false, 1, 2, 3, 8, 11]));

		test("keys", () => {
			const arr = [1, 1, 3, 4, 6, 8];
			expect(arr.sortByKey(num => num & 1, num => num)).toEqual([4, 6, 8, 1, 1, 3])
		});
	});

	test("shuffle", () => {
		const arr = [0, 1, 2, 3, 4];
		arr.shuffle();
		expect(arr.length).toBe(arrays[0].length);
		expect(arr).not.toEqual(arrays[0]);
		arr.forEach(num => expect(arrays[0].includes(num)).toBeTruthy());
	});

	describe("repeat", () => {
		const arr = [1, 2];

		test("default", () => expect(arr.repeat()).toEqual([1, 2]));

		test("normal", () => expect(arr.repeat(3)).toEqual([1, 2, 1, 2, 1, 2]));

		test("zero and negative", () => {
			expect(arr.repeat(0)).toEqual([]);
			expect(arr.repeat(-2)).toBeNull();
		});
	});

	describe("intersects", () => {
		test("normal", () => {
			const arr1 = [1, 9, 2, 6];
			const arr2 = [0, 8, 1, 7];
			expect(arr1.intersects(arr2)).toBeTruthy();
			expect(arr1.slice(1).intersects(arr2)).toBeFalsy();
		});

		test("empty", () => {
			expect(arrays[0].intersects([])).toBeFalsy();
			expect([].intersects([])).toBeFalsy();
		})
	});

	describe("isAscending & isDescending", () => {
		test("normal", () => {
			const arr = [0, 1, 2, 3, 4];
			const arr2 = [1, 9, 2, 6];
			expect(arr.isAscending()).toBeTruthy();
			expect(arr.reverse().isDescending()).toBeTruthy();
			expect(arr2.isAscending()).toBeFalsy();
			expect(arr2.isDescending()).toBeFalsy();
		});

		test("constant", () => {
			const arr = [1, 1, 1, 1];
			expect(arr.isAscending()).toBeTruthy();
			expect(arr.isDescending()).toBeTruthy();
		});

		test("keys", () => {
			const arr = [0, 2, 4, 1, 7, 9];
			expect(arr.isAscending(num => num & 1, num => num)).toBeTruthy();
			expect(arr.isDescending(num => 1 - (num & 1), num => -num)).toBeTruthy();
		})
	});

	describe("forEachAsync", () => {
		test("normal", async () => {
			const start = Date.now();
			await [100, 200, 600, 300].forEachAsync(num => Promise.sleep(num));
			expect(Math.abs(Date.now() - start - 600)).toBeLessThan(10);
		});
		test("empty", async () => {
			const arr = new Array<number>();
			await arr.forEachAsync(x => Promise.sleep(x));
		});
		test("max concurrency", async () => {
			const arr = [200, 300, 800, 600];
			const start = Date.now();
			await arr.forEachAsync(Promise.sleep, null, { maxConcurrency: 2 });
			expect(Math.abs(Date.now() - start - 1000)).toBeLessThan(50);
		});
		test("sequential", async () => {
			const arr = [100, 400, 200, 300];
			const start = Date.now();
			await arr.forEachAsync(Promise.sleep, null, { maxConcurrency: 1 });
			expect(Math.abs(Date.now() - start - 1000)).toBeLessThan(50);
		});
	});

	describe("mapAsync", () => {
		test("normal", async () => {
			const actual = await [0, 1, 2, 3, 4].mapAsync(i => Promise.sleep(100).then(() => i << 1));
			expect(actual).toEqual([0, 2, 4, 6, 8]);
		});
	});

	describe("binarySearch", () => {
		const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const arr2 = [0, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5];
		const arr3 = [6, 5, 5, 4, 2, 2, 2, 1, 0];
		test("normal", () => {
			expect(arr.binarySearch(5)).toBe(5);
			expect(arr2.binarySearch(3)).toBe(5);
		});

		test("bound", () => {
			expect(arr2.binarySearch(2, "lower")).toBe(2);
			expect(arr2.binarySearch(2, "upper")).toBe(5);
			expect(arr2.binarySearch(6, "upper")).toBe(12);
		});

		test("endpoint", () => {
			expect(arr.binarySearch(-1, "lower")).toBe(0);
			expect(arr.binarySearch(-1, "upper")).toBe(0);
			expect(arr.binarySearch(10, "lower")).toBe(10);
			expect(arr.binarySearch(10, "upper")).toBe(10);
		});

		test("descending", () => {
			expect(arr3.binarySearch(2, "lower")).toBe(4);
			expect(arr3.binarySearch(2, "upper")).toBe(7);
		});

		test("empty array", () => {
			expect(new Array<number>().binarySearch(0)).toBe(-1);
		});
	});

	describe("ternarySearch", () => {
		const arr = [0, 1, 2, 3, 4, 3, 2, 1, 0];
		const arr2 = [0, 2, 2, 3, 5, 5, 5, 2, 1];
		const arr3 = [5, 4, 3, 1, 1, 1, 2, 6];
		test("normal", () => {
			expect(arr.ternarySearch()).toBe(4);
			expect(arr2.ternarySearch()).toBe(4);
		});

		test("bound", () => {
			expect(arr2.ternarySearch("lower")).toBe(4);
			expect(arr2.ternarySearch("upper")).toBe(6);
		});

		test("minimum", () => {
			expect(arr3.ternarySearch("lower")).toBe(3);
			expect(arr3.ternarySearch("upper")).toBe(5);
		});

		test("empty array", () => {
			expect(new Array<number>().ternarySearch()).toBe(-1);
		});
	});
});