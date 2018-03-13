DOCTEST = node_modules/.bin/doctest --module commonjs --prefix .
ESLINT = node_modules/.bin/eslint --report-unused-disable-directives
ISTANBUL = node_modules/.bin/istanbul
NPM = npm
REMARK = node_modules/.bin/remark --frail --no-stdout
REMEMBER_BOWER = node_modules/.bin/remember-bower
TRANSCRIBE = node_modules/.bin/transcribe
TSLINT = node_modules/.bin/tslint
TYPINGS_CHECKER = node_modules/.bin/typings-checker
XYZ = node_modules/.bin/xyz --repo git@github.com:sanctuary-js/sanctuary.git --script scripts/prepublish


.PHONY: all
all: LICENSE README.md

.PHONY: LICENSE
LICENSE:
	cp -- '$@' '$@.orig'
	sed 's/Copyright (c) .* Sanctuary/Copyright (c) $(shell git log --date=short --pretty=format:%ad | sort -r | head -n 1 | cut -d - -f 1) Sanctuary/' '$@.orig' >'$@'
	rm -- '$@.orig'

README.md: README.md.tmp package.json scripts/version-urls
	scripts/version-urls '$<' >'$@'

.INTERMEDIATE: README.md.tmp
README.md.tmp: index.js
	$(TRANSCRIBE) \
	  --heading-level 4 \
	  --url 'https://github.com/sanctuary-js/sanctuary/blob/v$(VERSION)/{filename}#L{line}' \
	  -- $^ \
	| LC_ALL=C sed 's/<h4 name="\(.*\)#\(.*\)">\(.*\)\1#\2/<h4 name="\1.prototype.\2">\3\1#\2/' >'$@'


.PHONY: lint
lint:
	$(ESLINT) -- index.js karma.conf.js scripts/version-urls test
	$(TSLINT) \
	  --type-check \
	  --project tsconfig.json \
	  -- index.d.ts
	$(TSLINT) \
	  --project test/typescript/tsconfig.json \
	  -- test/typescript/*.ts
	$(REMEMBER_BOWER) $(shell pwd)
	rm -f README.md
	VERSION=0.0.0 make README.md
	$(REMARK) \
	  --use remark-lint-no-undefined-references \
	  --use remark-lint-no-unused-definitions \
	  -- README.md
	git checkout README.md
	scripts/commit-message


.PHONY: release-major release-minor release-patch
release-major release-minor release-patch:
	@$(XYZ) --increment $(@:release-%=%)


.PHONY: setup
setup:
	$(NPM) install


.PHONY: test
test:
	$(ISTANBUL) cover node_modules/.bin/_mocha
	$(ISTANBUL) check-coverage --branches 100
	$(TYPINGS_CHECKER) --allow-expect-error --project test/typescript/tsconfig.json test/typescript/*.ts
ifeq ($(shell node --version | cut -d . -f 1),v6)
	$(DOCTEST) -- index.js
else
	@echo '[WARN] Doctests are only run in Node v6.x.x (current version is $(shell node --version))' >&2
endif
