<?php
namespace ElementPack\Modules\Flipster\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Repeater;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Css_Filter;
use Elementor\Icons_Manager;

if (!defined('ABSPATH')) {
    exit();
}

class Flipster extends Widget_Base
{

    public function get_name()
    {
        return 'bdt-flipster';
    }

    public function get_title()
    {
        return BDTEP . esc_html__('Flipster', 'bdthemes-element-pack');
    }

    public function get_icon()
    {
        return 'bdt-wi-flipster';
    }

    public function get_categories()
    {
        return ['element-pack'];
    }

    public function get_style_depends()
    {
        return ['ep-flipster'];
    }

    public function get_keywords()
    {
        return ['flipster', 'slider', 'carousel'];
    }

    public function get_script_depends()
    {
        return [ 'flipster', 'ep-flipster' ];
    }

    // public function get_custom_help_url() {
    //     return 'https://youtu.be/faIeyW7LOJ8';
    // }

    protected function _register_controls()
    {

        $this->start_controls_section(
            'section_flipster_item',
            [
                'label' => __('Layout', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'flipster_style',
            [
                'label' => __( 'Style', 'bdthemes-element-pack' ),
                'type'  => Controls_Manager::SELECT,
                'default' => 'wheel',
                'options' => [
                    'wheel'     => __( 'Wheel', 'bdthemes-element-pack' ),
                    'carousel'  => __( 'Carousel', 'bdthemes-element-pack' ),
                    'flat'      => __( 'Flat', 'bdthemes-element-pack' ),
                    'coverflow' => __( 'Coverflow', 'bdthemes-element-pack' ),
                ],

            ]
        );
 
        $repeater = new Repeater();

        $repeater->add_control(
            'flipster_title',
            [
                'label'       => __('Title', 'bdthemes-element-pack'),
                'type'        => Controls_Manager::TEXT,
                'label_block' => true,
                'placeholder' => __('Title Item', 'bdthemes-element-pack'),
                'default'     => __('Title Item', 'bdthemes-element-pack'),
                'dynamic'     => [
                    'active' => true,
                ],
            ]
        );

        $repeater->add_control(
            'flipster_content',
            [
                'label'       => __('Details', 'bdthemes-element-pack'),
                'type'        => Controls_Manager::TEXTAREA,
                'default'     => __("Default description. Lorem Ipsum is simply dummy text of the printing and typesetting industry.   ", 'bdthemes-element-pack'),
                'placeholder' => __('Type your description here', 'bdthemes-element-pack'),
                'dynamic'     => [
                    'active' => true,
                ],
            ]
        );
 
        $repeater->add_control(
            'flipster_img',
            [
                'label'       => __('Image', 'bdthemes-element-pack'),
                'type'        => Controls_Manager::MEDIA,
                'label_block' => true,
            ]
        );
       
        $repeater->add_control(
            'flipster_link',
            [
                'label'       => __('Link', 'bdthemes-element-pack'),
                'type'        => Controls_Manager::URL,
                'dynamic'     => [
                    'active' => true,
                ],
                'label_block' => true,
                'placeholder' => __('https://your-link.com', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'flipster_list',
            [
                'label'       => '',
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'separator'   => 'before',
                'default'     => [
                    [
                        'flipster_title'   => esc_html__('Flipster One', 'bdthemes-element-pack'),
                        'flipster_content' => esc_html__('Slogan here', 'bdthemes-element-pack'),
                        'flipster_img'     => ['url' => BDTEP_ASSETS_URL . 'images/gallery/image-1.jpg'],
                    ],
                    [
                        'flipster_title'   => esc_html__('Flipster Two', 'bdthemes-element-pack'),
                        'flipster_content' => esc_html__('Slogan here', 'bdthemes-element-pack'),
                        'flipster_img'     => ['url' => BDTEP_ASSETS_URL . 'images/gallery/image-2.jpg'],
                    ],
                    [
                        'flipster_title'   => esc_html__('Flipster Three', 'bdthemes-element-pack'),
                        'flipster_content' => esc_html__('Slogan here', 'bdthemes-element-pack'),
                        'flipster_img'     => ['url' => BDTEP_ASSETS_URL . 'images/gallery/image-3.jpg'],
                    ],
                    [
                        'flipster_title'   => esc_html__('Flipster Four', 'bdthemes-element-pack'),
                        'flipster_content' => esc_html__('Slogan here', 'bdthemes-element-pack'),
                        'flipster_img'     => ['url' => BDTEP_ASSETS_URL . 'images/gallery/image-4.jpg'],
                    ],
                    [
                        'flipster_title'   => esc_html__('Flipster Five', 'bdthemes-element-pack'),
                        'flipster_content' => esc_html__('Slogan here', 'bdthemes-element-pack'),
                        'flipster_img'     => ['url' => BDTEP_ASSETS_URL . 'images/gallery/image-5.jpg'],
                    ]  
                ],
                'title_field' => '{{{ flipster_title }}}',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_flipster_additional',
            [
                'label' => __('Additional', 'bdthemes-element-pack'),
            ]
        );

        $this->add_responsive_control(
            'flipster_box_width',
            [
                'label'      => esc_html__('Max Width', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => [ 'px' ],
                'range' => [
                    'px' => [
                        'min'  => 100,
                        'max'  => 500,
                        'step' => 5,
                    ],
                ],
                'default' => [
                    'unit' => 'px',
                    'size' => 340,
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-flipster .flipster__item' => 'max-width: {{SIZE}}{{UNIT}};',
                ],
                'render_type' => 'template'
            ]
        );

        $this->add_responsive_control(
            'flipster_spacing',
            [
                'label'      => esc_html__('Spacing', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => [ 'px' ],
                'range' => [
                    'px' => [
                        'min'  => 0,
                        'max'  => 9,
                        'step' => 1,
                    ],
                ],
                'condition' => [
                    'flipster_style' => ['wheel', 'carousel', 'coverflow'],
                ]
            ]
        );

        $this->add_responsive_control(
            'flipster_spacing_flat',
            [
                'label'      => esc_html__('Spacing', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => [ 'px' ],
                'range' => [
                    'px' => [
                        'min'  => 0,
                        'max'  => 4,
                        'step' => 0.5,
                    ],
                ],
                'condition' => [
                    'flipster_style' => ['flat'],
                ]
            ]
        );

        $this->add_control(
            'content_alignment',
            [
                'label'   => esc_html__( 'Alignment', 'bdthemes-element-pack' ),
                'type'    => Controls_Manager::CHOOSE,
                'options' => [
                    'left' => [
                        'title' => esc_html__( 'Left', 'bdthemes-element-pack' ),
                        'icon'  => 'fas fa-align-left',
                    ],
                    'center' => [
                        'title' => esc_html__( 'Center', 'bdthemes-element-pack' ),
                        'icon'  => 'fas fa-align-center',
                    ],
                    'right' => [
                        'title' => esc_html__( 'Right', 'bdthemes-element-pack' ),
                        'icon'  => 'fas fa-align-right',
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-flipster .bdt-item-content' => 'text-align: {{VALUE}}',
                ],
                'separator'   => 'before',
            ]
        );

        $this->add_control(
            'flipster_title_display',
            [
                'label'         => esc_html__('Show Title', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SWITCHER,
                'default'       => 'yes',
            ]
        );

        $this->add_control(
            'flipster_des_display',
            [
                'label'         => esc_html__('Show Description', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SWITCHER,
                'default'       => 'yes',
            ]
        );

        $this->add_control(
            'show_link_button',
            [
                'label'         => esc_html__('Show Button', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SWITCHER,
                'default'       => 'yes',
            ]
        );

        $this->add_control(
            'show_on_hover',
            [
                'label'         => esc_html__('Show On Hover', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SWITCHER,
            ]
        );

        $this->add_control(
			'loop',
			[
				'label'   => __( 'Loop', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
                'default' => 'yes',
                'separator'     => 'before',
			]
        );
        
        $this->add_control(
			'navi_arrows',
			[
				'label'   => __( 'Navigation Arrows', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
			]
		);

        $this->add_control(
            'flipster_setting_scrollwheel',
            [
                'label'         => esc_html__('Scroll By Wheel', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SWITCHER, 
                'return_value'  => 'yes',
                'default'       => 'no',
            ]
        );

        $this->add_control(
            'flipster_setting_keyboard',
            [
                'label'         => esc_html__('Scroll By Keyboard', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SWITCHER, 
                'return_value'  => 'yes',
                'default'       => 'no',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_flipster_button',
            [
                'label' => __('Button', 'bdthemes-element-pack'),
                'condition'     =>[
                    'show_link_button' => 'yes', 
                ],
            ]
        );

        $this->add_control(
            'flipster_link_text',
            [
                'label'         => esc_html__('Button Text', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::TEXT,
                'default'       => 'View Details',
            ]
        );

        $this->add_control(
			'button_icon',
			[
				'label'       => esc_html__( 'Icon', 'bdthemes-element-pack' ),
                'type'        => Controls_Manager::ICONS,
                'default' => [
					'value' => 'fas fa-plus',
					'library' => 'fa-solid',
				],
			]
		);
 
		$this->add_control(
			'icon_align',
			[
				'label'   => __( 'Icon Position', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'right',
				'options' => [
					'left'   => __( 'Left', 'bdthemes-element-pack' ),
					'right'  => __( 'Right', 'bdthemes-element-pack' ),
				],
				'condition' => [
					'button_icon[value]!' => '',
				],
			]
		);

		$this->add_control(
			'icon_indent',
			[
				'label' => __( 'Icon Spacing', 'bdthemes-element-pack' ),
				'type'  => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 100,
					],
				],
				'default' => [
					'size' => 8,
				],
				'condition' => [
					'button_icon[value]!' => '',
					'flipster_link_text!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-flipster .bdt-button-icon-align-right' => 'margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .bdt-flipster .bdt-button-icon-align-left'  => 'margin-right: {{SIZE}}{{UNIT}};',
				],
			]
        );

        $this->end_controls_section();

 
        //Style
        // content box 
        $this->start_controls_section(
            'section_style_flipster_box',
            [
                'label'      => __('Item Area', 'bdthemes-element-pack'),
                'tab'        => Controls_Manager::TAB_STYLE,
            ]
        );

    

        $this->start_controls_tabs('tabs_item_style');

        $this->start_controls_tab(
            'tab_item_normal',
            [
                'label' => __( 'Normal', 'bdthemes-element-pack' ),
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'item_shadow',
                'selector' => '{{WRAPPER}} .bdt-flipster .flipster__item__content',
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name'        => 'item_border',
                'label'       => __( 'Border', 'bdthemes-element-pack' ),
                'placeholder' => '1px',
                'default'     => '1px',
                'selector'    => '{{WRAPPER}} .bdt-flipster .flipster__item__content  .bdt-main-item',
            ]
        );

        $this->add_control(
            'item_border_radius',
            [
                'label'      => __( 'Border Radius', 'bdthemes-element-pack' ),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%' ],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-flipster .flipster__item__content .bdt-main-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'item_padding',
            [
                'label'      => __( 'Padding', 'bdthemes-element-pack' ),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-flipster .flipster__item__content .bdt-main-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
                ],
            ]
        );

        $this->add_control(
            'shadow_mode',
            [
                'label'        => esc_html__( 'Shadow Mode', 'bdthemes-element-pack' ),
                'type'         => Controls_Manager::SWITCHER,
                'prefix_class' => 'bdt-ep-shadow-mode-',
            ]
        );

        $this->add_control(
            'shadow_color',
            [
                'label'     => esc_html__( 'Shadow Color', 'bdthemes-element-pack' ),
                'type'      => Controls_Manager::COLOR,
                'condition' => [
                    'shadow_mode' => 'yes',
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-widget-container:before' => 'background: linear-gradient(to right, {{VALUE}} 5%,rgba(255,255,255,0) 100%);',
                    '{{WRAPPER}} .elementor-widget-container:after'  => 'background: linear-gradient(to right, rgba(255,255,255,0) 0%, {{VALUE}} 95%);',
                ],
            ]
        );
 

        $this->end_controls_tab();

        $this->start_controls_tab(
            'tab_item_active',
            [
                'label' => __( 'Active', 'bdthemes-element-pack' ),
            ]
        );

         $this->add_group_control(
            Group_Control_Background::get_type(),
            [
                'name'      => 'content_background_active',
                'selector'  => '{{WRAPPER}} .bdt-flipster .flipster__item--current .bdt-item-content-area',
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'item_shadow_active',
                'selector' => '{{WRAPPER}} .bdt-flipster .flipster__item--current .flipster__item__content .bdt-main-item',
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name'        => 'item_border_active',
                'label'       => __( 'Border', 'bdthemes-element-pack' ),
                'placeholder' => '1px',
                'default'     => '1px',
                'selector'    => '{{WRAPPER}} .bdt-flipster .flipster__item--current .flipster__item__content .bdt-main-item',
            ]
        );

        $this->add_control(
            'item_border_radius_active',
            [
                'label'      => __( 'Border Radius', 'bdthemes-element-pack' ),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%' ],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-flipster .flipster__item--current .flipster__item__content .bdt-main-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'item_padding_active',
            [
                'label'      => __( 'Padding', 'bdthemes-element-pack' ),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-flipster .flipster__item--current .flipster__item__content .bdt-main-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
                ],
            ]
        );


        $this->end_controls_tab();

        $this->end_controls_tabs();


        $this->add_responsive_control(
            'flipster_box_padding',
            [
                'label'      => esc_html__('Content Padding', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-flipster .bdt-item-content, {{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();
        
        // end content box 


        $this->start_controls_section(
            'section_style_img',
            [
                'label'      => __('Image', 'bdthemes-element-pack'),
                'tab'        => Controls_Manager::TAB_STYLE,
            ]
        );     

        $this->start_controls_tabs('tabs_img_style');

        $this->start_controls_tab(
            'tab_item_img_normal',
            [
                'label' => __( 'Normal', 'bdthemes-element-pack' ),
            ]
        );


        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name'        => 'img_border',
                'selector'    => '{{WRAPPER}} .bdt-flipster  .flipster__item__content img',
            ]
        );

        $this->add_control(
            'img_border_radius',
            [
                'label'      => __('Border Radius', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-flipster  .flipster__item__content img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Css_Filter::get_type(),
            [
                'name'     => 'css_filters',
                'selector' => '{{WRAPPER}} .bdt-flipster .flipster__item__content img',
            ]
        );

        $this->end_controls_tab();

        $this->start_controls_tab(
            'tab_item_img_active',
            [
                'label' => __( 'Active', 'bdthemes-element-pack' ),
            ]
        );

        $this->add_control(
            'img_active_active_border_color',
            [
                'label'     => __( 'Border Color', 'bdthemes-element-pack' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-flipster .flipster__item--current .flipster__item__content img'  => 'border-color: {{VALUE}};',
                ],
                'condition' => [
                    'img_border_border!' => '',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Css_Filter::get_type(),
            [
                'name'     => 'css_filters_active',
                'selector' => '{{WRAPPER}} .bdt-flipster .flipster__item--current .flipster__item__content img',
            ]
        );

        $this->end_controls_tab();

        $this->end_controls_tabs();

        $this->end_controls_section();
        

        // title
        $this->start_controls_section(
            'section_style_title',
            [
                'label'      => __('Title', 'bdthemes-element-pack'),
                'tab'        => Controls_Manager::TAB_STYLE,
                'condition'      => [
                    'flipster_title_display' => ['yes'],
                ],
            ]
        );

        $this->add_control(
            'title_color',
                [
                    'label'      => esc_html__('Color', 'bdthemes-element-pack'),
                    'type'       => Controls_Manager::COLOR,
                    'selectors'  => [
                    '{{WRAPPER}} .bdt-flipster .title' => 'color: {{VALUE}}',
                ],
            ]
        );

        $this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name' => 'title_text_shadow',
				'label' => __( 'Text Shadow', 'bdthemes-element-pack' ),
				'selector' => '{{WRAPPER}} .bdt-flipster .title',
			]
		);

        $this->add_group_control(
           Group_Control_Typography::get_type(),
            [
                'name'      => 'title_typography',
                'label'     => __( 'Typography', 'bdthemes-element-pack' ), 
                'selector'  => '{{WRAPPER}} .bdt-flipster .title',
            ]
        );

        $this->add_control(
			'title_spacing',
			[
				'label' => __( 'Spacing', 'bdthemes-element-pack' ),
				'type'  => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} .bdt-flipster .title' => 'padding-bottom: {{SIZE}}{{UNIT}};',
				],
			]
        );

        $this->end_controls_section();
        
        // end title

        // description
        $this->start_controls_section(
            'section_style_description',
            [
                'label'      => __('Description', 'bdthemes-element-pack'),
                'tab'        => Controls_Manager::TAB_STYLE,
                'condition'      => [
                    'flipster_des_display' => ['yes'],
                ],
            ]
        );

        $this->add_control(
            'description_color',
            [
                'label'      => esc_html__('Color', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::COLOR,
                'selectors'  => [
					'{{WRAPPER}} .bdt-flipster .description' => 'color: {{VALUE}}',
				],
            ]
        );

        $this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name' => 'description_text_shadow',
				'label' => __( 'Text Shadow', 'bdthemes-element-pack' ),
				'selector' => '{{WRAPPER}} .bdt-flipster .description',
			]
		);

        $this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'description_typography',
				'label'     => __( 'Typography', 'bdthemes-element-pack' ), 
                'selector'  => '{{WRAPPER}} .bdt-flipster .description', 
			]
		);

        $this->end_controls_section();
        
        // end description
        
        $this->start_controls_section(
            'section_style_button',
            [
                'label'      => __('Button', 'bdthemes-element-pack'),
                'tab'        => Controls_Manager::TAB_STYLE,
                'condition'     =>[
                    'show_link_button' => 'yes', 
                ],
                 
            ]
        );

        $this->start_controls_tabs('link_tabs');

        $this->start_controls_tab(
            'link_normal',
            [
                'label' => __('Normal', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'link_color',
            [
                'label'     => __('Color', 'bdthemes-element-pack'),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .bdt-flipster .bdt-flipster-link svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Background::get_type(),
            [
                'name'      => 'link_background',
                'selector'  => '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link',
            ]
        );

        $this->add_responsive_control(
            'link_padding',
            [
                'label'      => esc_html__('Padding', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name'        => 'link_border',
                'selector'    => '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link',
            ]
        );

        $this->add_control(
            'link_border_radius',
            [
                'label'      => __('Border Radius', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'link_typography',
				'label'     => __( 'Typography', 'bdthemes-element-pack' ), 
				'selector'  => '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link',
			]
		);

        $this->end_controls_tab();

        $this->start_controls_tab(
            'link_hover',
            [
                'label' => __('Hover', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'link_color_hover',
            [
                'label'     => __('Color', 'bdthemes-element-pack'),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link:hover' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .bdt-flipster .bdt-flipster-link:hover svg' => 'fill: {{VALUE}};',
                ], 
            ]
        );

        $this->add_group_control(
            Group_Control_Background::get_type(),
            [
                'name'      => 'link_background_hover',
                'selector'  => '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link:hover',
            ]
        );

         $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'      => 'link_typography_hover',
                'label'     => __( 'Typography', 'bdthemes-element-pack' ), 
                'selector'  => '{{WRAPPER}} .bdt-flipster .bdt-main-item .bdt-item-content-area .bdt-item-content .bdt-flipster-link:hover',
            ]
        );

        $this->end_controls_tab();

        $this->end_controls_tabs();

        $this->end_controls_section();


        $this->start_controls_section(
			'section_style_navigation',
			[
				'label'     => __( 'Navigation Arrows', 'bdthemes-element-pack' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'navi_arrows' => 'yes',
				],
			]
		);

		$this->add_control(
			'arrows_size',
			[
				'label' => __( 'Size', 'bdthemes-element-pack' ),
				'type'  => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-flipster .flipster__button svg' => 'font-size: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'arrows_color',
			[
				'label'     => __( 'Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-flipster .flipster__button svg' => 'stroke: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'arrows_hover_color',
			[
				'label'     => __( 'Hover Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-flipster .flipster__button:hover svg' => 'stroke: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'arrows_space',
			[
				'label' => __( 'Space', 'bdthemes-element-pack' ),
				'type'  => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-flipster .flipster__button--next' => 'margin-right: {{SIZE}}px;',
					'{{WRAPPER}} .bdt-flipster .flipster__button--prev' => 'margin-left: {{SIZE}}px;',
				],
			]
        );
        
        $this->end_controls_section();

    }

    protected function render()
    { 

        $settings = $this->get_active_settings();

        if ( $settings['flipster_spacing']['size'] ) {
            if (  $settings['flipster_style'] == 'wheel') {
                $spacing = $settings['flipster_spacing']['size'] / 100 ;
            }
            if (  $settings['flipster_style'] == 'carousel') {
                $spacing = ($settings['flipster_spacing']['size'] - 10) / 10 ;
            }
            if (  $settings['flipster_style'] == 'coverflow') {
                $spacing = ($settings['flipster_spacing']['size'] - 10) / 10 ;
            }
        } elseif ( $settings['flipster_spacing_flat']['size'] ) {
            if (  $settings['flipster_style'] == 'flat') {
                $spacing = ($settings['flipster_spacing_flat']['size'] - 5) / 10 ;
            }
        } else {

            if (  $settings['flipster_style'] == 'wheel') {
                $spacing = 0.0001;
            }
            if (  $settings['flipster_style'] == 'flat') {
                $spacing = -0.25;
            }
            if (  $settings['flipster_style'] == 'carousel') {
                $spacing = -0.5;
            }
            if (  $settings['flipster_style'] == 'coverflow') {
                $spacing = -0.6;
            }
        }


        if ('yes' == $settings['show_on_hover']) {
            $this->add_render_attribute('flipster_data', 'class', 'bdt-flipster bdt-on-hover' );
        } else{
            $this->add_render_attribute('flipster_data', 'class', 'bdt-flipster' );
        }
         
        $this->add_render_attribute(
            [
                'flipster_data' => [
                    'data-settings' => [
                        wp_json_encode(array_filter([
                            "id"          => 'bdt-flipster-' . $this->get_id(),
                            "style"       => $settings['flipster_style'],
                            "spacing"     => $spacing,
                            "scrollwheel" => $settings['flipster_setting_scrollwheel'],
                            "keyboard"    => $settings['flipster_setting_keyboard'],
                            "loop"        => ($settings["loop"] == "yes") ? true : false,
                            "buttons"     => ($settings["navi_arrows"] == "yes") ? true : false,
                        ])
                    ),
                    ],
                ],
            ]
        );
    ?>
 
      
    <div id="bdt-flipster-<?php echo $this->get_id(); ?>" <?php echo $this->get_render_attribute_string('flipster_data'); ?>>
        <ul>
            <?php  foreach ($settings['flipster_list'] as $index => $item): ?>
            <?php
                $link_key = 'link_' . $index;
                if (!empty($item['flipster_link']['url'])) {
                    $this->add_render_attribute($link_key, 'href', $item['flipster_link']['url']);

                    if ($item['flipster_link']['is_external']) {
                        $this->add_render_attribute($link_key, 'target', '_blank');
                    }

                    if ($item['flipster_link']['nofollow']) {
                        $this->add_render_attribute($link_key, 'rel', 'nofollow');
                    }
                } else {
                    $this->add_render_attribute($link_key, 'href', '#');
                }

            ?>  
                <li>
                    <div class="bdt-main-item">
                        <img src="<?php echo $item['flipster_img']['url']; ?>">
                        <div class="bdt-item-content-area">
                            <div class="bdt-item-content">
                                <?php if($settings['flipster_title_display'] == 'yes'): ?>
                                    <h3 class="title"> <?php echo $item['flipster_title']; ?> </h3>
                                <?php endif; ?>

                                <?php if($settings['flipster_des_display'] == 'yes'): ?>
                                    <p class="description"> <?php echo $item['flipster_content']; ?> </p>
                                <?php endif; ?>

                                <?php if( 'yes' == $settings['show_link_button']): ?>
                                    <div class="bdt-flipster-button bdt-position-bottom">
                                        <a <?php echo $this->get_render_attribute_string($link_key); ?> class='bdt-flipster-link'>
                                            <?php echo $settings['flipster_link_text']; ?>

                                            <?php if ($settings['button_icon']['value']) : ?>
                                            <span class="bdt-button-icon-align-<?php echo $settings['icon_align'] ?>">
                                                <?php Icons_Manager::render_icon( $settings['button_icon'], [ 'aria-hidden' => 'true' ] ); ?>
                                            </span>
                                            <?php endif; ?>

                                        </a>
                                    </div> 
                                <?php endif; ?>

                            </div>
                        </div>
                    </div>
                </li>
            <?php endforeach;?>
        </ul>
    <div>
    
    <?php }

}
