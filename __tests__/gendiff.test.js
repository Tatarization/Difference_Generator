import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import gendiff from '../src/main.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname,'..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const stylish1 = readFile('JSONDiff.txt');
const stylish2 = readFile('JSONDiff2.txt');
const plain = readFile('plain.txt');
const json = readFile('JSONDiff.txt');

test('genDiff stylish', () => {
	expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toEqual(stylish1);
	expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toEqual(stylish1);
	expect(gendiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'stylish')).toEqual(stylish2);
	expect(gendiff('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'stylish')).toEqual(stylish2);
});

test('genDiff plain', () => {
	expect(gendiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain')).toEqual(plain);
	expect(gendiff('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'plain')).toEqual(plain);
});
