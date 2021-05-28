import "../index";
const arrays = [
	[0, 1, 2, 3, 4],
	[1, 1, 3, 4, 6, 8],
	[0, 0, 1, 1, 1, 3, 9],
	[1, 1, 3, 7],
];
describe("ArrayConstructor", () => {
	let arr0 = new Array<number>(), arr1 = new Array<number>();
	Object.assign(arr0, arrays[0]).shuffle();
	Object.assign(arr1, arrays[1]).shuffle();
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
			const arr = Object.clone(arrays[0]);
			expect(arr.insert(3)).toBe(3);
			expect(arr).toStrictEqual([0, 1, 2, 3, 3, 4]);
		});
		test("border", () => {
			const arr = Object.clone(arrays[0]);
			expect(arr.insert(10)).toBe(5);
			expect(arr).toStrictEqual([0, 1, 2, 3, 4, 10]);
			expect(arr.insert(-1)).toBe(0);
			expect(arr).toStrictEqual([-1, 0, 1, 2, 3, 4, 10]);
		});
		test("empty array", () => {
			const arr = [];
			expect(arr.insert(10)).toBe(0);
			expect(arr).toStrictEqual([10]);
		});
	});
	describe("insertAt", () => {
		test("normal", () => {
			const arr = Object.clone(arrays[0]);
			expect(arr.insertAt(-1, 3)).toBe(true);
			expect(arr).toStrictEqual([0, 1, 2, -1, 3, 4]);
		});
		test("out of range", () => {
			const arr = Object.clone(arrays[0]);
			expect(arr.insertAt(-1, 10)).toBe(false);
			expect(arr).toStrictEqual(arrays[0]);
		});
	});
	describe("remove", () => {
		test("normal", () => {
			const arr = Object.clone(arrays[2]);
			expect(arr.remove(1)).toBe(3);
			expect(arr).toStrictEqual([0, 0, 3, 9]);
		});
		test("none", () => {
			const arr = Object.clone(arrays[2]);
			expect(arr.remove(10)).toBe(0);
			expect(arr).toStrictEqual(arrays[2]);
		});
	});
	describe("removeAt", () => {
		test("normal", () => {
			const arr = Object.clone(arrays[0]);
			expect(arr.removeAt(2)).toBe(true);
			expect(arr).toStrictEqual([0, 1, 3, 4]);
		});
		test("out of range", () => {
			const arr = Object.clone(arrays[0]);
			expect(arr.removeAt(10)).toBe(false);
			expect(arr).toStrictEqual(arrays[0]);
		});
	});
	describe("sum & sumAsync", () => {
		test("default", () => expect([true, 2, "3"].sum()).toBe(6));
		test("other", () => expect(() => { [[0], { key: "value" }].sum() }).toThrow());
		test("map", () => expect(arrays[2].sum(num => num == 1 ? 1 : 0)).toBe(3));
		test("async", () => {
			const duration = 500;
			const start = Date.now();
			arrays[0].sumAsync(num => new Promise(resolve =>
				setTimeout(() => resolve(num), duration)
			)).then(result => {
				expect(result).toBe(10);
				expect(Math.abs(Date.now() - start - duration)).toBeLessThan(25);
			})
		});
	});
	describe("product & productAsync", () => {
		test("default", () => expect([true, 3, "5"].product()).toBe(15));
		test("other", () => expect(() => { [[0], { key: "value" }].product() }).toThrow());
		test("map", () => expect(arrays[2].product(num => num == 1 ? 2 : 1)).toBe(8));
		test("async", async () => {
			const duration = 500;
			const start = Date.now();
			await arrays[0].slice(1).productAsync(num => new Promise(resolve =>
				setTimeout(() => resolve(num), duration)
			)).then(result => {
				expect(result).toBe(24);
				expect(Math.abs(Date.now() - start - duration)).toBeLessThan(25);
			})
		});
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
	describe("keySort", () => {
		test("default", () => expect([1, 11, false, 2, 8, 3].keySort()).toEqual([false, 1, 2, 3, 8, 11]));
		test("keys", () => expect(arrays[1].keySort(num => num & 1, num => num)).toEqual([4, 6, 8, 1, 1, 3]));
	});
	test("shuffle", () => {
		let temp = new Array<number>();
		Object.assign(temp, arrays[0]).shuffle();
		expect(temp.length).toBe(arrays[0].length);
		expect(temp).not.toEqual(arrays[0]);
		temp.forEach(num => expect(arrays[0].includes(num)).toBeTruthy());
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
			expect(arrays[0].isAscending()).toBeTruthy();
			expect(arrays[0].reverse().isDescending()).toBeTruthy();
			expect([1, 9, 2, 6].isAscending()).toBeFalsy();
			expect([1, 9, 2, 6].isDescending()).toBeFalsy();
		});
		test("constant", () => {
			const array = [1, 1, 1, 1, 1, 1];
			expect(array.isAscending()).toBeTruthy();
			expect(array.isDescending()).toBeTruthy();
		});
		test("keys", () => {
			const array = [0, 2, 4, 1, 7, 9];
			expect(array.isAscending(num => num & 1, num => num)).toBeTruthy();
			expect(array.isDescending(num => 1 - (num & 1), num => -num)).toBeTruthy();
		})
	});
	test("forEachAsync", async () => {
		const start = Date.now();
		await [100, 200, 600, 300].forEachAsync(num => Promise.sleep(num));
		expect(Math.abs(Date.now() - start - 600)).toBeLessThan(10);
	});
});