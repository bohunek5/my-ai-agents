( function( $, elementor ) {

	'use strict';

	var widgetToggle = function( $scope, $ ) {

		var $toggleContainer = $scope.find( '.bdt-show-hide-container' );
    var $toggle = $toggleContainer.find( '.bdt-show-hide' );

    if ( ! $toggleContainer.length ) {
      return;
    }

    var $settings = $toggle.data('settings');
    var toggleId = $settings.id;
    var status_scrollspy = $settings.status_scrollspy;
    var animTime = $settings.scrollspy_time;
    var scrollspy_top_offset = $settings.scrollspy_top_offset;
    var scrollspy_time = $settings.scrollspy_time;

    function scrollspyHandler($toggle, toggleId, toggleBtn, animTime, scrollspy_top_offset) {
      if ($settings.status_scrollspy == 'yes') {
        if ($($toggle).find('.bdt-show-hide-item')) {
          if($settings.hash_location == 'yes'){
           window.location.hash = ($.trim(toggleId));

         } 

         var scrollspyWrapper = $('#bdt-show-hide-'+toggleId).find('.bdt-show-hide-item');
         $('html, body').animate({
          easing: 'slow',
          scrollTop: $(scrollspyWrapper).offset().top - scrollspy_top_offset
        }, animTime, function() {
                        //#code
                      }).promise().then(function() {
                       $(toggleBtn).siblings(".bdt-show-hide-content").slideToggle("slow", function() {
                         $(toggleBtn).parent().toggleClass("bdt-open");
                       });
                     });
                      
                    }
                  } else{
                    $(toggleBtn).siblings(".bdt-show-hide-content").slideToggle("slow", function() {
                     $(toggleBtn).parent().toggleClass("bdt-open");
                   });
                  }
                } 

                $($toggle).find('.bdt-show-hide-title').off('click').on('click', function(event) {
                  var toggleBtn = $(this);
                  scrollspyHandler($toggle, toggleId, toggleBtn, animTime, scrollspy_top_offset);
                });

                function hashHandler(){
                  toggleId = window.location.hash.substring(1);
                  var toggleBtn = $('#bdt-show-hide-'+toggleId).find('.bdt-show-hide-title');
                  var scrollspyWrapper = $('#bdt-show-hide-'+toggleId).find('.bdt-show-hide-item');
                  $('html, body').animate({
                    easing: 'slow',
                    scrollTop: $(scrollspyWrapper).offset().top - scrollspy_top_offset
                  }, animTime, function() {
                    //#code
                  }).promise().then(function() {
                    $(toggleBtn).siblings(".bdt-show-hide-content").slideToggle("slow", function() {
                     $(toggleBtn).parent().toggleClass("bdt-open");
                   });
                  });
                }

                $(window).on('load', function() {
                  if( $($toggleContainer).find('#bdt-show-hide-'+window.location.hash.substring(1)).length != 0 ){
                    if($settings.hash_location == 'yes'){
                      hashHandler();
                    }
                  }
                });
                
              };


              jQuery(window).on('elementor/frontend/init', function() {
                elementorFrontend.hooks.addAction( 'frontend/element_ready/bdt-toggle.default', widgetToggle );
              });

            }( jQuery, window.elementorFrontend ) );
