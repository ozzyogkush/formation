'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');

const textDefaultRulesStamp = require('../../src/rules/text-default-rules');

describe('Objects created using the `textDefaultRulesStamp`', function() {
  let textRulesSet;
  beforeEach(function() {
    textRulesSet = textDefaultRulesStamp();
  });
  describe('`dataFvDefault()`', function() {
    describe('checks that the trimmed value is not empty', function() {
      describe('when it is', function() {
        it('returns true', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-required', 1);
          input.value = 'some value    ';
          assert.equal(textRulesSet.dataFvDefault(input, 'data-fv-default'), true);
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-required', 1);
          input.value = '      ';
          assert.equal(textRulesSet.dataFvDefault(input, 'data-fv-default'), false);
        });
      });
    });
  });

  describe('`dataFvMinLength()`', function() {
    describe('checks that length the trimmed value is greater or equal to the value specified in the attribute', function() {
      describe('when it is', function() {
        it('returns true', function () {
          const input = document.createElement('textarea');
          input.setAttribute('data-fv-min-length', 10);
          input.value = 'some value';
          assert.equal(textRulesSet.dataFvMinLength(input, 'data-fv-min-length'), true);
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          const input = document.createElement('textarea');
          input.setAttribute('data-fv-min-length', 10);
          input.value = 'fails';
          assert.equal(textRulesSet.dataFvMinLength(input, 'data-fv-min-length'), false);
        });
      });
    });
  });

  describe('`dataFvMaxLength()`', function() {
    describe('checks that length the trimmed value is less than or equal to the value specified in the attribute', function() {
      describe('when it is', function() {
        it('returns true', function () {
          const input = document.createElement('textarea');
          input.setAttribute('data-fv-max-length', 10);
          input.value = 'below 10';
          assert.equal(textRulesSet.dataFvMaxLength(input, 'data-fv-max-length'), true);
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          const input = document.createElement('textarea');
          input.setAttribute('data-fv-max-length', 10);
          input.value = 'way above 10 chars';
          assert.equal(textRulesSet.dataFvMaxLength(input, 'data-fv-max-length'), false);
        });
      });
    });
  });

  describe('`dataFvFormat()`', function() {
    describe('checks that value checked using the appropriate format checker', function() {
      describe('when the format is `zip`', function() {
        it('passes when only the 5 part is specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'zip');
          input.value = '12345';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
        it('passes when both the 5 and 4 parts are specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'zip');
          input.value = '12345-1234';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
      });

      describe('when the format is `zip5`', function() {
        it('passes when only the 5 part is specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'zip5');
          input.value = '12345';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
      });

      describe('when the format is `zip4`', function() {
        it('passes when only the 4 part is specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'zip4');
          input.value = '1234';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
      });

      describe('when the format is `email`', function() {
        it('passes when only a valid email address is specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'email');
          input.value = 'good.email@address.com';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
        it('fails when an invalid email address is specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'email');
          input.value = 'bad';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), false);
        });
      });

      describe('when the format is `phone`', function() {
        it('passes when only a valid phone number is specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'phone');
          input.value = '(123) 456-7890';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
        it('fails when an invalid phone number is specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'phone');
          input.value = '(123456-7890';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), false);
        });
      });

      describe('when the format is `phone-multi`', function() {
        it('passes when the value passes one of a number of valid phone formats', function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'phone-multi');
          input.value = '123-456-7890';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
        it('fails when an invalid phone number is specified', function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', 'phone-multi');
          input.value = '123456789';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), false);
        });
      });

      describe('when the format is a valid regular expression', function() {
        it('checks the elements value against the specified regex', function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', "/^(\\w{3}) (\\d*)$/");
          input.value = 'abc 567835';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
      });

      describe('when the format is not a valid regular expression', function() {
        it('simply returns true since there is nothing to match against', function() {
          // looks like a regex, but it isn't
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-format', "gibberish\d*)$/");
          input.value = 'abc 567835';
          assert.equal(textRulesSet.dataFvFormat(input, 'data-fv-format'), true);
        });
      });
    });
  });

  describe('`dataFvMatchField()`', function() {
    describe('when the element to match against is not in the DOM', function() {
      it('throws an exception', function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('data-fv-match-field', 'other-field');
        input.value = 'abc 567835';
        assert.throws(
          () => textRulesSet.dataFvMatchField(input, 'data-fv-match-field'),
          Error,
          'Expected an element with an ID equal to "other-field" on this form'
        );
      });
    });
    describe('when the element to match against is in the DOM', function() {
      describe('when the `data-fv-required` flag is not present on the other field', function() {
        it('checks that the values match', function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-match-field', 'other-field');
          input.value = 'some string with text';

          const someOtherElement = document.createElement('input');
          someOtherElement.setAttribute('type', 'text');
          someOtherElement.setAttribute('id', 'other-field');
          someOtherElement.value = 'some string with text';

          document.body.appendChild(input);
          document.body.appendChild(someOtherElement);
          assert.equal(textRulesSet.dataFvMatchField(input, 'data-fv-match-field'), true);

          someOtherElement.value = 'some string with different text';
          assert.equal(textRulesSet.dataFvMatchField(input, 'data-fv-match-field'), false);

          document.body.removeChild(input);
          document.body.removeChild(someOtherElement);
        });
      });
      describe('when the `data-fv-required` flag is present on the other field', function() {
        it('checks that the values match', function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-match-field', 'other-field');
          input.value = 'some string with text';

          const someOtherElement = document.createElement('input');
          someOtherElement.setAttribute('type', 'text');
          someOtherElement.setAttribute('id', 'other-field');
          someOtherElement.setAttribute('data-fv-required', 1);
          someOtherElement.value = 'some string with text';

          document.body.appendChild(input);
          document.body.appendChild(someOtherElement);
          assert.equal(textRulesSet.dataFvMatchField(input, 'data-fv-match-field'), true);

          someOtherElement.value = 'some string with different text';
          assert.equal(textRulesSet.dataFvMatchField(input, 'data-fv-match-field'), false);

          document.body.removeChild(input);
          document.body.removeChild(someOtherElement);
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let input;
    let textRules;
    beforeEach(function() {
      input = document.createElement('input');
      input.setAttribute('type', 'text');
      textRules = textRulesSet.getRules();
    });
    it('should return 5 rules', function() {
      assert.strictEqual(textRules.length, 5);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        input.setAttribute('data-fv-required', 1);

        assert.equal(textRules[0].callback(input, 'data-fv-default'), false);
        input.value = 'good';
        assert.equal(textRules[0].callback(input, 'data-fv-default'), true);
      });
    });

    describe('the second rule', function() {
      it('should call `dataFvMinLength()`', function() {
        input.setAttribute('data-fv-min-length', 4);
        input.value = 'bad';

        assert.equal(textRules[1].callback(input, 'data-fv-min-length'), false);
        input.value = 'good';
        assert.equal(textRules[1].callback(input, 'data-fv-min-length'), true);
      });
    });

    describe('the third rule', function() {
      it('should call `dataFvMaxLength()`', function() {
        input.setAttribute('data-fv-max-length', 4);
        input.value = 'too many';

        assert.equal(textRules[2].callback(input, 'data-fv-max-length'), false);
        input.value = 'good';
        assert.equal(textRules[2].callback(input, 'data-fv-max-length'), true);
      });
    });

    describe('the fourth rule', function() {
      it('should call `dataFvFormat()`', function() {
        input.setAttribute('data-fv-format', 'zip');
        input.value = 'bad';

        assert.equal(textRules[3].callback(input, 'data-fv-format'), false);
        input.value = '12345';
        assert.equal(textRules[3].callback(input, 'data-fv-format'), true);
      });
    });

    describe('the fifth rule', function() {
      it('should call `dataFvMatchField()`', function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('data-fv-match-field', 'other-field');
        input.value = 'some string with text';

        const someOtherElement = document.createElement('input');
        someOtherElement.setAttribute('type', 'text');
        someOtherElement.setAttribute('id', 'other-field');
        someOtherElement.value = 'some string with different text';

        document.body.appendChild(input);
        document.body.appendChild(someOtherElement);
        assert.equal(textRules[4].callback(input, 'data-fv-match-field'), false);

        someOtherElement.value = 'some string with text';
        assert.equal(textRules[4].callback(input, 'data-fv-match-field'), true);

        document.body.removeChild(input);
        document.body.removeChild(someOtherElement);
      });
    });
  });
});
