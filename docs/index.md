---
---

# Formation

A JavaScript library for websites to make form validation easy.

Dependencies:

- [`jQuery`](http://jquery.com)

## Installation

The names `formation` and `formation-js` were already taken in NPM, so we've chosen to use [`js-formation`](https://www.npmjs.com/package/js-formation).

    npm install --save js-formation --only=prod

## Usage

1. Include jQuery in your DOM via:
  - the `dist/vendor.js` file
  - the `dist/vendor.min.js` file
  - through a CDN
  - or however your build process includes this project 
1. Include `dist/formation.js` or `dist/formation.min.js` in your DOM
1. For each form you wish to support:
  - add the `data-formation="1"` attribute
  - add a submit button with a `data-fv-submit="1"` attribute, and a `disabled="disabled"` attribute
1. For each form input element that is required, add the `data-fv-required="1"` attribute and the validation rules
1. Add any validation change event handlers required

Formation will handle the rest! Form elements will become valid or invalid during user interaction based on the supplied rules. When all required fields are valid, it will enable the `submit` button and let the user proceed.

## Supported Form Element Types, Rules, and Examples:

- [`text`](elements/text)
- [`checkbox`](elements/checkbox)
- [`radio`](elements/radio)
- [`select`](elements/select)

## License

This software uses the [MIT](https://opensource.org/licenses/MIT) license.
