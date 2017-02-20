---
title: Formation - Supported Text Input Rules
description: Supported rules and basic example of text-based form inputs
---

# Supported Element Types:

    input[type="text"]
    input[type="number"]
    input[type="email"]
    input[type="password"]
    textarea

# Default Available rules:

>_Note: In the DOM, all rules are prefixed by `data-fv`. The `default` rule does not require an attribute
>on the DOM element. All rules are processed with `AND` logic and thus validation will fail if any 
>requested rule fails._

- **text** (See [`./src/rules/text-default-rules.js`](https://github.com/ozzyogkush/formation/blob/master/src/rules/text-default-rules.js))
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

# Basic Example:

```html
<head>
  <script type="text/javascript" src="vendor.min.js"></script>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
<body>
  <form data-formation="1">
    <input type="text" name="name" id="name" data-fv-required="1" data-fv-min-length="5" data-fv-max-length="15" />
    <input type="text" name="email" id="email" data-fv-required="1" data-fv-format="email" />
    <button type="submit" data-fv-form-submit="1" disabled="disabled">Submit</button>
  </form>
</body>
```
