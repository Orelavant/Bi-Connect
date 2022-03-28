export const applyMixins = (
	derivedConstructor: any,
	baseConstructors: any[]
) => {
	baseConstructors.forEach((baseConstructor) => {
		Object.getOwnPropertyNames(baseConstructor.prototype).forEach((name) => {
			Object.defineProperty(
				derivedConstructor.prototype,
				name,
				Object.getOwnPropertyDescriptor(baseConstructor.prototype, name)
			);
		});
	});
};

export const filterAttributes = (obj: Object, values: any[] = []) => {
	const o = Object.fromEntries(
		Object.entries(obj).filter(([k, v]) => values.includes(v))
	);
	return o;
};
