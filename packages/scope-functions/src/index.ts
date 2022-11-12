export { }

declare global {
	interface Object {
		/**
		 * Apply an action on the current object and return the result of the action.
		 * @param this Current object.
		 * @param action Action to perform on the current object.
		 * @returns The result of the action.
		 */
		let<T, R = any>(this: T, action: (it: T) => R): R;

		/**
		 * Apply an action on the current object and return the result of the action.
		 * @param this Current object.
		 * @param action Action to perform on the current object, which is available as `this`.
		 * @returns The result of the action.
		 * @note To use `this` in the action, you must use the `function` keyword. Arrow functions do not have their own `this`.
		 */
		run<T, R = any>(this: T, action: (this: T) => R): R;

		/**
		 * Apply an action on the current object and return the current object itself.
		 * @param this Current object.
		 * @param action Action to perform on the current object.
		 * @returns The current object itself.
		 */
		also<T>(this: T, action: (it: T) => any): T;

		/**
		 * Apply an action on the current object and return the current object itself.
		 * @param this Current object.
		 * @param action Action to perform on the current object, which is available as `this`.
		 * @returns The current object itself.
		 * @note To use `this` in the action, you must use the `function` keyword. Arrow functions do not have their own `this`.
		 */
		apply<T>(this: T, action: (this: T) => any): T;
	}
}

Object.prototype.let = function <T, R = any>(this: T, action: (it: T) => R): R {
	return action(this);
}

Object.prototype.run = function <T, R = any>(this: T, action: (this: T) => R): R {
	return action.call(this);
}

Object.prototype.apply = function <T>(this: T, action: (this: T) => any): T {
	action.call(this);
	return this;
}

Object.prototype.also = function <T>(this: T, action: (it: T) => any): T {
	action(this);
	return this;
}