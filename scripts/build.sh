#!/bin/bash

arg="$1"

if [ "$arg" = "" ] ;then
    echo "compile browser-app with production mode"
    cd ./browser-app
    yarn
    yarn build
elif [ "$arg" = "dev" ] ;then
    echo "compile browser-app with development mode"
    cd ./browser-app
    yarn
    yarn dev
elif [ "$arg" = "extension" ]; then
    echo "compile tinylink-extension"
    cd ./tinylink-extension
    yarn
    yarn build
elif [ "$arg" = "plugin" ]; then
    echo "compile tinylink-plugin"
    cd ./plugins/tinylink
    yarn
fi
