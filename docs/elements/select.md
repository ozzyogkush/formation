---
title: Formation | Supported Select Input Rules
description: Supported rules and basic example of select form inputs for Formation form validation library
---

# Supported Element Types:

    select

# Default Available rules:

>_Note: In the DOM, all rules are prefixed by `data-fv`. The `default` rule does not require an attribute
>on the DOM element. All rules are processed with `AND` logic and thus validation will fail if any 
>requested rule fails._

- **select** (See [`./src/rules/select-default-rules.js`](https://github.com/ozzyogkush/formation/blob/master/src/rules/select-default-rules.js))
  - `default` : The trimmed value of the selected option must not be empty

# Example:

See a [live example](../examples/select-boxes).

```html
<head>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
<body>
  <form data-formation="1">
    <select name="someChoices" data-fv-required="1">
      <option value="">&mdash; PICK ONE &mdash;</option>
      <option value="1">Some</option>
      <option value="2">Good</option>
      <option value="3">Values</option>
    </select>
    
    <button 
      type="submit" 
      data-fv-form-submit="1" 
      disabled="disabled">Submit</button>
  </form>
</body>
```
