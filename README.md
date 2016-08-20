# Formation

A JavaScript library for websites to make form validation easy.

Dependencies:

- [`jQuery`](http://jquery.com) - included in distribution files

## Usage

1. Include `dist/formation.js` or `dist/formation-min.js` in your DOM
1. For each form you wish to support:
  - add the `data-formation="1"` attribute
  - add a submit button with a `data-fv-submit="1"` attribute, and a `disabled="disabled"` attribute
1. For each form input element that is required, add the `data-fv-required="1"` attribute and the validation rules
1. Add any validation change event handlers required

Formation will handle the rest! Form elements will become valid or invalid during user interaction based on the
supplied rules. When all required fields are valid, it will enable the `submit` button and let the user proceed.

### Example:

```html
<head>
  <script type="text/javascript" src="formation-min.js"></script>
</head>
<body>
  <form data-formation="1">
    <input type="text" name="name" id="name" data-fv-required="1" data-fv-min-length="5" data-fv-max-length="15" />
    <input type="text" name="email" id="email" data-fv-required="1" data-fv-at-least-n-capitals="4" data-fv-format="email" />
    <div data-fv-required="1" data-fv-min-selected="1" data-fv-max-selected="3" data-fv-group-container="optionsToCheck">
      <label for="optionsToCheck1">1: <input type="checkbox" name="optionsToCheck" id="optionsToCheck1"></label>
      <label for="optionsToCheck2">2: <input type="checkbox" name="optionsToCheck" id="optionsToCheck2"></label>
      <label for="optionsToCheck3">3: <input type="checkbox" name="optionsToCheck" id="optionsToCheck3"></label>
      <label for="optionsToCheck4">4: <input type="checkbox" name="optionsToCheck" id="optionsToCheck4"></label>
      <label for="optionsToCheck5">5: <input type="checkbox" name="optionsToCheck" id="optionsToCheck5"></label>
      <label for="optionsToCheck6">6: <input type="checkbox" name="optionsToCheck" id="optionsToCheck6"></label>
    </div>
    <div data-fv-required="1" data-fv-group-container="oneToChoose">
      <label for="oneToChoose1">1: <input type="radio" name="oneToChoose" id="oneToChoose1"></label>
      <label for="oneToChoose2">2: <input type="radio" name="oneToChoose" id="oneToChoose2"></label>
      <label for="oneToChoose3">3: <input type="radio" name="oneToChoose" id="oneToChoose3"></label>
    </div>
    <select name="someChoices" data-fv-required="1">
      <option value="">&mdash; PICK ONE &mdash;</option>
      <option value="1">Some</option>
      <option value="2">Good</option>
      <option value="3">Values</option>
    </select>
    <button type="submit" data-fv-form-submit="1" disabled="disabled">Submit</button>
  </form>
</body>
<script type="text/javascript">
  Formation
    .setDebug(true)
    .registerRule('text', 'at-least-n-capitals', function($element, attribute) {
      var n = $element.attr(attribute);
      var capitals = $element.val().match(/([A-Z])/g);
      return capitals !== null && capitals.length >= n;
    });
</script>
```

>_Note: See the **`examples`** directory for live examples._

### Supported Element Types:

- **text**

        input[type="text"]
        input[type="number"]
        input[type="email"]
        input[type="password"]
        textarea
        
- **checkbox**

        input[type="checkbox"]

- **radio**

        input[type="radio"]
    
- **select**

        select

### Default Available rules:

>_Note: In the DOM, all rules are prefixed by `data-fv`. The `default` rule does not require an attribute
>on the DOM element. All rules are processed with `AND` logic and thus validation will fail if any 
>requested rule fails._

- **text** (See `./src/rules/text-default-rules.js`)
  - `default` : The trimmed value must not be empty
  - `min-length` : `integer` - The trimmed value must be <= the value specified
  - `max-length` : `integer` - The trimmed value must be >= the value specified
  - `format` : `string` - The trimmed value must match the specified format
    - Valid formats:

            zip5
            zip4
            zip
            email
            phone
            phone-multi
            REGEX

  - `match-field` : `string` - ID of another `text` element. The trimmed value must match the trimmed value of the other element 

>_Note: Checkbox and radio rules are applied to elements with the same **`name`** attribute. Such input elements are typically grouped
>into a container element. This element is the one that receives the **`required`** and any rule attributes. It is also
>here that you specify the **`name`** attribute of the checkboxes/radios being validated, EG, if the name of your inputs are 
>**`someSetOfInputs`**, your attribute on the container would be:_
>
>        data-fv-group-container="someSetOfInputs"

- **checkbox** (See `./src/rules/checkbox-default-rules.js`)
  - `default` : At least one checkbox in the set must be checked
  - `min-selected` : `integer` - The value specified indicates the _minimum_ number of checkboxes that must be selected
  - `max-selected` : `integer` - The value specified indicates the _maximum_ number of checkboxes that must be selected

- **radio** (See `./src/rules/radio-default-rules.js`)
  - `default` : At least one radio button in the set must be checked

- **select** (See `./src/rules/select-default-rules.js`)
  - `default` : The trimmed value of the selected option must not be empty

### Detecting Events

When the validation state of a registered `form` - or an input element inside a registered form - has changed 
 (eg from `false` to `true` or vice-versa), it will trigger a `validity-changed.formation` event. You can listen
 for this event to handle custom logic: eg changing visual state indicators (success vs error), making an AJAX call,
 whatever your application requires.

### Adding Custom Rules

You can add a custom rule to any supported element type using:

    Formation.registerRule(elementType, ruleName, ruleCallbackMethod) 

Example:

```javascript
<script type="text/javascript">
  Formation.registerRule('text', 'at-least-n-capitals', function($element, attribute) {
    var n = $element.attr(attribute);
    var capitals = $element.val().match(/([A-Z])/g);
    return capitals !== null && capitals.length >= n;
  });
</script>
```

You can then use that rule on a supported element by adding `data-fv-at-least-n-capitals="5"`

### Formation API:

When you include the library in the DOM, it adds a `Formation` object to the window. There are a number of useful 
methods available on `Formation`:

- `setDebug()` - when set to `true`, will log messages, warnings, etc to the console
- `getDebug()` - get the status of debug
- `registerRule()` - register a new rule to make it available
- `getValidationChangedEventName()` - the defined event for when a form/element's validation state changes 

Some useful DOM navigation methods (see `./src/utilities/dom-navigation.js`):

- `findCurrentFormByTarget()` - Pass in any element and it will return the current Formation `form` 
- `findOptionalFields()` - find all optional fields for the supplied `$form` element
- `findPreviewButton()` - find the `preview` button for the supplied `$form` element
- `findRequiredFields()` - find all required fields for the supplied `$form` element
- `findSubmitButton()` - find the `submit` button for the supplied `$form` element
- `getAllCheckboxesOrRadiosByName()` - find all input elements in the current form with the same name as the supplied `$element`
- `getCheckboxOrRadioContainer()` - find all the DOM element which acts as a container for a set of input elements with the same name as `$element`
- `getLinkedElement()` - find the element in the DOM linked to `$source` and return it

## License

TODO

## Contributing

### Requirements for Development

- [`Git`](http://git-scm.com/) - for version control (I recommend using the [SourceTree](https://www.atlassian.com/software/sourcetree/overview) program by Atlassian, as it rules)
- [`NodeJS`](https://nodejs.org) - required for development and release builds (v6.3 or higher)
- [`Grunt`](http://gruntjs.com) - to run tests and create builds.

After installing NodeJS (and its package manager NPM), run `npm install` to install dependencies.

### Workflow

This project uses the Github Flow. We will accept pull requests from branches (other than master) on your
own repository. All pull requests will be code reviewed. New features must include, at minimum, unit test cases. Unit
tests must also be updated for any changes to existing features.

1. Checkout `master` and pull the latest changes from upstream `master`
1. Create a new branch from master
1. Run `npm install` to add all dependencies
1. Add your changes and unit tests
1. Open a terminal to your project folder
1. Run automated tests with `grunt test` 
1. When ready, run `grunt build` to create distribution files
1. Commit changes and push your branch
1. Create a pull request of your forked branch into `master`

**Grunt tasks**:

- `dev` - JSHint and non-minified build
- `unitTests` - run all tests with code coverage
- `unitTests:mocha` - run all tests without code coverage
- `test` - JSHint, non-minified build, run all tests with code coverage
- `build` - JSHint, non-minified build, run all tests with code coverage, minified build

### Tools Used in Development and Testing

The below tools will be installed as dependencies:

- [`JSHint/JSLint`](https://www.npmjs.com/package/grunt-contrib-jshint) - used for ensuring JS files are syntactically correct
- [`Mocha`](https://mochajs.org/) - testing framework
- [`Chai`](http://chaijs.com/) - provides `assert`, `expect`, `should` functionality for Mocha
- [`Istanbul`](https://www.npmjs.com/package/grunt-mocha-istanbul) - works with Mocha to provides code coverage for testing results
- [`Sinon`](http://sinonjs.org/) - used for spies, stubs, mocks, etc. 
- [`Webpack`](https://webpack.github.io) - for building static assets in builds
