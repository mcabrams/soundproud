#!/bin/bash

cp -r ./node_modules/ /package/

exec npm run build
