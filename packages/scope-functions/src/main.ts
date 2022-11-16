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

const extensions = (<K extends keyof typeof Object.prototype>(e: Pick<typeof Object.prototype, K>) => e)({
	let<T, R = any>(this: T, action: (it: T) => R): R {
		return action(this);
	},

	run<T, R = any>(this: T, action: (this: T) => R): R {
		return action.call(this);
	},

	apply<T>(this: T, action: (this: T) => any): T {
		action.call(this);
		return this;
	},

	also<T>(this: T, action: (it: T) => any): T {
		action(this);
		return this;
	},
});

let enabled = false;

function enable(existing: "override" | "throw" = "throw"): void {
	if (enabled)
		return;
	const proto = Object.prototype;
	let name: keyof typeof extensions;
	for (name in extensions) {
		if (proto[name] && existing == "throw") {
			if (proto[name].toString() != extensions[name].toString())
				throw new Error(`Object.prototype.${name} already assigned with different implementation`);
		}
		Object.defineProperty(proto, name, {
			value: extensions[name],
			enumerable: false,
			configurable: true,
			writable: true,
		});
	}
	enabled = true;
}

function disable() {
	const proto = Object.prototype as Partial<Object>;
	let name: keyof typeof extensions;
	for (name in extensions)
		delete proto[name];
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