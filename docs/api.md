---
title: Formation - Public API Methods
---

# Formation API:

When you include the library in the DOM, it adds a `Formation` object to the window. There are a number of useful
 methods available on `Formation`:

- [`initForm()`](https://github.com/ozzyogkush/formation/blob/master/src/formation-stamp.js#L111) - Allow consumers of Formation to initialize forms that may be added to the DOM after auto-initialization of the DOM
- [`setDebug()`](https://github.com/ozzyogkush/formation/blob/master/src/formation-stamp.js#L251) - when set to `true`, will log messages, warnings, etc to the console
- [`getDebug()`](https://github.com/ozzyogkush/formation/blob/master/src/formation-stamp.js#L236) - get the status of debug
- [`registerRule()`](https://github.com/ozzyogkush/formation/blob/master/src/formation-stamp.js#L190) - register a new rule to make it available
- [`getValidityChangedEventName()`](https://github.com/ozzyogkush/formation/blob/master/src/event-handlers/event-definitions-stamp.js#L336) - the defined event for when a form/element's validation state changes

Some useful DOM navigation methods (see [`./src/utilities/dom-navigation.js`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js)`):

- [`findCurrentFormByTarget()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L158) - Pass in any element and it will return the current Formation `form` 
- [`findRequiredFields()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L208) - find all required fields for the supplied `$form` element
- [`findSubmitButton()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L238) - find the `submit` button for the supplied `$form` element
- [`findOptionalFields()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L223) - find all optional fields for the supplied `$form` element
- [`findPreviewButton()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L253) - find the `preview` button for the supplied `$form` element
- [`getAllCheckboxesOrRadiosByName()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L306) - find all input elements in the current form with the same name as the supplied `$element`
- [`getCheckboxOrRadioContainer()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L289) - find all the DOM element which acts as a container for a set of input elements with the same name as `$element`
- [`getLinkedElement()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L343) - find the element in the DOM linked to `$source` and return it
