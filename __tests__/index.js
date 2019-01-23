/* eslint-env jest */

const babel = require('@babel/core');

const options = {
	configFile: false,
	plugins: [
		babel.createConfigItem(require('../dist/index.js'))
	]
};

test('works', () => {
	const input = `Object.values(a);`;
	const { code } = babel.transformSync(input, options);

	expect(code).toEqual(`Object.keys(a).map(key => a[key]);`);
});

test('works with object', () => {
	const input = `Object.values(a.b);`;

	const { code } = babel.transformSync(input, options);

	expect(code).toEqual(`Object.keys(a.b).map(key => a.b[key]);`);
});

test('works with import', () => {
	const input = `import { a } from 'x';
Object.values(a)`;

	const { code } = babel.transformSync(input, options);

	expect(code).toEqual(`import { a } from 'x';
Object.keys(a).map(key => a[key]);`);
});
