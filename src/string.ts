import "./types/string";

String.empty = "";

String.isNullOrEmpty = function (value: string | null | undefined): boolean {
	return value == null || value == "";
}

String.isNullOrWhiteSpace = function (value: string | null | undefined): boolean {
	return value == null || /^\s*$/.test(value);
}

String.prototype.remove = function (this: string, from: number, length?: number): string {
	if (length && length <= 0)
		return this;
	else if (length && from + length < this.length)
		return this.substring(0, from) + this.substring(from + length)
	else
		return this.substring(0, from);
}

String.prototype.splitAt = function (this: string, indices: number | number[], charAtIndex: "pred" | "succ" | "both" | "none" = "succ"): string[] {
	if (typeof indices == "number")
		indices = [indices];
	if (!indices.isAscending())
		indices.sortByKey();
	let start = 0, end = 1;
	for (let negative = indices[0] < 0; end < indices.length; negative = indices[end++] < 0) {
		if (negative)
			start = end;
		if (indices[end] > this.length)
			break;
	}
	indices = indices.slice(start, end);
	if (!indices.length)
		return [this];
	const result = new Array<string>();
	const pred = (charAtIndex == "pred" || charAtIndex == "both") ? 1 : 0;
	const succ = (charAtIndex == "succ" || charAtIndex == "both") ? 1 : 0;
	let sub = this.substring(0, indices[0] + pred);
	if (sub != "")
		result.push(sub);
	for (let i = 1; i < indices.length; ++i) {
		if (indices[i] == indices[i - 1])
			continue;
		start = indices[i - 1] + 1 - succ, end = indices[i] + pred;
		if (start < end)
			result.push(this.substring(start, end));
	}
	sub = this.substring(indices.last() + 1 - succ);
	if (sub != "")
		result.push(sub);
	return result;
}