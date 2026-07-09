(function($, elementor) {
    'use strict'; 
    // Accordion
    var widgetAccordion = function($scope, $) {
        var $accrContainer = $scope.find('.bdt-accordion-container'),
            $accordion = $accrContainer.find('.bdt-accordion');
        if (!$accrContainer.length) {
            return;
        }
        var $settings = $accordion.data('settings');
        var activeHash = $settings.activeHash;
        var hashTopOffset = $settings.hashTopOffset;
        var hashScrollspyTime = $settings.hashScrollspyTime;

        function hashHandler($accordion, hashScrollspyTime, hashTopOffset) {
            if (window.location.hash) {
                if ($($accordion).find('[data-title="' + window.location.hash.substring(1) + '"]').length) {
                    var hashTarget = $('[data-title="' + window.location.hash.substring(1) + '"]').closest($accordion).attr('id');
                    $('html, body').animate({
                        easing: 'slow',
                        scrollTop: $('#' + hashTarget).offset().top - hashTopOffset
                    }, hashScrollspyTime, function() {
                        //#code
                    }).promise().then(function() {
                        bdtUIkit.accordion($accordion).toggle($('[data-title="' + window.location.hash.substring(1) + '"]').data('accordion-index'), true);
                    });
                }
            }
        } 
        if ($settings.activeHash == 'yes') {
            $(window).on('load', function() {
                hashHandler($accordion, hashScrollspyTime = 1500, hashTopOffset);
            });
            $($accordion).find('.bdt-accordion-title').off('click').on('click', function(event) {
                window.location.hash = ($.trim($(this).attr('data-title')));
                hashHandler($accordion, hashScrollspyTime, hashTopOffset);
            });
            $(window).on('hashchange', function(e) {
                hashHandler($accordion, hashScrollspyTime, hashTopOffset);
            });
        }
    };
    jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/bdt-accordion.default', widgetAccordion);
    });
}(jQuery, window.elementorFrontend));