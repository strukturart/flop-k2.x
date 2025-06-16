#!/bin/bash

# Clean and prepare directories
rm -rf ./dist ./build
mkdir -p ./dist/assets ./build

# Build the application
npm run build

# Copy manifest files to the distribution directory
cp ./application/manifest.webapp ./dist/


# Create default app ZIP
cd ./dist

rm -f ../build/flop.zip
zip -r ../build/flop.zip ./*



exit

