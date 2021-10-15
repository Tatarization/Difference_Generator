import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';

export const readFile = (filepath) => readFileSync(path.isAbsolute(filepath) ? filepath : path.resolve(cwd(), filepath), 'utf8');

export const getExtofFile = (filepath) => path.extname(filepath);

export const getObjectKeys = (object) => Object.keys(object);

export const isObject = (value) => typeof value === 'object' && value !== null;

export const isString = (value) => typeof value === 'string' && value !== null;
