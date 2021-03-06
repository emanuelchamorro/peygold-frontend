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
    $('div[id="lightbox-1"]').css('opacity', '0');
    $('div[id="lightbox-1"]').css('visibility', 'hidden');
    $('div[id="lightbox-'+idSplit[1]+'"]').css('opacity', '1');
    $('div[id="lightbox-'+idSplit[1]+'"]').css('visibility', 'visible');
    $('div[id="lightbox-'+idSplit[1]+'"]').css('z-index', '20');

  });


  $(document).on('click', '.open-help', function () {
    $('div[id="lightbox-1"]').css('opacity', '1');
    $('div[id="lightbox-1"]').css('visibility', 'visible');
    $('div[id="lightbox-1"]').css('z-index', '20');

  });
 
  $(document).on('click', '.back-arrow-help', function () {
    
    $('div[id="lightbox-1"]').css('opacity', '1');
    $('div[id="lightbox-1"]').css('visibility', 'visible');
    $('div[id="lightbox-1"]').css('z-index', '20');

  });


  $(document).on('click', '.lightbox__close', function () {
    $('div[class="lightbox"]').css('opacity', '0');
    $('div[class="lightbox"]').css('visibility', 'hidden');
    $('div[class="lightbox"]').css('z-index', '0');

  });
  
  /*Loans btn options*/		

  $(document).on('click', '.white-btn-options', function () {
    
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active')

  });

  /*filtrar ordenar*/	
  $(document).on('click','.filtrarOrdenar',function(){
    $('#inputSelectFilter').val('');
    $('#inputFilter').val('');
    var firstOption = $('.stateDown ul li').first().text();
    $('.boxSelect').find('span').text(firstOption);
    $(this).toggleClass("activefilter");		
    $(".DownFilters").slideToggle(300);	
  });

  $(document).on('click','.FiltrarOrdenar',function(){
    $('#inputSelectFilter').val('');
    $('#inputFilter').val('');
    var firstOption = $('.DownFiltrarOrdenar > .DownExport ul li').first().text();
    $('.DownFiltrarOrdenar .Export').find('span').text(firstOption);
    $(this).toggleClass("activefilter");
    $(".DownFiltrarOrdenar").slideToggle();
  });

 
  /*Fin de filtrar ordenar*/

  $(document).on('click','.stateDrop',function(){
    $(this).closest(".boxSelect").toggleClass("active");		
    $(this).find("i").toggleClass("rotate");     
    $(this).closest(".boxSelect").find(".stateDown").slideToggle(300);	  
  });

  $(document).on('click', '.stateDown ul li', function () {
    console.log('click li',$(this).text());
    $(this).parents('.boxSelect').find('span').html($(this).text());
    //$(this).parents('.boxSelect').find('input').attr('value', $(this).attr('id'));
    $(this).closest(".boxSelect").find(".stateDown").slideToggle(300);
    $(this).closest(".boxSelect").removeClass("active");
  });

  $(document).on("click", function (event) {
    // If the target is not the container or a child of the container, then process
    // the click event for outside of the container.
    if ($(event.target).closest(".boxSelect").length === 0) {
      $(".stateDown").slideUp(300);
      $(".boxSelect").removeClass("active");
    }
  });

  $(document).on('focus','#inputFilter',function(){
    $(".filtrarOrdenar").trigger("click");
  });
  
   /* Fin de Select Box 2 */


   /* Help User Tooltip */

 $(document).on('click', '.btn-user', function () {
    $(".user-tooltip").toggleClass("active");
   
  });
 
  $(document).on("click", function (event) {
 
    if ($(event.target).closest(".btn-user").length === 0) {

      $(".user-tooltip").removeClass("active");
    }
  }); 


/* Help toggle-menu */

 $(document).on('click', '.help-item', function () {
  $(".help-item-content").toggleClass("d-block");
  $(".help-item").toggleClass("active");
 
});

$(document).on("click", function (event) {

  if ($(event.target).closest(".help-item").length === 0) {
    $(".help-item").removeClass("active");
    $(".help-item-content").removeClass("d-block");
  }
});


  /*carousel cheques*/

  $(document).on('click','a[data-slide="prev"]',function(){
    $('#carouselCheque').carousel('prev');
  });
  $(document).on('click','a[data-slide="next"]',function(){
    $('#carouselCheque').carousel('next');
  });
  
  /* fin carousel cheques*/

});
