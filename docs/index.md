---
---

# Formation

A rule-based, cross-browser compatible library for websites to make HTML form validation easy. To use it, simply include  
 one of the dist JavaScript files in the `head` section or after the closing `body` tag of your webpage, and add a few   
 DOM `data-` attributes to your HTML forms and their input elements.

<!--end-excerpt-->

## Installation

On NPM the package name is [`js-formation`](https://www.npmjs.com/package/js-formation). To install: 

    npm install --save js-formation

Latest builds also available on GitHub at https://github.com/ozzyogkush/formation/tree/master/dist.

## Usage

1. Include `dist/formation.js` or `dist/formation.min.js` in your DOM
1. For each form you wish to have Formation validate:
  - add the `data-formation="1"` attribute
  - add a submit button with a `data-fv-submit="1"` attribute, and a `disabled="disabled"` attribute
1. For each form input element that is required, add the `data-fv-required="1"` attribute and the validation rules
1. For each form input element that is optional, add the `data-fv-optional="1"` attribute
1. Add any validation change event handlers required (advanced)

Formation will handle the rest! Form elements will become valid or invalid during user interaction based on the supplied 
 rules. When all required fields are valid, it will enable the `submit` button and let the user proceed.

### Example

```html
<head>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
<body>
  <form data-formation="1">
    <input type="text" name="name" id="name" data-fv-required="1" data-fv-max-length="15" />
    <input type="text" name="email" id="email" data-fv-required="1" data-fv-format="email" />
    
    <div data-fv-required="1" data-fv-min-selected="1" data-fv-group-container="favoriteAnimals">
      <h2>Favorite Animal(s):</h2>
      <label for="dogs">Dogs: <input type="checkbox" name="favoriteAnimals" id="dogs"></label>
      <label for="cats">Cats: <input type="checkbox" name="favoriteAnimals" id="cats"></label>
      <label for="birds">Birds: <input type="checkbox" name="favoriteAnimals" id="birds"></label>
    </div>
    
    <div data-fv-required="1" data-fv-group-container="favoriteLanguage">
      <h2>Favorite Language:</h2>
      <label for="javascript">JavaScript: <input type="radio" name="favoriteLanguage" id="javascript"></label>
      <label for="c++">C++: <input type="radio" name="favoriteLanguage" id="c++"></label>
      <label for="ruby">Ruby: <input type="radio" name="favoriteLanguage" id="ruby"></label>
    </div>
    
    <select name="productWeight" data-fv-required="1">
      <option value="">&mdash; PICK ONE &mdash;</option>
      <option value="14lbs">14 lbs.</option>
      <option value="30lbs">30 lbs.</option>
      <option value="420lbs">420 lbs.</option>
    </select>
    
    <button type="submit" data-fv-form-submit="1" disabled="disabled">Submit</button>
  </form>
</body>
```

## Supported Form Element Types, Rules, and Examples:

- [`text`](elements/text)
- [`checkbox`](elements/checkbox)
- [`radio`](elements/radio)
- [`select`](elements/select)

## Advanced Usage

Custom rules, and Events.

See the [advanced usage](advanced) page.

## API

A handful of helpful methods exposed on the `Formation` object.

See the [API](api) page.

## Contributing

See the [contributing](contributing) page.

## License

This software uses the [MIT](https://opensource.org/licenses/MIT) license.
