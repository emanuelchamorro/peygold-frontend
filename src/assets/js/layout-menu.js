"use strict";

$(function() {
  /* Add Toggle menu */
  $(document).on('click', '.main-menu-toggle', function () {
    $("#sidebar-container").toggleClass("sidebar-collapse");
    $("#sidebar-wrapper").toggleClass("sidebar-collapse");
    $("#top-navbar").toggleClass("top-navbar-extended");
    $("#secondary-nav").toggleClass("top-navbar-extended");
    $("#footer").toggleClass("top-navbar-extended");
  });
  /* Rotate Chevron right*/
  
  $(document).on('click', '.sidebar-link', function (){
    $(this).find('.chevron-right').toggleClass("chevron-show-accordion");

  })
});



