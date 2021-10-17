import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { genDiff } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const stylish2 = readFile('JSONDiff2.txt');
const plain = readFile('plain.txt');
const json = readFile('json.txt');

test('genDiff stylish recursive', () => {
	expect(genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'stylish')).toEqual(stylish2);
	expect(genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'stylish')).toEqual(stylish2);
});

test('genDiff plain', () => {
	expect(genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain')).toEqual(plain);
	expect(genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'plain')).toEqual(plain);
});

test('genDiff json', () => {
	expect(genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'json')).toEqual(json);
});
