.PHONY: watch build clean install archive

name=QingStorAuthorizationSignatureDynamicValue
identifier=com.prettyxw.paw.extensions.${name}
extensions_dir=$(HOME)/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/

watch:
	./node_modules/.bin/webpack --watch

build:
	./node_modules/.bin/webpack

clean:
	rm -Rf ./build/

install: clean build
	mkdir -p "${extensions_dir}${identifier}/"
	cp -r ./build/${identifier}/* "${extensions_dir}${identifier}/"

archive: build
	cd ./build/; zip -r ${name}.zip ${identifier}/
