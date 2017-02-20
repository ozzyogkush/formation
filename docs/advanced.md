---
title: Formation - Advanced Usage
---

# Custom Rules

You can add a custom rule to any supported element type using:

    Formation.registerRule(elementType, ruleName, ruleCallbackMethod) 

You can then use that rule on a supported element by adding `data-fv-{ruleName}="{valueToCheck}"`. 

Example `at-least-n-capital`:

```html
<head>
  <script type="text/javascript" src="vendor.min.js"></script>
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
    <button type="submit" data-fv-form-submit="1" disabled="disabled">Submit</button>
  </form>
</body>
<script type="text/javascript">
  Formation.registerRule(
    'text', 
    'at-least-n-capitals', 
    function($element, attribute) {
      var n = $element.attr(attribute);
      var capitals = $element.val().match(/([A-Z])/g);
      return capitals !== null && capitals.length >= n;
    }
  );
</script>
```

# Detecting Events

When the validation state of a registered `form` - or an input element inside a registered form - has changed 
 (eg from `false` to `true` or vice-versa), it will trigger a `validity-changed.formation` event. You can listen
 for this event to handle custom logic: eg changing visual state indicators (success vs error), making an AJAX call,
 whatever your application requires.

Example:

```javascript
$('form[data-formation="1"]').each(function() {
  $form.on(Formation.getValidityChangedEventName(), function() {
    // ... Do stuff when the FORM's validity has changed
  });
  Formation
    .findRequiredFields($form)
    .add(Formation.findOptionalFields($form))
    .on(Formation.getValidityChangedEventName(), function() {
      // ... Do stuff when an individual required/optional form element's validity has changed
    });
});
```
