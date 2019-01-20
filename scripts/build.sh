#!/bin/bash

arg="$1"

if [ "$arg" = "" ] ;then
    echo "编译 browser-app 和 extension"
    cd ./tinylink-extension
    yarn

    cd ../browser-app
    yarn
elif [ "$arg" = "plugin" ]; then
    echo "编译 plugin"
    cd ./plugins/tinylink
    yarn build
fi


