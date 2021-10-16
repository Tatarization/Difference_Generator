import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { main } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const stylish1 = readFile('JSONDiff.txt');
const stylish2 = readFile('JSONDiff2.txt');
const plain = readFile('plain.txt');
const json = readFile('json.txt');

test('genDiff stylish flat', () => {
	expect(main('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toEqual(stylish1);
	expect(main('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toEqual(stylish1);
});

test('genDiff stylish recursive', () => {
	expect(main('__fixtures__/file3.json', '__fixtures__/file4.json', 'stylish')).toEqual(stylish2);
	expect(main('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'stylish')).toEqual(stylish2);
});

test('genDiff plain', () => {
	expect(main('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain')).toEqual(plain);
	expect(main('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'plain')).toEqual(plain);
});

test('genDiff json', () => {
	expect(main('__fixtures__/file3.json', '__fixtures__/file4.json', 'json')).toEqual(json);
});
