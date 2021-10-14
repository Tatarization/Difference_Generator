import _ from 'lodash';
import { isString, isObject } from '../functions.js';

const createString = (value) => {
	if (isObject(value)) {
		return '[complex value]';
	}
	return isString(value) ? `'${value}'` : value;
};

export const plain = (object) => {
	const createLineOfString = (data, prop) => data.map((node) => {
		const property = prop === null ? `${prop}.${node.property}` : node.property;
		switch (node.type) {
				case 'recursive':
					return createLineOfString(node.children, property);

				case 'equal':
					return '';

				case 'removed':
					return `Property '${property}' was removed`;

				case 'added':
					return `Property '${property}' was added with value: ${createString(node.value2)}`;

				case 'different value':
					return `Property '${property}' was updated. From ${createString(node.value1)} to ${createString(node.value2)}`;

				default:
					throw new Error('Non-existent type');
		}
	});
	return _.flattenDeep(createLineOfString(object, '')).filter(value => value !== '').join('\n');
};
