(function($, elementor) {

    'use strict';

    var widgetSlideshow = function($scope, $) {

        $(".content-1").mThumbnailScroller({
            axis: "yx",
            type: "hover-precise"
        });

    };


    jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/bdt-slideshow.default', widgetSlideshow);
    });

}(jQuery, window.elementorFrontend));