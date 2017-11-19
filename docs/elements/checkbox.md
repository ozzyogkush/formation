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

# Other Options:

## Linked Input

The linked input option allows the user to link the visibility and validation checking of a separate element with the checked state
 of a single checkbox. To use, add the attribute `data-fv-linked-input` to the checkbox. Its value should be the ID of the element that
 you want to manage. This can be useful when you only care about another input element when the user indicates a specific option.
 
>_Note: The linked input may be part of a form group which contains other elements that need to be shown or hidden along 
> with the linked element. If that's the case, the 'hidden' class only applies to the form group. If that's not the case,
>the linked element itself applies the 'hidden' class. (See [`domNavigationStamp.getLinkedElement()`](https://github.com/ozzyogkush/formation/blob/master/src/utilities/dom-navigation.js#L385))._

# Example:

See a [live example](../examples/checkbox-inputs).

```html
<head>
  <script type="text/javascript" src="formation.min.js"></script>
</head>
<body>
  <form data-formation="1">
    <div 
      data-fv-required="1" 
      data-fv-min-selected="1" 
      data-fv-max-selected="2" 
      data-fv-group-container="favoriteAnimals">
      <label for="dogs">
        Dogs: <input type="checkbox" name="favoriteAnimals" id="dogs" value="dogs">
      </label>
      <label for="cats">
        Cats: <input type="checkbox" name="favoriteAnimals" id="cats" value="cats">
      </label>
      <label for="birds">
        Birds: <input type="checkbox" name="favoriteAnimals" id="birds" value="birds">
      </label>
      <label for="cats">
        Other (please specify): <input type="checkbox" data-fv-linked-input="otherAnimal" name="favoriteAnimals" id="other" value="other">
        <div class="form-group hidden">
          Other Animal: 
          <input
            type="text"
            id="otherAnimal"
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
