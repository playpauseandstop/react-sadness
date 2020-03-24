.PHONY: example install lint

# Project vars
NPM ?= npm
PRE_COMMIT ?= pre-commit

all: install

clean:
	rm -rf $(CACHE_DIR)/ $(DIST_DIR)/

deploy: install
	$(NPM) run build-storybook
	$(NPM) run now

install: .install
.install: package.json package-lock.json
	$(NPM) install
	touch $@

lint: install lint-only
lint-only:
	SKIP=$(SKIP) $(PRE_COMMIT) run --all $(HOOK)

run: install
	$(NPM) run storybook
