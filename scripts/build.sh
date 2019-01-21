#!/bin/bash

arg="$1"

if [ "$arg" = "" ] ;then
    echo "compile browser-app"
    cd ./browser-app
    yarn
elif [ "$arg" = "extension" ]; then
    echo "compile tinylink-extension"
    cd ./tinylink-extension
    yarn
elif [ "$arg" = "plugin" ]; then
    echo "compile tinylink-plugin"
    cd ./plugins/tinylink
    yarn
fi


