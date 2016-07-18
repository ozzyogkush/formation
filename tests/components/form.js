'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const formComponentStamp = require('../../src/components/form');

describe('Objects created using the `formComponentStamp`', function() {
  let formComponent;
  let formComponentMock;
  beforeEach(function() {
    formComponent = formComponentStamp();
    formComponentMock = sinon.mock(formComponent);
  });

  describe('`isFormComponent()`', function() {
    it('should return true', function() {
      assert.isTrue(formComponent.isFormComponent());
    });
  });

  describe('`initialized()`', function() {
    describe('it has not been initialized', function() {
      it('should return false', function() {
        assert.isFalse(formComponent.initialized());
      });
    });
  });

  describe('`initForm()`', function() {
    describe('it has been initialized', function() {
      it('should log that it was already initialized and return itself', function() {
        let $form = $('<form></form>');
        formComponentMock.expects('initialized').once().returns(false);
        formComponentMock.expects('getFormComponentOfCurrentElement').once().withArgs($form).returns(formComponent);
        formComponentMock.expects('initialized').once().returns(true);
        formComponentMock.expects('warn').once().withArgs('This `formComponent` is already initialized, skipping.');
        assert.equal(formComponent.initForm($form), formComponent);

        formComponentMock.verify();
      });
    });
    describe('it has not been initialized', function() {
      describe('no required fields are present in the form', function() {
        describe('the `$form` element has no `formation-form` object to check', function() {
          it('should catch the error from `getFormComponentOfCurrentElement()` but proceed', function() {
            let $form = $('<form></form>');
            let typeErrMsg = 'The `formation-form` data object is not set.';
            let err = new TypeError(typeErrMsg);
            formComponentMock.expects('initialized').once().returns(false);
            formComponentMock.expects('getFormComponentOfCurrentElement').once().withArgs($form).throws(err);
            formComponentMock.expects('error').once().withArgs(err);

            assert.throws(
              () => {formComponent.initForm($form);},
              Error,
              'No required fields found, cannot proceed.'
            );

            formComponentMock.verify();
          });
        });
        it('should throw an error', function() {
          let $form = $('<form></form>');
          formComponentMock.expects('initialized').once().returns(false);
          formComponentMock.expects('getFormComponentOfCurrentElement').once().withArgs($form).returns(null);
          formComponentMock.expects('findRequiredFields').once().withArgs($form).returns($());

          assert.throws(
            () => {formComponent.initForm($form);},
            Error,
            'No required fields found, cannot proceed.'
          );

          formComponentMock.verify();
        });
      });
      describe('required fields are present in the form', function() {
        it('should look for optional fields');
        it('should set the form buttons (submit, preview, etc)');
        it('should initialize the required and optional fields validity flags');
      });
    });
  });
});
