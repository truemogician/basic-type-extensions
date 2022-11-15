import { CleanOption } from "../src"

let obj1 = {
	key1: true,
	key2: 1,
	key3: "a"
};
let obj2 = {
	key2: 2,
	key3: "b",
	key4: []
};
let obj3 = {
	key1: false,
	key2: 3,
	key5: {}
};

const tuple = <T extends any[]>(...args: T): T => args;

test("isEmpty & hasProperties", () => {
	expect(Object.isEmpty([])).toBeFalsy();
	expect(Object.hasProperties([])).toBeTruthy();
	expect(Object.isEmpty({})).toBeTruthy();
	expect(Object.hasProperties({})).toBeFalsy();
	expect(Object.isEmpty(["a"])).toBeFalsy();
	expect(Object.hasProperties(["a"])).toBeTruthy();
	const symbolObj = {};
	Object.defineProperty(symbolObj, Symbol(), { value: 1, enumerable: false });
	expect(Object.isEmpty(symbolObj)).toBeFalsy();
	expect(Object.hasProperties(symbolObj)).toBeTruthy();
});

test("isEnumerablyEmpty & hasEnumerableProperties", () => {
	expect(Object.isEnumerablyEmpty([])).toBeTruthy();
	expect(Object.hasEnumerableProperties([])).toBeFalsy();
	expect(Object.isEnumerablyEmpty({})).toBeTruthy();
	expect(Object.hasEnumerableProperties({})).toBeFalsy();
	expect(Object.isEnumerablyEmpty(["a"])).toBeFalsy();
	expect(Object.hasEnumerableProperties(["a"])).toBeTruthy();
	const symbolObj = {};
	const sym = Symbol();
	Object.defineProperty(symbolObj, sym, { value: 1, enumerable: false, configurable: true });
	expect(Object.isEnumerablyEmpty(symbolObj)).toBeTruthy();
	expect(Object.hasEnumerableProperties(symbolObj)).toBeFalsy();
	Object.defineProperty(symbolObj, sym, { enumerable: true });
	expect(Object.isEnumerablyEmpty(symbolObj)).toBeFalsy();
	expect(Object.hasEnumerableProperties(symbolObj)).toBeTruthy();
})

test("isNullOrUndefined", () => {
	let obj!: object;
	expect(Object.isNullOrUndefined(obj)).toBeTruthy();
	expect(Object.isNullOrUndefined({})).toBeFalsy();
	expect(Object.isNullOrUndefined(null)).toBeTruthy();
});

test("isPrimitive", () => {
	expect(Object.isPrimitive(123)).toBeTruthy();
	expect(Object.isPrimitive(false)).toBeTruthy();
	expect(Object.isPrimitive("str")).toBeTruthy();
	expect(Object.isPrimitive({})).toBeFalsy();
	expect(Object.isPrimitive(null)).toBeTruthy();
	expect(Object.isPrimitive(() => { })).toBeFalsy();
});

describe("innerAssign", () => {
	test("default", () => {
		const temp = {};
		Object.assign(temp, obj1);
		expect(Object.innerAssign(temp, obj2)).toEqual({
			key1: true,
			key2: 2,
			key3: "b"
		});
		Object.assign(temp, obj1);
		expect(Object.innerAssign(temp, obj2, obj3)).toEqual({
			key1: false,
			key2: 3,
			key3: "b"
		});
	});

	class Src {
		key1 = true;
		get key2() { return 2; }
		key3 = [3]
	}
	class Dst {
		key1 = false;
		key2 = 4;
		__key3: number[] = [6];
		set key3(value: number[]) { this.__key3 = value; }
	}
	const src = new Src();

	test("getter", () => {
		const target = new Dst();
		Object.innerAssignWithGetter(target, src);
		expect(target.key1).toEqual(true);
		expect(target.key2).toEqual(2);
		expect(target.__key3).toEqual([6]);
	});

	test("setter", () => {
		const target = new Dst();
		Object.innerAssignWithSetter(target, src);
		expect(target.key1).toEqual(true);
		expect(target.key2).toEqual(4);
		expect(target.__key3).toEqual([3]);
	});

	test("getter & setter", () => {
		const target = new Dst();
		Object.innerAssignWithAccessor(target, src);
		expect(target.key1).toEqual(true);
		expect(target.key2).toEqual(2);
		expect(target.__key3).toEqual([3]);
	});
});

describe("rightAssign", () => {
	test("default", () => {
		const temp = {
			key1: false,
			key4: "4"
		};
		expect(Object.rightAssign(temp, obj1)).toEqual({
			key1: true,
			key2: 1,
			key3: "a",
			key4: "4"
		});
	});

	test("nested", () => {
		const target = {
			key1: true,
			key2: {
				key3: 3,
				key4: "4"
			}
		}
		const source = {
			key2: {
				key3: 33,
				key5: [5]
			},
			key6: {}
		};
		expect(Object.rightAssign(target, source, { nested: true })).toEqual({
			key1: true,
			key2: {
				key3: 33,
				key4: "4",
				key5: [5]
			},
			key6: {}
		});
	});
});

describe("copy", () => {
	test("primitive", () => {
		expect(Object.copy(true)).toBe(true);
		expect(Object.copy("copy")).toBe("copy");
		expect(Object.copy(123)).toBe(123);
	});

	test("object", () => {
		const obj = tuple(false, "1", 2, [3], { 4: null as object | null });
		const result = Object.copy(obj);
		expect(result[3]).toBe(obj[3]);
		result[4][4] = {};
		expect(obj[4][4]).not.toBe(null);
	});

	test("function", () => {
		const func = function () { };
		const result = Object.copy(func);
		(result as any)["key"] = "value";
		expect((func as any)["key"]).toBe(undefined);
	})
})

describe("clone", () => {
	test("primitive", () => {
		expect(Object.clone(true)).toBe(true);
		expect(Object.clone("copy")).toBe("copy");
		expect(Object.clone(123)).toBe(123);
	});

	test("object", () => expect(Object.clone(obj1)).toEqual(obj1));

	test("nested", () => {
		const obj = {
			0: true,
			1: {
				2: "2",
				3: () => 3,
				4: [false, 1, "2", { key: 3 }]
			}
		}
		const replica = Object.clone(obj);
		replica[0] = false;
		expect(obj[0]).toBe(true);
		replica[1][3] = () => 4;
		expect(obj[1][3]()).toBe(3);
		replica[1][4].splice(2);
		expect(obj[1][4].length).toBe(4);
	});

	test("symbol", () => {
		const symbol = Symbol(0);
		const obj = {
			0: 0,
			key: "value",
			[symbol]: true
		};
		const replica = Object.clone(obj);
		expect(replica[symbol]).toBe(true);
	});
});

describe("clean", () => {
	test("simple", () => {
		const obj = {
			key1: 1,
			key2: null,
			key3: undefined,
			key4: true
		};
		Object.clean(obj);
		expect(obj).toEqual({
			key1: 1,
			key4: true
		});
	});

	test("nested", () => {
		const obj = {
			key1: 1,
			key2: null,
			key3: {
				key1: null,
				key2: true,
				key3: {
					key1: undefined,
					key2: null,
					key3: null
				}
			}
		}
		Object.clean(obj);
		expect(obj).toEqual({
			key1: 1,
			key3: {
				key2: true,
				key3: {}
			}
		});
	});

	test("empty object & empty string", () => {
		const obj = {
			key1: 1,
			key2: null,
			key3: {
				key1: "",
				key2: undefined,
				key3: {
					key1: undefined,
					key2: "",
					key3: null
				}
			}
		};
		Object.clean(obj, CleanOption.All);
		expect(obj).toEqual({ key1: 1 });
	});

	test("predicate function", () => {
		const obj = {
			key1: 2,
			key2: "foo",
			key3: () => { },
			key4: {
				key1: false
			}
		};
		expect(Object.clean(
			obj,
			(key, value) => key == "key1" || typeof value == "function")
		).toEqual({
			key2: "foo",
			key4: {}
		});
	});

	test("mutual reference", () => {
		const foo = {
			name: "foo",
			undefined: undefined,
			bar: null as any
		};
		const bar = {
			name: "bar",
			foo: foo,
			null: null
		};
		foo.bar = bar;
		Object.clean(foo);
		expect(foo.bar).toBe(bar);
		expect(Object.keys(foo)).toEqual(["name", "bar"]);
		expect(Object.keys(bar)).toEqual(["name", "foo"]);
	});
});

describe("remove", () => {
	test("varargs", () => {
		const obj = {
			a: 1,
			b: "2",
			c: true
		};
		const result = Object.delete(obj, "a", "c");
		expect(Object.keys(result)).toEqual(["b"]);
	});

	test("array", () => {
		const obj = {
			a: 1,
			b: "2",
			c: true
		};
		const result = Object.delete(obj, ["a", "b"]);
		expect(Object.keys(result)).toEqual(["c"]);
	});
});