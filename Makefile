name=QingStorAuthorizationSignatureDynamicValue
identifier=io.pjw.paw.extensions.${name}
extensions_dir=$(HOME)/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/

.PHONY: watch
watch:
	./node_modules/.bin/webpack --watch

.PHONY: build
build:
	./node_modules/.bin/webpack

.PHONY: clean
clean:
	rm -Rf ./build/

.PHONY: install
install: clean build
	mkdir -p "${extensions_dir}${identifier}/"
	cp -r ./build/${identifier}/* "${extensions_dir}${identifier}/"

.PHONY: archive
archive: build
	cd ./build/; zip -r ${name}.zip ${identifier}/
