'use strict';

const $ = require('jquery');
const assert = require('chai').assert;
const sinon = require('sinon');

const textDefaultRulesStamp = require('../../src/rules/text-default-rules');

describe('Objects created using the `textDefaultRulesStamp`', function() {
  let textRulesSet;
  let textRulesSetMock;
  beforeEach(function() {
    textRulesSet = textDefaultRulesStamp();
    textRulesSetMock = sinon.mock(textRulesSet);
  });
  describe('`dataFvDefault()`', function() {
    describe('checks that the trimmed value is not empty', function() {
      describe('when it is', function() {
        it('returns true', function () {
          let $element = $('<input type="text" value="some value"/>');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('val').once().returns('some value   ');
          assert.isTrue(textRulesSet.dataFvDefault($element, 'data-fv-default'));

          $elementMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $element = $('<input type="text" value="    "/>');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('val').once().returns('   ');
          assert.isFalse(textRulesSet.dataFvDefault($element, 'data-fv-default'));

          $elementMock.verify();
        });
      });
    });
  });

  describe('`dataFvMinLength()`', function() {
    describe('checks that length the trimmed value is greater or equal to the value specified in the attribute', function() {
      describe('when it is', function() {
        it('returns true', function () {
          let $element = $('<textarea data-fv-min-length="10">some value</textarea>');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-min-length').returns('10');
          $elementMock.expects('val').once().returns('some value');
          assert.isTrue(textRulesSet.dataFvMinLength($element, 'data-fv-min-length'));

          $elementMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $element = $('<textarea data-fv-min-length="10">fails</textarea>');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-min-length').returns('10');
          $elementMock.expects('val').once().returns('fails');
          assert.isFalse(textRulesSet.dataFvMinLength($element, 'data-fv-min-length'));

          $elementMock.verify();
        });
      });
    });
  });

  describe('`dataFvMaxLength()`', function() {
    describe('checks that length the trimmed value is less than or equal to the value specified in the attribute', function() {
      describe('when it is', function() {
        it('returns true', function () {
          let $element = $('<textarea data-fv-max-length="10">below 10</textarea>');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-max-length').returns('10');
          $elementMock.expects('val').once().returns('below 10');
          assert.isTrue(textRulesSet.dataFvMaxLength($element, 'data-fv-max-length'));

          $elementMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $element = $('<textarea data-fv-max-length="10">way above 10 chars</textarea>');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-max-length').returns('10');
          $elementMock.expects('val').once().returns('way above 10 chars');
          assert.isFalse(textRulesSet.dataFvMaxLength($element, 'data-fv-max-length'));

          $elementMock.verify();
        });
      });
    });
  });

  describe('`dataFvFormat()`', function() {
    describe('checks that value checked using the appropriate format checker', function() {
      describe('when the format is `zip`', function() {
        it('passes when only the 5 part is specified', function () {
          let $element = $('<input type="text" data-fv-format="zip" value="12345" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('zip');
          $elementMock.expects('val').once().returns('12345');
          textRulesSetMock.expects('isValidZip').once().withArgs('12345').returns(true);
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
        it('passes when both the 5 and 4 parts are specified', function () {
          let $element = $('<input type="text" data-fv-format="zip" value="12345-1234" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('zip');
          $elementMock.expects('val').once().returns('12345-1234');
          textRulesSetMock.expects('isValidZip').once().withArgs('12345-1234').returns(true);
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
      });

      describe('when the format is `zip5`', function() {
        it('passes when only the 5 part is specified', function () {
          let $element = $('<input type="text" data-fv-format="zip5" value="12345" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('zip5');
          $elementMock.expects('val').once().returns('12345');
          textRulesSetMock.expects('isValidZip').once().withArgs('12345', 5).returns(true);
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
      });

      describe('when the format is `zip4`', function() {
        it('passes when only the 4 part is specified', function () {
          let $element = $('<input type="text" data-fv-format="zip4" value="1234" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('zip4');
          $elementMock.expects('val').once().returns('1234');
          textRulesSetMock.expects('isValidZip').once().withArgs('1234', 4).returns(true);
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
      });

      describe('when the format is `email`', function() {
        it('passes when only a valid email address is specified', function () {
          let $element = $('<input type="text" data-fv-format="email" value="good.email@address.com" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('email');
          $elementMock.expects('val').once().returns('good.email@address.com');
          textRulesSetMock.expects('isValidEmail').once().withArgs('good.email@address.com').returns(true);
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
        it('fails when an invalid email address is specified', function () {
          let $element = $('<input type="text" data-fv-format="email" value="bad" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('email');
          $elementMock.expects('val').once().returns('bad');
          textRulesSetMock.expects('isValidEmail').once().withArgs('bad').returns(false);
          assert.isFalse(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
      });

      describe('when the format is `phone`', function() {
        it('passes when only a valid phone number is specified', function () {
          let $element = $('<input type="text" data-fv-format="phone" value="(123) 456-7890" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('phone');
          $elementMock.expects('val').once().returns('(123) 456-7890');
          textRulesSetMock.expects('isValidPhone').once().withArgs('(123) 456-7890').returns(true);
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
        it('fails when an invalid phone number is specified', function () {
          let $element = $('<input type="text" data-fv-format="phone" value="(123456-7890" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('phone');
          $elementMock.expects('val').once().returns('(123456-7890');
          textRulesSetMock.expects('isValidPhone').once().withArgs('(123456-7890').returns(false);
          assert.isFalse(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
      });

      describe('when the format is `phone-multi`', function() {
        it('passes when the value passes one of a number of valid phone formats', function() {
          let $element = $('<input type="text" data-fv-format="phone" value="123-456-7890" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('phone-multi');
          $elementMock.expects('val').once().returns('123-456-7890');
          textRulesSetMock.expects('isValidPhone').once().withArgs('123-456-7890', true).returns(true);
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
        it('fails when an invalid phone number is specified', function () {
          let $element = $('<input type="text" data-fv-format="phone" value="123456789" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns('phone-multi');
          $elementMock.expects('val').once().returns('123456789');
          textRulesSetMock.expects('isValidPhone').once().withArgs('123456789', true).returns(false);
          assert.isFalse(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
          textRulesSetMock.verify();
        });
      });

      describe('when the format is a valid regular expression', function() {
        it('checks the elements value against the specified regex', function() {
          let $element = $('<input type="text" data-fv-format="/^(\\w{3}) (\\d*)$/" value="abc 567835" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns("/^(\\w{3}) (\\d*)$/");
          $elementMock.expects('val').once().returns('abc 567835');
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
        });
      });

      describe('when the format is not a valid regular expression', function() {
        it('simply returns true since there is nothing to match against', function() {
          // looks like a regex, but it isn't
          let $element = $('<input type="text" data-fv-format="gibberish\d*)$/" value="abc 567835" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-format').returns("gibberish\d*)$/");
          $elementMock.expects('val').once().returns('abc 567835');
          assert.isTrue(textRulesSet.dataFvFormat($element, 'data-fv-format'));

          $elementMock.verify();
        });
      });
    });
  });

  describe('`dataFvMatchField()`', function() {
    describe('when the element to match against is not in the DOM', function() {
      it('throws an exception', function() {
        let $element = $('<input type="text" data-fv-match-field="other-field" />');
        let $elementMock = sinon.mock($element);

        $elementMock.expects('attr').once().withArgs('data-fv-match-field').returns("other-field");
        assert.throws(
          () => textRulesSet.dataFvMatchField($element, 'data-fv-match-field'),
          Error,
          'Expected an element with an ID equal to "other-field" on this form'
        );

        $elementMock.verify();
      });
    });
    describe('when the element to match against is in the DOM', function() {
      let $fnMock;
      beforeEach(function() {
        $fnMock = sinon.mock($.fn);
      });
      describe('when the `data-fv-required` flag is not present on the other field', function() {
        it('checks that the values match', function() {
          let $someOtherElement = $('<input id="other-field" />');
          $('body').append($someOtherElement);
          let $element = $('<input type="text" data-fv-match-field="other-field" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-match-field').returns("other-field");
          $elementMock.expects('val').once().returns('some string with text');
          $fnMock.expects('val').once().returns('some string with text');
          $fnMock.expects('attr').once().withArgs('data-fv-required').returns(undefined);
          textRulesSet.dataFvMatchField($element, 'data-fv-match-field');

          $fnMock.verify();
          $elementMock.verify();
        });
      });
      describe('when the `data-fv-required` flag is present on the other field', function() {
        it('checks that the values match', function() {
          let $someOtherElement = $('<input id="other-field" data-fv-required="1" />');
          $('body').append($someOtherElement);
          let $element = $('<input type="text" data-fv-match-field="other-field" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').once().withArgs('data-fv-match-field').returns("other-field");
          $elementMock.expects('val').once().returns('some string with text');
          $fnMock.expects('val').once().returns('some string with text');
          $fnMock.expects('attr').once().withArgs('data-fv-required').returns('1');
          $fnMock.expects('trigger').once().withArgs('set-validation-flag.formation', {elementIsValid : true});
          textRulesSet.dataFvMatchField($element, 'data-fv-match-field');

          $fnMock.verify();
          $elementMock.verify();
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let $element;
    let textRules;
    beforeEach(function() {
      $element = $('<input type="text" />');
      textRules = textRulesSet.getRules();
    });
    it('should return 5 rules', function() {
      assert.strictEqual(textRules.length, 5);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        textRulesSetMock.expects('dataFvDefault').once().withArgs($element, 'data-fv-default');
        assert.strictEqual(textRules[0].callback($element, 'data-fv-default'));

        textRulesSetMock.verify();
      });
    });

    describe('the second rule', function() {
      it('should call `dataFvMinLength()`', function() {
        textRulesSetMock.expects('dataFvMinLength').once().withArgs($element, 'data-fv-min-length');
        assert.strictEqual(textRules[1].callback($element, 'data-fv-min-length'));

        textRulesSetMock.verify();
      });
    });

    describe('the third rule', function() {
      it('should call `dataFvMaxLength()`', function() {
        textRulesSetMock.expects('dataFvMaxLength').once().withArgs($element, 'data-fv-max-length');
        assert.strictEqual(textRules[2].callback($element, 'data-fv-max-length'));

        textRulesSetMock.verify();
      });
    });

    describe('the fourth rule', function() {
      it('should call `dataFvFormat()`', function() {
        textRulesSetMock.expects('dataFvFormat').once().withArgs($element, 'data-fv-format');
        assert.strictEqual(textRules[3].callback($element, 'data-fv-format'));

        textRulesSetMock.verify();
      });
    });

    describe('the fifth rule', function() {
      it('should call `dataFvMatchField()`', function() {
        textRulesSetMock.expects('dataFvMatchField').once().withArgs($element, 'data-fv-match-field');
        assert.strictEqual(textRules[4].callback($element, 'data-fv-match-field'));

        textRulesSetMock.verify();
      });
    });
  });
});
