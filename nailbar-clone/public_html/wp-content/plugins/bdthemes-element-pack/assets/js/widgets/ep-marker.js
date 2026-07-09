( function( $, elementor ) {

	'use strict';

	var widgetMarker = function( $scope, $ ) {

		var $marker = $scope.find( '.bdt-marker-wrapper' );

        if ( ! $marker.length ) {
            return;
        }

		var HotSpots = elementorModules.frontend.handlers.Base.extend({
			onInit: function () {
				elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
				this.init();
			},
		});

		var $tooltip = $marker.find('> .bdt-tippy-tooltip');
		
		$tooltip.each( function( index ) {
			tippy( this, {
				appendTo: $scope[0]
			});				
		});

	};


	jQuery(window).on('elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/bdt-marker.default', widgetMarker );
	});

}( jQuery, window.elementorFrontend ) );