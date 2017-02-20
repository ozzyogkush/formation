# Formation

A JavaScript library for websites to make form validation easy.

## Documentation

Visit http://ozzyogkush.github.io/formation for full documentation.

## Installation

The names `formation` and `formation-js` were already taken in NPM, so we've chosen to use `js-formation`.

    npm install --save js-formation --only=prod

>_Note: See the **`examples`** directory for live examples._

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

This software uses the [MIT](https://opensource.org/licenses/MIT) license (see `LICENSE.md`).

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
