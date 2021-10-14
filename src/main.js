import { getTree } from './genDiff.js';
import { readFile, getExtofFile } from './functions.js';
import parse from './parsers.js';
import { formatters } from './formatters/index.js';

export default (filepath1, filepath2, format) => {
	const data1 = readFile(filepath1);
	const data2 = readFile(filepath2);
	const ext1 = getExtofFile(filepath1);
	const ext2 = getExtofFile(filepath2);
	const file1parsed = parse(data1, ext1);
	const file2parsed = parse(data2, ext2);
	const tree = getTree(file1parsed, file2parsed);
	return formatters(tree, format);
};
