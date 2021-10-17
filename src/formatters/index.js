import { formatToPlain } from './plain.js';
import { formatToStylish } from './stylish.js';
import { formatToJson } from './json.js';

export const getFormatter = (tree, format) => {
    switch (format) {
        case 'plain':
            return formatToPlain(tree);

        case 'stylish':
            return formatToStylish(tree);

        case 'json':
            return formatToJson(tree);

        default:
            throw new Error('Non-existent type');
    }
};
