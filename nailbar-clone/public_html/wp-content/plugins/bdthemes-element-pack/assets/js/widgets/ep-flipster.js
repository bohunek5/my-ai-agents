(function($, elementor) {
    'use strict';
    var widgetFlipster = function($scope, $) {
        var $flipsterSlider = $scope.find('.bdt-flipster');
        if (!$flipsterSlider.length) {
            return;
        }
        elementorFrontend.waypoint($flipsterSlider, function() {
            var flip = $($flipsterSlider);
            flip.each(function() {
                var $this = $(this);
                var $settings = $this.data('settings');

                console.log($settings.keyboard);
                if ($settings.keyboard == 'false') {
                    var keyboard = false;
                }
 
                function true_false($data) {
                    if ($data == 'yes') {
                        return true;
                    } else {
                        return false;
                    }
                }  

                var myFlipster = $("#" + $settings.id).flipster({
                    style: '' + $settings.style + '',
                    spacing: $settings.spacing,
                    scrollwheel: true_false($settings.scrollwheel),
                    touch: true,
                    loop: $settings.loop,
                    keyboard: true_false($settings.keyboard),
                    // style: 'wheel', // spacing: 0, // style: 'flat', // spacing: -0.25 // style: 'carousel', // spacing: -0.5,
                    // nav: true,
                    buttons: $settings.buttons,
                    // buttonPrev: 'Previous', 
                    // buttonNext: 'Next',

                });

            });


        }, {
            offset: '100%'
        });

    };
    jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/bdt-flipster.default', widgetFlipster);
    });
}(jQuery, window.elementorFrontend));