import "../src"

describe("StringConstructor", () => {
	test("empty", () => expect(String.isNullOrEmpty(String.empty)).toBeTruthy());
	test("null", () => expect(String.isNullOrEmpty(null)).toBeTruthy());
	test("whitespace", () => expect(String.isNullOrWhiteSpace("\t\n  \r")).toBeTruthy());
});
describe("String", () => {
	const str = "0123456789";
	describe("remove", () => {
		test("default", () => expect(str.remove(5)).toEqual("01234"));
		test("normal", () => expect(str.remove(1, 8)).toEqual("09"));
		test("negative", () => {
			expect(str.remove(-1)).toEqual("");
			expect(str.remove(1, -1)).toEqual(str);
		});
		test("overflow", () => {
			expect(str.remove(11)).toEqual(str);
			expect(str.remove(2, 10)).toEqual("01");
		})
	});
	describe("splitAt", () => {
		test("single", () => expect(str.splitAt(4)).toEqual(["0123", "456789"]));
		test("normal", () => {
			const indices = [2, 4];
			expect(str.splitAt(indices, "pred")).toEqual(["012", "34", "56789"]);
			expect(str.splitAt(indices, "succ")).toEqual(["01", "23", "456789"]);
			expect(str.splitAt(indices, "both")).toEqual(["012", "234", "456789"]);
			expect(str.splitAt(indices, "none")).toEqual(["01", "3", "56789"]);
		});
		test("messy", () => {
			const indices = [2, -2, 2, 4, 20, 0, 2, 9];
			expect(str.splitAt(indices, "pred")).toEqual(["0", "12", "34", "56789"]);
			expect(str.splitAt(indices, "succ")).toEqual(["01", "23", "45678", "9"]);
			expect(str.splitAt(indices, "both")).toEqual(["0", "012", "234", "456789", "9"]);
			expect(str.splitAt(indices, "none")).toEqual(["1", "3", "5678"]);
		});
	});
});