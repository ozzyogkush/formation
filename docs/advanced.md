---
title: Formation | Advanced Usage
description: Advanced usage, custom rules and detecting events for Formation form validation library
---

# Custom Rules

You can add a custom rule to any supported element type using:

    Formation.registerRule(elementType, ruleName, ruleCallbackMethod) 

You can then use that rule on a supported element by adding `data-fv-{ruleName}="{valueToCheck}"`. 

Example `at-least-n-capitals`:

```html
<head>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
<body>
  <form data-formation="1">
    <input type="text" 
           name="name" 
           id="name" 
           data-fv-required="1" 
           data-fv-min-length="5" 
           data-fv-max-length="15"
           data-fv-at-least-n-capitals="5" />
  </form>
</body>
<script type="text/javascript">
  Formation.registerRule('text', 'at-least-n-capitals', function(element, attribute) {
    var n = element.getAttribute(attribute);
    var capitals = element.value.match(/([A-Z])/g);
    return capitals !== null && capitals.length >= n;
  });
</script>
```

# Detecting Events

When the validation state of a registered `form` - or an input element inside a registered form - has changed 
 (eg from `false` to `true` or vice-versa), it will trigger a `validity-changed.formation` event. You can listen
 for this event to handle custom logic: eg changing visual state indicators (success vs error), making an AJAX call,
 whatever your application requires.

Example:

```javascript
var formValid = document.getElementById('form-valid');
Array.from(document.getElementsByTagName('form')).forEach(function(form) {
  form.addEventListener(Formation.getValidityChangedEventName(), function() {
    // ... Do stuff when the FORM's validity has changed
  });

  Array
    .from(Formation.findRequiredFields(form))
    .concat(Array.from(Formation.findOptionalFields(form)))
    .forEach(function(field) {
      field.addEventListener(Formation.getValidityChangedEventName(), function(event) {
        // ... Do stuff when an individual required/optional form element's validity has changed
      });
    })
});
```
