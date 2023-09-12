Math.randomInteger = function (param1: number, param2?: number): number {
	const min = Math.ceil(param2 === undefined ? 0 : param1);
	const max = Math.floor(param2 === undefined ? param1 : param2);
	return min + Math.floor((max - min) * Math.random());
}

Math.randomFloat = function (param1: number, param2?: number): number {
	const min = param2 === undefined ? 0 : param1;
	const max = param2 === undefined ? param1 : param2;
	return min + (max - min) * Math.random();
}

Math.roundTo = function (x: number, precision: number): number {
	const factor = Math.pow(10, precision);
	return Math.round(x * factor) / factor;
}

Math.ceilTo = function (x: number, precision: number): number {
	const factor = Math.pow(10, precision);
	return Math.ceil(x * factor) / factor;
}

Math.floorTo = function (x: number, precision: number): number {
	const factor = Math.pow(10, precision);
	return Math.floor(x * factor) / factor;
}