.PHONY: example install lint

# Project vars
CACHE_DIR ?= ./.cache
DIST_DIR ?= ./dist
NPM ?= npm
PRE_COMMIT ?= pre-commit

all: install

clean:
	rm -rf $(CACHE_DIR)/ $(DIST_DIR)/

example: install
ifeq ($(EXAMPLE),)
	@echo "ERROR: EXAMPLE env var missing. Usage: make EXAMPLE=basic example"
	@exit 1
else
	$(NPM) run example -- examples/$(EXAMPLE)/pages/index.html -d $(DIST_DIR)/$(EXAMPLE)/ --cache-dir $(CACHE_DIR)/$(EXAMPLE)/ --open
endif

install: .install
.install: package.json package-lock.json
	$(NPM) install
	touch $@

lint: install lint-only
lint-only:
	SKIP=$(SKIP) $(PRE_COMMIT) run --all $(HOOK)
