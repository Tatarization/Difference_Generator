import yaml from 'js-yaml';

export const parse = (data, fileExtention) => {
	switch (fileExtention.slice(1)) {
		case 'json':
			return JSON.parse(data);
		case 'yml':
			return yaml.load(data);
		default:
			throw new Error('Non-existent type');
	}
};
