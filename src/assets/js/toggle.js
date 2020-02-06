"use strict";

$(function () {
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

  /* Toggle  menu */
  $(document).on('click', '.dropdown', function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
  });

  $(document).on('focusout', '.dropdown', function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
  });

  $(document).on('click', '.dropdown .dropdown-menu li', function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
  });
  $(document).on('click', '.dropdown-menu li', function () {
    var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
      msg = '<span class="msg">Hidden input value: ';
    $('.msg').html(msg + input + '</span>');
  });
  /* Toggle  menu */
  $(document).on('click', '.open-help', function () {
    $('div[id="lightbox-1"]').css('opacity', '1');
    $('div[id="lightbox-1"]').css('visibility', 'visible');
    $('div[id="lightbox-1"]').css('z-index', '20');

  });

  /* Toggle help */
  $(document).on('click', '.option-link', function () {
    var id = $(this).attr('id');
    var idSplit = id.split('-');
    $('div[id="lightbox-'+idSplit[1]+'"]').css('opacity', '1');
    $('div[id="lightbox-'+idSplit[1]+'"]').css('visibility', 'visible');
    $('div[id="lightbox-'+idSplit[1]+'"]').css('z-index', '20');

  });

  $(document).on('click', '.open-help', function () {
    $('div[id="lightbox-1"]').css('opacity', '1');
    $('div[id="lightbox-1"]').css('visibility', 'visible');
    $('div[id="lightbox-1"]').css('z-index', '20');

  });
  
/*Loans btn options*/		

$(document).on('click', '.white-btn-options', function () {
  
  $(this).toggleClass('active');
  $(this).siblings().removeClass('active')

})


  /*filtrar ordenar*/		
  $(".filtrarOrdenar").click(function() {		
    $(this).toggleClass("activefilter");		
    $(".DownFilters").slideToggle(300);		
  });		
  /*Fin de filtrar ordenar*/

  $(".stateDrop").click(function() {		
    $(this).closest(".boxSelect").toggleClass("active");		
     $(this)		
       .find("i")		
       .toggleClass("rotate");		
     
   $(this).closest(".boxSelect").find(".stateDown").slideToggle(300);	    	
   });		
   $(".dateDrop").click(function() {		
     $(this).closest(".boxSelect").toggleClass("active");		
     $(this)		
       .find("i")		
       .toggleClass("rotate");		
     $(".downDate").slideToggle(300);		
   });	
   
   
   /* Fin de Select Box 2 */

  

  $(document).on('click', '.lightbox__close', function () {
    $('div[id="lightbox-1"]').css('opacity', '');
    $('div[id="lightbox-1"]').css('visibility', 'hidden');
    $('div[id="lightbox-1"]').css('z-index', '');

  });


  /* opacity: 1;
    visibility: visible;
    z-index: 20;*/

});
