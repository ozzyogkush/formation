Formation.setDebug(true);

var formValid = document.getElementById('form-valid');
Array.from(document.getElementsByTagName('form')).forEach(function(form) {
  form.addEventListener(Formation.getValidityChangedEventName(), function() {
    if (parseInt(form.getAttribute('data-fv-valid')) === 1) {
      formValid.innherHTML = 'FORM VALID';
      document.body.classList.remove('invalid');
      document.body.classList.add('valid');
    }
    else {
      formValid.innherHTML = 'FORM NOT VALID';
      document.body.classList.remove('valid');
      document.body.classList.add('invalid');
    }
  });

  Array
    .from(Formation.findRequiredFields(form))
    .concat(Array.from(Formation.findOptionalFields(form)))
    .forEach(function(field) {
      field.addEventListener(Formation.getValidityChangedEventName(), function(event) {
        var ruleExampleContainer = Formation.closest(event.target, '.rule-example');

        var elementToCheck = Formation.getCheckboxOrRadioContainer(event.target);
        if (elementToCheck === null) {
          elementToCheck = event.target;
        }
        if (parseInt(elementToCheck.getAttribute('data-fv-valid')) === 1) {
          ruleExampleContainer.classList.remove('invalid');
          ruleExampleContainer.classList.add('valid');
          elementToCheck.nextSibling.innerHTML = 'FIELD VALID';
        }
        else {
          ruleExampleContainer.classList.remove('valid');
          ruleExampleContainer.classList.add('invalid');
          elementToCheck.nextSibling.innerHTML = 'FIELD INVALID';
        }
      });

      var statusDiv = document.createElement('div');
      statusDiv.classList.add('status')
      field.insertAdjacentElement('afterend', statusDiv);
    })
});
