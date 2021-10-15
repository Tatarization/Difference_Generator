import { getObjectKeys, isObject } from '../functions.js';

const addSpaces = (deep) => ' '.repeat(deep);

const createString = (value, deep = 0) => {
	if (isObject(value)) {
		const lines = getObjectKeys(value).map((node) => `${addSpaces(deep + 4)}${node}: ${createString(value[node], deep + 4)}`);
		return `{\n${lines.join('\n')}\n${addSpaces(deep)}}`;
	}
	return value;
};

export const stylish = (object, deep = 0) => {
	const result = object.reduce(
		(prev, node) => {
			const createLineOfString = (symb, value) => `${addSpaces(deep)}  ${symb} ${node.property}: ${createString(value, deep + 4)}`;
			switch (node.type) {
				case 'recursive':
					return `${prev}\n${addSpaces(deep)}    ${node.property}: ${stylish(node.children, deep + 4)}`;

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
