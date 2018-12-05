#!/usr/bin/env bash

echo "{
        \"presets\": [
          [
            \"@babel/preset-env\",
            {
              \"targets\": {
                \"node\": \"6\"
              }
            }
          ]
        ]
      }
" > .babelrc

files=("src/js/generateGeographicContext.js")
build_dir="src/js_build"

for file in ${files[*]}; do
    $(npm bin)/babel $file -d $build_dir
done

rm .babelrc
