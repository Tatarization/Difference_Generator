import yaml from 'js-yaml';

export default (data, fileExt) => {
	const format = ['.json', '.yml'];
	return fileExt === format[0] ? JSON.parse(data) : yaml.load(data);
};
