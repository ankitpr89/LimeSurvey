/**
 * Side Menu
 */
$(document).ready(function(){

    var close = $('#chevronClose');
    var stretch = $('#chevronStretch');
    var sideBody = $('.side-body');
    var sideMenu = $('#sideMenu');
    var absoluteWrapper = $('.absolute-wrapper');
    var sidemenusContainer = $('.sidemenuscontainer');

    /**
    * If the side bar state is set to  "close" on page load, it closes the side menu
    */
    if ( $("#close-side-bar").length ) {
        $('#chevronStretch').removeClass('opened');
        $('#chevronClose').removeClass('opened');

        $('#chevronStretch').addClass('closed');
        $('#chevronClose').addClass('closed');

        $that = $('.toggleside');

        $('.side-menu').css({
          opacity: 0.5,
          left: -250,
        });

        $thatWidth = $('.side-body').width();
        $('.side-body').width($thatWidth);

        $('.side-body').css({
          left: -250,
          width: $thatWidth + 250,
        });

        $that.removeClass("hideside");
        $that.addClass("showside");

        absoluteWrapper.css({
          opacity: 0.5,
          left: -250,
            });

        sidemenusContainer.css({
            opacity: 0,
        });
    }

    // To prevent the user to try to open or close it before the animation ended (because of  $('.side-body').width())
    function disableChevrons() {
        close.addClass('disabled');
        stretch.addClass('disabled');
    }

    function enableChevrons() {
        close.removeClass('disabled');
        stretch.removeClass('disabled');
    }

    function chevronChangeState(toRemove, toAdd) {
        close.removeClass(toRemove);
        stretch.removeClass(toRemove);
        close.addClass(toAdd);
        stretch.addClass(toAdd);
    }

/**
 *  Close sidemenu
 */
jQuery(document).on('click', '#chevronClose.opened', function(){
    disableChevrons();

    // Move the side menu
    sideMenu.animate({
      opacity: 0.5,
      left: "-250",
        }, 500, function() {
    });

    // To animate correctly the side body, we first must give it a fixed width
    $thatWidth = sideBody.width();
    sideBody.width($thatWidth);

	// Move the side body
    sideBody.animate(
        {
            left: "-250",
            width: $thatWidth + 250,
        }, 500, function() {
    });

    absoluteWrapper.animate({
      opacity: 0.5,
      left: "-250",
        }, 500, function() {
    });

    sidemenusContainer.animate({
        opacity: 0,
    }, 500);

    chevronChangeState('opened', 'closed');
    enableChevrons();
});

/**
 * Unstreched side menu
 */
 jQuery(document).on('click', '#chevronClose.stretched', function(){
     disableChevrons();

     sideMenu.animate({
             width: 300,
         }, 500, function() {
     });

     absoluteWrapper.animate({
            width: 300,
          }, 500, function() {
      });

     sidemenusContainer.animate({
         width: 300,
      }, 500);

      chevronChangeState('stretched', 'opened');
      enableChevrons();
 });

/**
 * Show the side menu
 */
jQuery(document).on('click', '#chevronStretch.closed', function(){
    disableChevrons();

    sideMenu.animate({
            opacity: 1,
            left: "0",
        }, 500, function() {
    });

    $thatWidth = sideBody.width();
    sideBody.width($thatWidth);

	sideBody.animate({
	      left: "0",
          width: $thatWidth - 250,
	     }, 500, function() {
    });

	absoluteWrapper.animate({
	      opacity: 1,
	         left: "0",
	    }, 500, function() {
	});

	sidemenusContainer.animate({
	      opacity: 1,
	}, 500);

    chevronChangeState('closed', 'opened');
    enableChevrons();
});

/**
 * Stretch the side menu
 */
jQuery(document).on('click', '#chevronStretch.opened', function(){
    disableChevrons();

    sideMenu.animate({
            backgroundColor: "white",
            opacity: 1,
            width: $('body').width(),
        }, 500, function() {
    });

    absoluteWrapper.animate({
           opacity: 1,
           backgroundColor: "white",
           width: $('body').width(),
         }, 500, function() {
     });

    sidemenusContainer.animate({
        opacity: 1,
        backgroundColor: "white",
        width: $('body').width(),
     }, 500);

    chevronChangeState('opened', 'stretched');
    enableChevrons();
});

    var accordionContainer = $('#accordion-container');

    /**
    * Stretch the accordion
    */
    jQuery(document).on('click', '.handleAccordion.opened', function(){

        $('.handleAccordion').addClass('disabled');

        accordionContainer.css({
            position: 'absolute',
            right: 0,
        });

        accordionContainer.width(accordionContainer.width());
        accordionContainer.height(sideBody.height());

        accordionContainer.animate(
            {
                width: '100%',
            }, 500, function() {
                $('.handleAccordion span').removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-right');
                $('.handleAccordion').removeClass('opened').addClass('stretched');
                $('.handleAccordion').removeClass('disabled');
        });

        // jQgrid is so jQgriding its jQgrid...
        if($('#panelintegration').length){
            $('#gbox_urlparams').width('90%');
            $('#gview_urlparams').width('90%');
            $('.ui-state-default.ui-jqgrid-hdiv').width('90%');
            $('.ui-jqgrid-htable.table').width('90%');
            $('.ui-jqgrid-labels th').width('14%');
            $('.ui-jqgrid-bdiv').width('100%');
            $('#urlparams').width('90%');
            $('.jqgfirstrow').width('14%');
            $('#pagerurlparams').width('90%');
        }
    });

    /**
    * Unstretched the accordion
    */
    jQuery(document).on('click', '.handleAccordion.stretched', function(){
        $('.handleAccordion').addClass('disabled');

        accordionContainer.animate(
            {
                width: '33.33333333333333%', // Bootstrap value for col-lg-4
            }, 500, function() {
                $('.handleAccordion span').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
                $('.handleAccordion').removeClass('stretched').addClass('opened');
                $('.handleAccordion').removeClass('disabled');

                accordionContainer.css({
                    position: 'static',
                });

        });
    });

    $('#accordion').on('shown.bs.collapse', function () {
      alert('ok');
    })
});





/**
 * Stick the side menu and the survey bar to the top
 */
$(function()
{
  $(window).scroll(function() { //when window is scrolled
	    $toTop = ($('.surveybar').offset().top - $(window).scrollTop());

	    if($toTop <= 0)
	    {
	        $('.surveybar').addClass('navbar-fixed-top');
	        $('.side-menu').css({position:"fixed", top: "45px"});
	    }

	    if( $(window).scrollTop() <= 45)
	    {
	        $('.surveybar').removeClass('navbar-fixed-top');
	        $('.side-menu').css({position:"absolute", top: "auto"});
	    }
	});
});
