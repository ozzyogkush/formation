'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const eventEmitterStamp = require('../../src/utilities/node-event-emitter-stamp');
const formComponentStamp = require('../../src/components/form');

describe('Objects created using the `formComponentStamp`', function() {
  let formComponent;
  let formComponentMock;
  beforeEach(function() {
    formComponent = formComponentStamp({ nodeEvents : eventEmitterStamp() });
    formComponentMock = sinon.mock(formComponent);
  });

  describe('`shouldBodyKeyPressEventsProgress()`', function() {
    describe('the submit button is null', function() {
      it('should return false', function() {
        formComponentMock.expects('getSubmitButton').once().returns(null);
        assert.isFalse(formComponent.shouldBodyKeyPressEventsProgress());
        formComponentMock.verify();
      });
    });
    describe('the submit button is not null but is not linked to a DOM element', function() {
      it('should return false', function() {
        let submitButton = {exists : function(){}};
        let mockSubmitBtn = sinon.mock(submitButton);

        formComponentMock.expects('getSubmitButton').twice().returns(submitButton);
        mockSubmitBtn.expects('exists').once().returns(false);
        assert.isFalse(formComponent.shouldBodyKeyPressEventsProgress());

        formComponentMock.verify();
        mockSubmitBtn.verify();
      });
    });
    describe('the submit button is not null and is linked to a DOM element', function() {
      it('should return true', function() {
        let submitButton = {exists : function(){}};
        let mockSubmitBtn = sinon.mock(submitButton);

        formComponentMock.expects('getSubmitButton').twice().returns(submitButton);
        mockSubmitBtn.expects('exists').once().returns(true);
        assert.isTrue(formComponent.shouldBodyKeyPressEventsProgress());

        formComponentMock.verify();
        mockSubmitBtn.verify();
      });
    });
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
        let $form = $('<form></form>').data('formation-form', formComponent);
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
          it('should catch the error from `getFormComponentOfCurrentElement()` and throw an error about missing required fields', function() {
            let $form = $('<form></form>');
            let typeErrMsg = 'The `formation-form` data object is not set.';
            let err = new TypeError(typeErrMsg);
            formComponentMock.expects('initialized').once().returns(false);
            formComponentMock.expects('getFormComponentOfCurrentElement').once().withArgs($form).throws(err);
            formComponentMock.expects('findRequiredFields').once().withArgs($form).returns($());
            formComponentMock.expects('info').once().withArgs(err);

            assert.throws(
              () => {formComponent.initForm($form);},
              Error,
              'No required fields found, cannot proceed.'
            );

            formComponentMock.verify();
          });
        });
      });
      describe('required fields are present in the form', function() {
        it('sets the optional fields and initializes their validity flags, and sets the form buttons (submit, preview, etc)', function() {
          let $form = $('<form></form>');
          let $formMock = sinon.mock($form);
          let $requiredFields = $('<input type="text" />').add($('<input type="text" />'));
          let $requiredFieldsMock = sinon.mock($requiredFields);
          let $optionalFields = $('<input type="checkbox" />').add($('<select><option value="0">nope</option></select>'));
          let $optionalFieldsMock = sinon.mock($optionalFields);
          let $submitButton = $('<button data-submit="1"></button>');
          formComponentMock.expects('initialized').once().returns(false);
          formComponentMock.expects('getFormComponentOfCurrentElement').once().withArgs($form).returns(null);
          formComponentMock.expects('findRequiredFields').once().withArgs($form).returns($requiredFields);
          formComponentMock.expects('findOptionalFields').once().withArgs($form).returns($optionalFields);
          $requiredFieldsMock.expects('attr').once().withArgs('data-valid', 0).returns($requiredFields);
          $optionalFieldsMock.expects('attr').once().withArgs('data-valid', 0).returns($optionalFields);
          $formMock.expects('data').once().withArgs('formation-form', formComponent);
          formComponentMock.expects('findSubmitButton').once().withArgs($form).returns($submitButton);
          formComponentMock.expects('findPreviewButton').once().withArgs($form).returns($());

          assert.equal(formComponent.initForm($form), formComponent);

          $requiredFieldsMock.verify();
          $optionalFieldsMock.verify();
          $formMock.verify();
          formComponentMock.verify();
        });
      });
    });
  });

  describe('`getSubmitButton()`', function() {
    describe('it has not been set', function() {
      it('should return null', function() {
        assert.isNull(formComponent.getSubmitButton());
      });
    });
  });

  describe('`getPreviewButton()`', function() {
    describe('it has not been set', function() {
      it('should return null', function() {
        assert.isNull(formComponent.getPreviewButton());
      });
    });
  });
});
