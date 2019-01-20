#!/bin/bash

arg="$1"

if [ "$arg" = "" ] ;then
    cd ./browser-app
    yarn start 
    
elif [ "$arg" = "plugin" ]; then
    cd ./browser-app
    yarn startWithPlugins
fi



