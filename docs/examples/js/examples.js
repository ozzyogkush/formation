Formation.setDebug(true);
var $body = $(document.body);

$('form').each(function() {
  var $form = $(this);
  var $formValid = $('#form-valid');
  $form.on(Formation.getValidityChangedEventName(), function() {
    if (parseInt($form.attr('data-fv-valid')) === 1) {
      $formValid.html('FORM VALID');
      $body.removeClass('invalid').addClass('valid');
    }
    else {
      $formValid.html('FORM NOT VALID');
      $body.removeClass('valid').addClass('invalid');
    }
  });
  Formation.findRequiredFields($form).add(Formation.findOptionalFields($form))
    .on(Formation.getValidityChangedEventName(), function() {
      var $this = $(this);
      if (parseInt($this.attr('data-fv-valid')) === 1) {
        $this.closest('.rule-example').removeClass('invalid').addClass('valid');
        $this.next('div.status').html('FIELD VALID');
      }
      else {
        $this.closest('.rule-example').removeClass('valid').addClass('invalid');
        $this.next('div.status').html('FIELD NOT VALID');
      }
    })
    .after($('<div></div>').addClass('status'));
});
