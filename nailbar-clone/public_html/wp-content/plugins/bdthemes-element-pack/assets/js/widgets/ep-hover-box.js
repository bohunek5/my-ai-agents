(function($, elementor) {

    'use strict';

    var widgetHoverBox = function($scope, $) {


        var $hoverBox = $scope.find('.bdt-hover-box'),
            $settings = $hoverBox.data('settings');

        var iconBx = document.querySelectorAll('#' + $settings.box_id + ' .bdt-hover-box-item');
        var contentBx = document.querySelectorAll('#' + $settings.box_id + ' .bdt-hover-box-content');

        for (var i = 0; i < iconBx.length; i++) {
            iconBx[i].addEventListener($settings.mouse_event, function() {
                for (var i = 0; i < contentBx.length; i++) {
                    contentBx[i].className = 'bdt-hover-box-content'
                }
                document.getElementById(this.dataset.id).className = 'bdt-hover-box-content active';

                for (var i = 0; i < iconBx.length; i++) {
                    iconBx[i].className = 'bdt-hover-box-item';
                }
                this.className = 'bdt-hover-box-item active';

            })
        }

    };


    jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/bdt-hover-box.default', widgetHoverBox);
        elementorFrontend.hooks.addAction('frontend/element_ready/bdt-hover-box.bdt-envelope', widgetHoverBox);
    });

}(jQuery, window.elementorFrontend));