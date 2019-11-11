"use strict";

$(function() {
  /* Add Money Card animation */
  $(document).on('focus', '.SecNumb', function () {
    $(".BoxTarjeta").addClass("rotateCard");
    $(".DataTarjeta").hide(0);
    $(".secureTarjeta").show(700);
  });

  $(document).on('focusout', '.SecNumb', function () {
    $(".BoxTarjeta").removeClass("rotateCard");
    $(".DataTarjeta").show(100);
    $(".secureTarjeta").hide(0);
  });
  /* End Add Money Card animation */
});
