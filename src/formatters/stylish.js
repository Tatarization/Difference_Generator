const addSpaces = (deep) => '    '.repeat(deep);

const isObject = (value) => typeof value === 'object' && value !== null;

const createString = (value, deep = 0) => {
	if (isObject(value)) {
		const lines = Object.keys(value).map((node) => `${addSpaces(deep + 1)}${node}: ${createString(value[node], deep + 1)}`);
		return `{\n${lines.join('\n')}\n${addSpaces(deep)}}`;
	}
	return value;
};

export const formatToStylish = (object, deep = 0) => {
	const result = object.reduce(
		(prev, node) => {
			const createLineOfString = (symb, value) => `${addSpaces(deep)}  ${symb} ${node.property}: ${createString(value, deep + 1)}`;
			switch (node.type) {
				case 'recursive':
					return `${prev}\n${addSpaces(deep)}    ${node.property}: ${formatToStylish(node.children, deep + 1)}`;

				case 'removed':
					return `${prev}\n${createLineOfString('-', node.value1)}`;

				case 'added':
					return `${prev}\n${createLineOfString('+', node.value2)}`;

				case 'equal':
					return `${prev}\n${createLineOfString(' ', node.value1)}`;

				case 'different value':
					return `${prev}\n${createLineOfString('-', node.value1)}\n${createLineOfString('+', node.value2)}`;

				default:
					throw new Error('Non-existent type');
			}
		},
		[],
	);
	return `{${result}\n${addSpaces(deep)}}`;
};
