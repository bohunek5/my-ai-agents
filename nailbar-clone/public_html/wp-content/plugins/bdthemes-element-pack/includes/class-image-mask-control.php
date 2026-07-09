<?php

//namespace ElementPack;

use Elementor\Group_Control_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Group_Control_Image_Mask extends Group_Control_Base {

	protected static $fields;

	public static function get_type() {
	    return 'bdt-image-mask';
	}

    public function init_fields() {
        $fields = [];

	    $fields['mask_shape'] = [
		    'label' => _x( 'Masking Shape', 'Mask Image', 'bdthemes-element-pack' ),
		    'title' => _x( 'Masking Shape', 'Mask Image', 'bdthemes-element-pack' ),
		    'type' => Controls_Manager::CHOOSE,
		    'default' => 'default',
		    'options' => [
			    'default' => [
				    'title' =>_x( 'Default Shapes', 'Mask Image', 'bdthemes-element-pack' ),
				    'icon' => 'fa home',
			    ],
			    'custom' => [
				    'title' => _x( 'Custom Shape', 'Mask Image', 'bdthemes-element-pack' ),
				    'icon' => 'fa image',
			    ],
		    ],
		    'toggle' => false,
		    'style_transfer' => true,
	    ];

	    return $fields;
	}


	 protected function filter_fields() {
        $fields = parent::filter_fields();

        $args = $this->get_args();

        foreach ( $fields as &$field ) {
            if ( isset( $field['of_type'] ) && ! in_array( $field['of_type'], $args['types'] ) ) {
                unset( $field );
            }
        }

        return $fields;
    }

	protected function get_default_options() {
		return [
			'popover' => [
				'starter_name'  => 'image-mask',
				'starter_title' => esc_html__( 'Image Mask', 'bdthemes-element-pack' ),
				'settings' => [
					'render_type' => 'ui',
				],
			],
		];
	}

}


// function Element_Pack_Image_Mask_register_controls() {

// 	$controls_manager = \Elementor\Plugin::$instance->controls_manager;

// 	$controls_manager->register_control('bdt-image-mask', new Group_Control_Image_Mask());
// }

// add_action( 'elementor/controls/controls_registered', 'Element_Pack_Image_Mask_register_controls' );