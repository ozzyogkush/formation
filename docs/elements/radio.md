---
title: Formation - Supported Radio Input Rules
description: Supported rules and basic example of radio form inputs
---

# Supported Element Types:

    input[type="radio"]

# Default Available rules:

>_Note: In the DOM, all rules are prefixed by `data-fv`. The `default` rule does not require an attribute
>on the DOM element. All rules are processed with `AND` logic and thus validation will fail if any 
>requested rule fails._

>_Note: Radio rules are applied to elements with the same **`name`** attribute. Such input elements are typically grouped
>into a container element. This element is the one that receives the **`required`** and any rule attributes. It is also
>here that you specify the **`name`** attribute of the radios being validated, EG, if the name of your inputs are 
>**`someSetOfInputs`**, your attribute on the container would be:_
>
>        data-fv-group-container="someSetOfInputs"

- **radio** (See [`./src/rules/radio-default-rules.js`](https://github.com/ozzyogkush/formation/blob/master/src/rules/radio-default-rules.js))
  - `default` : At least one radio button in the set must be checked

# Basic Example:

```html
<head>
  <script type="text/javascript" src="vendor.min.js"></script>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
<body>
  <form data-formation="1">
    <div data-fv-required="1" data-fv-group-container="oneToChoose">
      <label for="oneToChoose1">1: <input type="radio" name="oneToChoose" id="oneToChoose1"></label>
      <label for="oneToChoose2">2: <input type="radio" name="oneToChoose" id="oneToChoose2"></label>
      <label for="oneToChoose3">3: <input type="radio" name="oneToChoose" id="oneToChoose3"></label>
    </div>
    <button type="submit" data-fv-form-submit="1" disabled="disabled">Submit</button>
  </form>
</body>
```

See a [live example](../examples/radio-inputs).
