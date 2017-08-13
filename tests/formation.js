'use strict';

const assert = require('chai').assert;
const stampit = require('stampit');

describe('The `Formation` object', function() {
  describe('when the DOM is set up correctly', function() {
    it('readies the DOM with Formation', function() {
      // Set up a form and add it to the DOM
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);
      const text = document.createElement('input');
      text.setAttribute('type', 'text');
      text.setAttribute('data-fv-required', 1);
      text.value = 'blarg';
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'checkbox');
      checkbox.setAttribute('checked', 'checked');
      checkbox.value = 'blarg';
      const checkboxContainer = document.createElement('div');
      checkboxContainer.setAttribute('data-fv-group-container', 'checkbox');
      checkboxContainer.setAttribute('data-fv-required', 1);
      const radio = document.createElement('input');
      radio.setAttribute('type', 'radio');
      radio.setAttribute('name', 'radio');
      radio.setAttribute('checked', 'checked');
      radio.value = 'blarg';
      const radioContainer = document.createElement('div');
      radioContainer.setAttribute('data-fv-group-container', 'radio');
      radioContainer.setAttribute('data-fv-required', 1);
      const select = document.createElement('select');
      select.setAttribute('data-fv-required', 1);
      const option1 = document.createElement('option');
      option1.value = '';
      const option2 = document.createElement('option');
      option2.value = 'test';
      option2.selected = true;
      select.appendChild(option1);
      select.appendChild(option2);
      const submit = document.createElement('button');
      submit.setAttribute('data-fv-form-submit', 1);

      checkboxContainer.appendChild(checkbox);
      radioContainer.appendChild(radio);
      form.appendChild(text);
      form.appendChild(checkboxContainer);
      form.appendChild(radioContainer);
      form.appendChild(select);
      form.appendChild(submit);
      document.body.appendChild(form);

      // Create a Formation object and initiate the DOMContentLoaded event to enter Formation.
      const formation = require('../src/formation');
      const event = document.createEvent('Event');
      event.initEvent('DOMContentLoaded', true, true);
      window.document.dispatchEvent(event);

      assert.equal(formation.getForms().size, 1);
      assert.notEqual(formation.getForms().get(form), null);
      assert.equal(formation.getForms().get(form).isFormComponent(), true);

      assert.equal(document.querySelectorAll('[data-fv-valid="1"]').length, 5);
      assert.equal(form.getAttribute('data-fv-valid'), 1);
      assert.equal(submit.hasAttribute('disabled'), false);
      assert.equal(submit.classList.contains('disabled'), false);
    });
  });
});
