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

function lett<T, R = any>(this: T, action: (it: T) => R): R {
	return action(this);
}

function run<T, R = any>(this: T, action: (this: T) => R): R {
	return action.call(this);
}

function apply<T>(this: T, action: (this: T) => any): T {
	action.call(this);
	return this;
}

function also<T>(this: T, action: (it: T) => any): T {
	action(this);
	return this;
}

function configure<T extends object, K extends keyof T>(obj: T, ...keys: K[]): void {
	for (const key of keys)
		Object.defineProperty(obj, key, {
			configurable: true,
			enumerable: false,
			writable: false
		});
}

let enabled = false;

function enable() {
	if (enabled)
		return;
	Object.prototype.let = lett;
	Object.prototype.run = run;
	Object.prototype.also = also;
	Object.prototype.apply = apply;
	configure(Object.prototype, "let", "run", "also", "apply");
	enabled = true;
}

function disable() {
	if (!enabled)
		return;
	const proto = Object.prototype as Partial<Object>;
	delete proto.let;
	delete proto.run;
	delete proto.also;
	delete proto.apply;
	enabled = false;
}

/**
 * Enable scope functions globally.
 */
export function enableScopeFunctions(): void;
/**
 * Temporarily enable scope functions until the given action completes.
 * @param action Action to perform with scope functions enabled.
 */
export function enableScopeFunctions(action: () => void): void;
/**
 * Temporarily enable scope functions until the given asynchrnous action completes.
 * @param action Action to perform with scope functions enabled.
 * @returns A promise that resolves when the action completes.
 * @warning Due to event loops, the temporarily enabled scope functions can be available and accessed outside of the action.
 */
export function enableScopeFunctions(action: () => Promise<any>): Promise<void>;
export function enableScopeFunctions(action?: () => void | Promise<any>): void | Promise<void> {
	enable();
	if (!action)
		return;
	const result = action();
	if (result instanceof Promise)
		return result.then(disable);
	disable();
}

/**
 * Disable scope functions globally.
 */
export function disableScopeFunctions(): void;
/**
 * Temporarily disable scope functions until the given action completes.
 * @param action Action to perform with scope functions disabled.
 */
export function disableScopeFunctions(action: () => void): void;
/**
 * Temporarily disable scope functions until the given asynchrnous action completes.
 * @param action Action to perform with scope functions disabled.
 * @returns A promise that resolves when the action completes.
 * @warning Due to event loops, the temporarily disabled scope functions can be inaccessible outside of the action.
 */
export function disableScopeFunctions(action: () => Promise<any>): Promise<void>;
export function disableScopeFunctions(action?: () => void | Promise<any>): void | Promise<void> {
	disable();
	if (!action)
		return;
	const result = action();
	if (result instanceof Promise)
		return result.then(enable);
	enable();
}

// Enable scope functions by default
enable();