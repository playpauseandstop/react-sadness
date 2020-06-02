.PHONY: clean example install lint lint-only list-outdated run

# Project vars
NPM ?= npm
PRE_COMMIT ?= pre-commit

all: install

clean:
	rm -rf $(CACHE_DIR)/ $(DIST_DIR)/

install: .install
.install: package.json package-lock.json
	$(NPM) install
	touch $@

lint: install lint-only
lint-only:
	SKIP=$(SKIP) $(PRE_COMMIT) run --all $(HOOK)

list-outdated: install
	$(NPM) outdated

run: install
	$(NPM) run storybook
