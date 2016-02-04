(function ($) {
  module('jQuery#mobileSlider', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.mobileSlider(), this.elems, 'should be chainable');
  });

  test('is mobileSlider', function () {
    expect(1);
    strictEqual(this.elems.mobileSlider().text(), 'mobileSlider0mobileSlider1mobileSlider2', 'should be mobileSlider');
  });

}(jQuery));
