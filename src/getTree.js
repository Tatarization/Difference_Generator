import _ from 'lodash';

const isObject = (value) => typeof value === 'object' && value !== null;

export const getTree = (object1, object2) => {
	const uniqueKeys = _.uniq(Object.keys(object1).concat(Object.keys(object2))).sort();
	const result = uniqueKeys.map(
		(node) => {
			if (!_.has(object1, node)) {
				return {
					property: node,
					type: 'added',
					value1: null,
					value2: object2[node],
				};
			}
			if (!_.has(object2, node)) {
				return {
					property: node,
					type: 'removed',
					value1: object1[node],
					value2: null,
				};
			}

			if (isObject(object1[node]) && isObject(object2[node])) {
				return {
					property: node,
					type: 'recursive',
					children: getTree(object1[node], object2[node]),
				};
			}

			if ((object1[node] === object2[node])) {
				return {
					property: node,
					type: 'equal',
					value1: object1[node],
					value2: object2[node],
				};
			}
			return {
				property: node,
				type: 'different value',
				value1: object1[node],
				value2: object2[node],
			};
		},
	);
	return result;
};
