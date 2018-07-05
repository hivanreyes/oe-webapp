#!/bin/bash
set -e
set -x

mkdir -p static/css

NODE_ENV=development node_modules/.bin/next build
NODE_ENV=development node -r scripts/build-css.js
