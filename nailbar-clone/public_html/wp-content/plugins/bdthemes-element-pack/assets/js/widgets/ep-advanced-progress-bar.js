(function($, elementor) {
    'use strict';
    // AdvancedProgressBar
    var widgetAdvancedProgressBar = function($scope, $) {
        var $advancedProgressBar = $scope.find('.bdt-advanced-progress-bar .bdt-progress-item');
        if (!$advancedProgressBar.length) {
            return;
        }
                    
 
 
        elementorFrontend.waypoint($advancedProgressBar, function() {
            var $this = $(this);
            var bar = $(".bdt-progress-item .bdt-progress-fill"),
                barPos,
                windowBtm = $(window).scrollTop() + $(window).height();
            bar.each(function() {
                barPos = $(this).offset().top;
                if (barPos <= windowBtm) {
                    $(this).css("width", function() {
                        return $(this).attr("data-width");
                    });
                    $(this).children(".bdt-progress-parcentage").css({
                        '-webkit-transform': 'scale(1)',
                        '-moz-transform': 'scale(1)',
                        '-ms-transform': 'scale(1)',
                        '-o-transform': 'scale(1)',
                        'transform': 'scale(1)'
                    });
                }
            });
        }, {
            offset: 'bottom-in-view'
        });
 
    };
    jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/bdt-advanced-progress-bar.default', widgetAdvancedProgressBar);
    });
}(jQuery, window.elementorFrontend)); 