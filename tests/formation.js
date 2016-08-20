'use strict';

const stampit = require('stampit');
const $ = require('jquery');

describe('The `Formation` object', function() {
  describe('when the DOM is set up correctly', function() {
    it('readies the DOM with Formation', function() {
      let $text = $('<input type="text" data-fv-required="1" value="blarg" />');
      let $checkbox = $('<input type="checkbox" data-fv-required="1" value="blarg" />');
      let $radio = $('<input type="radio" data-fv-required="1" value="blarg" />');
      let $select = $('<select data-fv-required="1"><option value="test">blarg</option></select>');
      let $submit = $('<button type="submit" data-fv-form-submit="1" />');
      let $form = $('<form data-formation="1" id="form1"></form>');
      let $body = $('body');
      $form.append($text).append($checkbox).append($radio).append($select).append($submit);
      $body.append($form);

      let formation = require('../src/formation');
      formation.initForm($form);
      formation.initForm($('<form data-formation="1" id="form2"></form>'));

      $body.trigger('keyup.formation').trigger('keypress.formation');
      $form.parent().trigger('touchstart.formation');

      $text.trigger('focus').trigger('keyup').trigger('change');
      $checkbox.trigger('click').trigger('change');
      $radio.trigger('click').trigger('change');
      $select.trigger('change');
      $form.trigger('submit');
    });
  });
});
