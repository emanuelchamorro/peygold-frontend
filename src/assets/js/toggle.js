"use strict";

$(function() {
  /* Toggle feature */
  $(document).on('click', '.slide-toggle', function () {
    let _this = $(this);
    let target = _this.data('el-target');

    if (target) {
      target = $(target);
      $(target).slideToggle();
      return;
    } else {
      target = $('.slide-toggle-content', _this.parent());
    }

    if (target) {
      if (!target.is(':visible')) {
        $('.slide-toggle-content').hide();
        setTimeout(function () {
          $(target).slideToggle();
        }, 100)
      }
    }
  });

  $(document).on('click', function () {
    $('.slide-toggle-content:visible').slideToggle();
  });
  /* Toggle feature */
});
