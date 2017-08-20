---
title: Formation | Supported Checkbox Input Rules
description: Supported rules and basic example of checkbox form inputs for Formation form validation library
---

# Supported Element Types:

    input[type="checkbox"]

# Default Available rules:

>_Note: In the DOM, all rules are prefixed by `data-fv`. The `default` rule does not require an attribute
>on the DOM element. All rules are processed with `AND` logic and thus validation will fail if any 
>requested rule fails._

>_Note: Checkbox rules are applied to elements with the same **`name`** attribute. Such input elements are typically grouped
>into a container element. This element is the one that receives the **`required`** and any rule attributes. It is also
>here that you specify the **`name`** attribute of the checkboxes being validated, EG, if the name of your inputs are 
>**`someSetOfInputs`**, your attribute on the container would be:_
>
>        data-fv-group-container="someSetOfInputs"

- **checkbox** (See [`./src/rules/checkbox-default-rules.js`](https://github.com/ozzyogkush/formation/blob/master/src/rules/checkbox-default-rules.js))
  - `default` : At least one checkbox in the set must be checked
  - `min-selected` : `integer` - The value specified indicates the _minimum_ number of checkboxes that must be selected
  - `max-selected` : `integer` - The value specified indicates the _maximum_ number of checkboxes that must be selected

# Basic Example:

```html
<head>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
<body>
  <form data-formation="1">
    <div data-fv-required="1" data-fv-min-selected="1" data-fv-max-selected="3" data-fv-group-container="optionsToCheck">
      <label for="optionsToCheck1">1: <input type="checkbox" name="optionsToCheck" id="optionsToCheck1"></label>
      <label for="optionsToCheck2">2: <input type="checkbox" name="optionsToCheck" id="optionsToCheck2"></label>
      <label for="optionsToCheck3">3: <input type="checkbox" name="optionsToCheck" id="optionsToCheck3"></label>
      <label for="optionsToCheck4">4: <input type="checkbox" name="optionsToCheck" id="optionsToCheck4"></label>
      <label for="optionsToCheck5">5: <input type="checkbox" name="optionsToCheck" id="optionsToCheck5"></label>
      <label for="optionsToCheck6">6: <input type="checkbox" name="optionsToCheck" id="optionsToCheck6"></label>
    </div>
    
    <button type="submit" data-fv-form-submit="1" disabled="disabled">Submit</button>
  </form>
</body>
```

See a [live example](../examples/checkbox-inputs).
