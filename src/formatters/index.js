import { formatToPlain } from './plain.js';
import { formatToStylish } from './stylish.js';
import { formatToJson } from './json.js';

export const format = (tree, NameFormat) => {
    switch (NameFormat) {
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
