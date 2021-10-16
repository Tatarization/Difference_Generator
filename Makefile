install:
	npm ci

lint:
	npm run lint

lint-fix:
	npm run lint-fix

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

link:
	npm link