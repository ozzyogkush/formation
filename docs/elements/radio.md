---
title: Formation | Supported Radio Input Rules
description: Supported rules and basic example of radio form inputs for Formation form validation library
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

# Other Options:

## Linked Input

The linked input option allows the user to link the visibility and validation checking of a separate element with the checked state
 of a single radio element. To use, add the attribute `data-fv-linked-input` to the radio element. Its value should be the ID of the element that
 you want to manage. This can be useful when you only care about another input element when the user indicates a specific option.
 
>_Note: The linked input may be part of a form group which contains other elements that need to be shown or hidden along 
> with the linked element. If that's the case, the 'hidden' class only applies to the form group. If that's not the case,
>the linked element itself applies the 'hidden' class. (See [`domNavigationStamp.getLinkedElement()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L385))._

# Example:

See a [live example](../examples/radio-inputs).

```html
<head>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
<body>
  <form data-formation="1">
    <div
      data-fv-required="1" 
      data-fv-group-container="favoriteLanguage">
      <h2>Favorite Language:</h2>
      <label for="javascript">
        JavaScript: <input type="radio" name="favoriteLanguage" id="javascript" value="javascript">
      </label>
      <label for="c++">
        C++: <input type="radio" name="favoriteLanguage" id="c++" value="c++">
      </label>
      <label for="ruby">
        Ruby: <input type="radio" name="favoriteLanguage" id="ruby" value="ruby">
      </label>
      <label for="other">
        Other (please specify): <input type="radio" data-fv-linked-input="otherLanguage" name="favoriteLanguage" id="other" value="other">
        <div class="form-group hidden">
          Other Language: 
          <input
            type="text"
            id="otherLanguage"
            data-fv-required="1"
            class="disabled"
            disabled="disabled" />
        </div>
      </label>
    </div>
    
    <button 
      type="submit" 
      data-fv-form-submit="1" 
      disabled="disabled">Submit</button>
  </form>
</body>
```
