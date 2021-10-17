import path from 'path';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import { getTree } from './src/getTree.js';
import { parse } from './src/parsers.js';
import { format } from './src/formatters/index.js';

const getFileExtention = (filepath) => path.extname(filepath);

const readFile = (filepath) => readFileSync(path.isAbsolute(filepath) ? filepath : path.resolve(cwd(), filepath), 'utf8');

export const genDiff = (filepath1, filepath2, Nameformat) => {
	const data1 = readFile(filepath1);
	const data2 = readFile(filepath2);
	const extention1 = getFileExtention(filepath1);
	const extention2 = getFileExtention(filepath2);
	const file1parsed = parse(data1, extention1);
	const file2parsed = parse(data2, extention2);
	const tree = getTree(file1parsed, file2parsed);
	return format(tree, Nameformat);
};
