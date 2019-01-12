---
description: A rule-based, cross-browser compatible library for websites to make front-end HTML form validation easy
---

# Formation

## About

A rule-based, cross-browser compatible library for websites to make HTML form validation easy.

Follow the author, [Derek Rosenzweig, on Twitter](https://twitter.com/ozzyogkush), for updates.

## Installation

Install with `npm` or `yarn` (the package name is [`js-formation`](https://www.npmjs.com/package/js-formation)):

    npm install --save js-formation
    yarn add js-formation

Latest builds also available on [GitHub](https://github.com/ozzyogkush/formation/tree/master/dist).

### Usage

#### The JavaScript

Modern way: add it to your existing project and build process using `import` or `require`:

```javascript
import Formation from 'js-formation';
// OR
const Formation = require('js-formation');

// At this point, your forms should be initialized and you can interact with Formation.

// EG: enable debug mode:
Formation.setDebug(true);

// EG: Add a custom rule (see advanced usage in the documentation)
Formation.registerRule('text', 'at-least-n-capitals', (element, attribute) => {
    const n = element.getAttribute(attribute);
    const capitals = element.value.match(/([A-Z])/g);
    return capitals !== null && capitals.length >= n;
});
```

The old way: directly include one of the dist JavaScript files in the `head` section or after the closing `body` tag of your webpage.

```html
<head>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
```

#### The DOM

Add the `data-` attributes to your HTML forms and their input elements to specify which rules are to be included.

1. For each form you wish to have Formation validate, add the `data-formation="1"` attribute
    - _Optionally:_ add a `submit` button/input with `data-fv-submit="1"` and `disabled="disabled"` attributes
1. For each form input element that is required, add the `data-fv-required="1"` attribute and the validation rules
1. For each form input element that is optional, add the `data-fv-optional="1"` attribute
1. Add any custom [validation change event handlers](advanced)

Formation will handle the rest! Form elements will become valid or invalid during user interaction based on the supplied 
 rules. When all required fields are valid, it will enable the `submit` button and let the user proceed.

```html
<body>
  <form data-formation="1">
    <input
      type="text"
      name="name" 
      id="name" 
      data-fv-required="1" 
      data-fv-max-length="15" />
    <input 
      type="text" 
      name="email" 
      id="email" 
      data-fv-required="1" 
      data-fv-format="email" />
    
    <div 
      data-fv-required="1"
      data-fv-min-selected="1"
      data-fv-group-container="favoriteAnimals">
      <h2>Favorite Animal(s):</h2>
      <label for="dogs">
        Dogs: <input type="checkbox" name="favoriteAnimals" id="dogs" value="dogs">
      </label>
      <label for="cats">
        Cats: <input type="checkbox" name="favoriteAnimals" id="cats" value="cats">
      </label>
      <label for="birds">
        Birds: <input type="checkbox" name="favoriteAnimals" id="birds" value="birds">
      </label>
    </div>
    
    <div
      data-fv-required="1" 
      data-fv-group-container="favoriteLanguage">
      <h2>Favorite Language:</h2>
      <label for="javascript">
        JavaScript: <input type="radio" name="favoriteLanguage" id="javascript" value="javascript">
      </label>
      <label for="c++">
        C++: <input type="radio" name="favoriteLanguage" id="c++" value="c++">
      </label>
      <label for="ruby">
        Ruby: <input type="radio" name="favoriteLanguage" id="ruby" value="ruby">
      </label>
    </div>
    
    <h2>Product Weight:</h2>
    <select name="productWeight" data-fv-required="1">
      <option value="">&mdash; PICK ONE &mdash;</option>
      <option value="14lbs">14 lbs.</option>
      <option value="30lbs">30 lbs.</option>
      <option value="420lbs">420 lbs.</option>
    </select>
    
    <!--
        Optional submit button that toggles on/off 
        depending on form validity state.
    -->
    <button 
      type="submit"
      data-fv-form-submit="1"
      disabled="disabled">Submit</button>
  </form>
</body>
```

## Supported Form Element Types, Rules, and Examples:

- [`text`](elements/text)
- [`checkbox`](elements/checkbox)
- [`radio`](elements/radio)
- [`select`](elements/select)

## Advanced Usage

Custom rules, and Events. See the [advanced usage](advanced) page.

## API

A handful of helpful methods exposed on the `Formation` object. See the [API](api) page.

## Contributing

See the [contributing](contributing) page.

## License

This software uses the [MIT](https://opensource.org/licenses/MIT) license.