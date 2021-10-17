import _ from 'lodash';

const createValue = (value) => {
	if (_.isObject(value)) {
		return '[complex value]';
	}
	return _.isString(value) ? `'${value}'` : value;
};

const getFlatArray = (arr) => arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? getFlatArray(cur) : cur), []);

export const formatToPlain = (object) => {
	const createProperty = (data, prop) => data.map((node) => {
		const property = prop ? `${prop}.${node.property}` : node.property;
		switch (node.type) {
				case 'recursive':
					return createProperty(node.children, property);

				case 'equal':
					return '';

				case 'removed':
					return `Property '${property}' was removed`;

				case 'added':
					return `Property '${property}' was added with value: ${createValue(node.value2)}`;

				case 'different value':
					return `Property '${property}' was updated. From ${createValue(node.value1)} to ${createValue(node.value2)}`;

				default:
					throw new Error('Non-existent type');
		}
	});
	return getFlatArray(createProperty(object, '')).filter((value) => value !== '').join('\n');
};
