# Changelog

## 2.0.1

### Fixes

Correctly mark external dependencies as such. Previously `__dirname` was being bundled with into the .mjs file which does not work.

## 2.0.0

### Features

Support for both ESM & CommonJS which is required for the most recent version of [conventional-changelog-preset-loader](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-preset-loader).
This version has not been tested with previous versions but should still work.

## 1.0.0

### Features

-   Initial release of this package
