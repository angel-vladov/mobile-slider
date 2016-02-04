/*
 * 
 * 
 *
 * Copyright (c) 2016 Angel Vladov
 * Licensed under the MIT license.
 */
(function ($) {
  $.fn.mobileSlider = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('mobileSlider' + i);
    });
  };
}(jQuery));
