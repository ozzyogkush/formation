---
title: Formation - Public API Methods
---

# Formation API:

When you include the library in the DOM, it adds a `Formation` object to the window. There are a number of useful
 methods available on `Formation`:

- `setDebug()` - when set to `true`, will log messages, warnings, etc to the console
- `getDebug()` - get the status of debug
- `registerRule()` - register a new rule to make it available
- `getValidationChangedEventName()` - the defined event for when a form/element's validation state changes 

Some useful DOM navigation methods (see [`./src/utilities/dom-navigation.js`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js)`):

- `findCurrentFormByTarget()` - Pass in any element and it will return the current Formation `form` 
- `findOptionalFields()` - find all optional fields for the supplied `$form` element
- `findPreviewButton()` - find the `preview` button for the supplied `$form` element
- `findRequiredFields()` - find all required fields for the supplied `$form` element
- `findSubmitButton()` - find the `submit` button for the supplied `$form` element
- `getAllCheckboxesOrRadiosByName()` - find all input elements in the current form with the same name as the supplied `$element`
- `getCheckboxOrRadioContainer()` - find all the DOM element which acts as a container for a set of input elements with the same name as `$element`
- `getLinkedElement()` - find the element in the DOM linked to `$source` and return it
