import { CleanOption } from "../index"
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
test("isEmpty", () => {
	expect(Object.isEmpty([])).toBeTruthy();
	expect(Object.isEmpty({})).toBeTruthy();
	expect(Object.isEmpty(["a"])).toBeFalsy();
	expect(Object.isEmpty(123)).toBeTruthy();
});
test("isNullOrUndefined", () => {
	let obj!: object;
	expect(Object.isNullOrUndefined(obj)).toBeTruthy();
	expect(Object.isNullOrUndefined({})).toBeFalsy();
	expect(Object.isNullOrUndefined(null)).toBeTruthy();
});
test("isNullOrEmpty", () => {
	let obj!: object;
	expect(Object.isNullOrEmpty(obj)).toBeTruthy();
	expect(Object.isNullOrEmpty({})).toBeTruthy();
	expect(Object.isNullOrEmpty(null)).toBeTruthy();
});
test("isPrimitive", () => {
	expect(Object.isPrimitive(123)).toBeTruthy();
	expect(Object.isPrimitive(false)).toBeTruthy();
	expect(Object.isPrimitive("str")).toBeTruthy();
	expect(Object.isPrimitive({})).toBeFalsy();
	expect(Object.isPrimitive(null)).toBeTruthy();
	expect(Object.isPrimitive(() => { })).toBeFalsy();
});
test("innerAssign", () => {
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
describe("copy", () => {
	test("primitive", () => {
		expect(Object.copy(true)).toBe(true);
		expect(Object.copy("copy")).toBe("copy");
		expect(Object.copy(123)).toBe(123);
	});
	test("object", () => {
		const obj = [false, "1", 2, [3], { 4: null }];
		const result = Object.copy(obj);
		expect(result[3]).toBe(obj[3]);
		result[4]["4"] = {};
		expect(obj[4]["4"]).not.toBe(null);
	});
	test("function", () => {
		const func = function () { };
		const result = Object.copy(func);
		result["key"] = "value";
		expect(func["key"]).toBe(undefined);
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
		replica[1][3] = () => null;
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
		}
		Object.clean(obj, CleanOption.All);
		expect(obj).toEqual({
			key1: 1
		});
	});
});