# Formation Changelog

## 2.1.1

- Improve README and documentation
- Update `grunt-webpack` and `webpack-dev-server` devDependencies

## 2.1.0

- Upgrade to Webpack 4.
- Including a managed `submit` button in each form is now _optional_.

## 2.0.4

- Add missing `keywords` property to `package.json` so it can be found easier through searches.

## 2.0.3

- Move from `npm` to `yarn`, update some dependencies.

## 2.0.2

- Update documentation to be a little clearer.
- Add documentation for `data-fv-linked-input` functionality to checkbox/radio element pages.
- Update build time dependencies (webpack, grunt-webpack, and webpack-dev-server) to latest npm versions.
- Include `package-lock.json` in source.

## 2.0.0

- Refactor project to remove jQuery dependency.
- All `utilities/dom-navigation.js` methods that took jQuery objects as parameters now take HTML Element objects.
- Remove `KeyCodeSet` object.
- Remove `vendor.js` and `vendor.min.js` dist files.
- Update a number of dependency versions.

## 1.1.1

- Refactor documentation to live on GitHub Pages at http://ozzyogkush.github.io/formation.

## 1.1.0

- Separate jQuery dependency into `vendor.js` and `vendor.min.js` output chunks
