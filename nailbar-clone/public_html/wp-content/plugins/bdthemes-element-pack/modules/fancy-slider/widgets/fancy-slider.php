<?php
namespace ElementPack\Modules\FancySlider\Widgets;

use element_pack_helper;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Border;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Fancy_Slider extends Widget_Base {

	public function get_name() {
		return 'bdt-fancy-slider';
	}

	public function get_title() {
		return BDTEP . esc_html__( 'Fancy Slider', 'bdthemes-element-pack' );
	}

	public function get_icon() {
		return 'bdt-wi-fancy-slider bdt-new';
	}

	public function get_categories() {
		return [ 'element-pack' ];
	}

	public function get_keywords() {
		return [ 'card', 'slider', 'fancy', 'slideshow', 'advanced' ];
	}

	public function get_style_depends() {
		return [ 'ep-fancy-slider' ];
	}

	public function get_script_depends() {
		return [ 'imagesloaded', 'ep-fancy-slider' ];
	}

	public function get_custom_help_url() {
		return 'https://youtu.be/UGBnjbp90eA';
	}

	protected function _register_controls() {
		$this->register_query_section_controls();
	}

	private function register_query_section_controls() {

		$this->start_controls_section(
			'section_content_sliders',
			[
				'label' => esc_html__( 'Slider Items', 'bdthemes-element-pack' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'slides',
			[
				'label' => esc_html__( 'Item', 'bdthemes-element-pack' ),
				'type' => Controls_Manager::REPEATER,
				'default' => [
					[
						'title' => esc_html__( 'Fancy Slider Item One', 'bdthemes-element-pack' ),
						'slide_image' => ['url' => BDTEP_ASSETS_URL . 'images/gallery/item-4.png'],
					],
					[
						'title' => esc_html__( 'Fancy Slider Item Two', 'bdthemes-element-pack' ),
						'slide_image' => ['url' => BDTEP_ASSETS_URL . 'images/gallery/item-6.png']
					],
					[
						'title' => esc_html__( 'Fancy Slider Item Three', 'bdthemes-element-pack' ),
						'slide_image' => ['url' => BDTEP_ASSETS_URL . 'images/gallery/item-7.png']
					],
				],
				'fields' => [
					
					[
						'name'        => 'sub_title',
						'label'       => esc_html__( 'Sub Title', 'bdthemes-element-pack' ),
						'type'        => Controls_Manager::TEXT,
						'default'     => esc_html__( 'Subtitle Goes Here' , 'bdthemes-element-pack' ),
						'label_block' => true,
						'dynamic'     => [ 'active' => true ],
					],

					[
						'name'        => 'title',
						'label'       => esc_html__( 'Title', 'bdthemes-element-pack' ),
						'type'        => Controls_Manager::TEXT,
						'default'     => esc_html__( 'Slide Title Here' , 'bdthemes-element-pack' ),
						'label_block' => true,
						'dynamic'     => [ 'active' => true ],
					],
					
					[
						'name'          => 'title_link',
						'label'         => esc_html__( 'Title Link', 'bdthemes-element-pack' ),
						'type'          => Controls_Manager::URL,
						'default'       => ['url' => ''],
						'show_external' => false,
						'dynamic'       => [ 'active' => true ],
						'condition'     => [
							'title!' => ''
						]
					],

					[
						'name'        => 'description',
						'label'       => esc_html__( 'Description', 'bdthemes-element-pack' ),
						'type'        => Controls_Manager::TEXTAREA,
						'default'     => esc_html__( 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?' , 'bdthemes-element-pack' ),
						'label_block' => true,
						'dynamic'     => [ 'active' => true ],
					],

					[
						'name'        => 'slide_button',
						'label'       => esc_html__( 'Button Text', 'bdthemes-element-pack' ),
						'type'        => Controls_Manager::TEXT,
						'default'     => esc_html__( 'Read More' , 'bdthemes-element-pack' ),
						'label_block' => true,
						'dynamic'     => [ 'active' => true ],
					],
					
					[
						'name'          => 'button_link',
						'label'         => esc_html__( 'Button Link', 'bdthemes-element-pack' ),
						'type'          => Controls_Manager::URL,
						'default'       => ['url' => '#'],
						'show_external' => false,
						'dynamic'       => [ 'active' => true ],
						'condition'     => [
							'slide_button!' => ''
						]
					],

					[
						'name'    => 'slide_image',
						'label'   => esc_html__( 'Image', 'bdthemes-element-pack' ),
						'type'    => Controls_Manager::MEDIA,
						'dynamic' => [ 'active' => true ],
						'default' => [
							'url' => BDTEP_ASSETS_URL . 'images/gallery/item-'.rand(1,3).'.png',
						],
					],

				],
				'title_field' => '{{{ title }}}',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_content_fancy_slider',
			[
				'label' => esc_html__( 'Fancy Slider', 'bdthemes-element-pack' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			[
				'name'         => 'thumbnail_size',
				'label'        => esc_html__( 'Image Size', 'bdthemes-element-pack' ),
				'exclude'      => [ 'custom' ],
				'default'      => 'full',
				'prefix_class' => 'bdt-fancy-slider--thumbnail-size-',
			]
		);

		$this->add_responsive_control(
			'slide_text_align',
			[
				'label'   => __( 'Alignment', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => [
					'left' => [
						'title' => __( 'Left', 'bdthemes-element-pack' ),
						'icon'  => 'fas fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'bdthemes-element-pack' ),
						'icon'  => 'fas fa-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'bdthemes-element-pack' ),
						'icon'  => 'fas fa-align-right',
					],
					'justify' => [
						'title' => __( 'Justified', 'bdthemes-element-pack' ),
						'icon'  => 'fas fa-align-justify',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'show_subtitle',
			[
				'label'   => esc_html__( 'Show Sub Title', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->add_control(
			'show_title',
			[
				'label'   => esc_html__( 'Show Title', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->add_control(
			'show_description',
			[
				'label'   => esc_html__( 'Show Description', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->add_control(
			'show_button',
			[
				'label'   => esc_html__( 'Show Button', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->add_control(
			'show_slide_image',
			[
				'label'   => esc_html__( 'Show Slide Iamge', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_content_navigation',
			[
				'label' => __( 'Navigation', 'bdthemes-element-pack' ),
			]
		);

		$this->add_control(
			'navigation',
			[
				'label'   => __( 'Navigation', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'arrows',
				'options' => [
					'both'            => esc_html__( 'Arrows and Dots', 'bdthemes-element-pack' ),
					'arrows-fraction' => esc_html__( 'Arrows and Fraction', 'bdthemes-element-pack' ),
					'arrows'          => esc_html__( 'Arrows', 'bdthemes-element-pack' ),
					'dots'            => esc_html__( 'Dots', 'bdthemes-element-pack' ),
					'progressbar'     => esc_html__( 'Progress', 'bdthemes-element-pack' ),
					'none'            => esc_html__( 'None', 'bdthemes-element-pack' ),
				],
				'prefix_class' => 'bdt-navigation-type-',
				'render_type' => 'template',				
			]
		);
		
		$this->add_control(
			'both_position',
			[
				'label'     => __( 'Arrows and Dots Position', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'center',
				'options'   => element_pack_navigation_position(),
				'condition' => [
					'navigation' => 'both',
				],
				
			]
		);

		$this->add_control(
			'arrows_fraction_position',
			[
				'label'     => __( 'Arrows and Fraction Position', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'center',
				'options'   => element_pack_navigation_position(),
				'condition' => [
					'navigation' => 'arrows-fraction',
				],
				
			]
		);

		$this->add_control(
			'arrows_position',
			[
				'label'     => __( 'Arrows Position', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'center',
				'options'   => element_pack_navigation_position(),
				'condition' => [
					'navigation' => 'arrows',
				],
				
			]
		);

		$this->add_control(
			'dots_position',
			[
				'label'     => __( 'Dots Position', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'default-center',
				'options'   => [
					'top-left'       => esc_html__('Top Left', 'bdthemes-element-pack'),
					'top-center'     => esc_html__('Top Center', 'bdthemes-element-pack'),
					'top-right'      => esc_html__('Top Right', 'bdthemes-element-pack'),
					'default-center' => esc_html__('Center', 'bdthemes-element-pack'),
					'bottom-left'    => esc_html__('Bottom Left', 'bdthemes-element-pack'),
					'bottom-center'  => esc_html__('Bottom Center', 'bdthemes-element-pack'),
					'bottom-right'   => esc_html__('Bottom Right', 'bdthemes-element-pack'),
				],
				'condition' => [
					'navigation' => 'dots',
				],				
			]
		);

		$this->add_control(
			'progress_position',
			[
				'label'   => __( 'Progress Position', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'bottom',
				'options' => [
					'bottom' => esc_html__('Bottom', 'bdthemes-element-pack'),
					'top'    => esc_html__('Top', 'bdthemes-element-pack'),
				],
				'condition' => [
					'navigation' => 'progressbar',
				],
				
			]
		);

		$this->add_control(
			'hide_arrow_on_mobile',
			[
				'label'     => __( 'Hide Arrow on Mobile ?', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'condition' => [
					'navigation' => [ 'arrows-fraction', 'arrows', 'both' ],
				],				
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_carousel_settings',
			[
				'label' => __( 'Carousel Settings', 'bdthemes-element-pack' ),
			]
		);

		$this->add_control(
			'autoplay',
			[
				'label'   => __( 'Autoplay', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
				
			]
		);

		$this->add_control(
			'autoplay_speed',
			[
				'label'     => esc_html__( 'Autoplay Speed', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::NUMBER,
				'default'   => 5000,
				'condition' => [
					'autoplay' => 'yes',
				],
			]
		);

		$this->add_control(
			'pauseonhover',
			[
				'label' => esc_html__( 'Pause on Hover', 'bdthemes-element-pack' ),
				'type'  => Controls_Manager::SWITCHER,
			]
		);

		$this->add_control(
			'slides_to_scroll',
			[
				'type'      => Controls_Manager::SELECT,
				'label'     => esc_html__( 'Slides to Scroll', 'bdthemes-element-pack' ),
				'options'   => [
					1 => '1',
					2 => '2',
					3 => '3',
					4 => '4',
					5 => '5',
					6 => '6',
				],
				'default'   => '1',
			]
		);

		$this->add_control(
			'loop',
			[
				'label'   => __( 'Loop', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
				
			]
		);


		$this->add_control(
			'speed',
			[
				'label'   => __( 'Animation Speed (ms)', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 500,
				],
				'range' => [
					'min'  => 100,
					'max'  => 5000,
					'step' => 50,
				],
			]
		);

		$this->add_control(
			'observer',
			[
				'label'       => __( 'Observer', 'bdthemes-element-pack' ),
				'description' => __( 'When you use carousel in any hidden place (in tabs, accordion etc) keep it yes.', 'bdthemes-element-pack' ),
				'type'        => Controls_Manager::SWITCHER,				
			]
		);

		$this->end_controls_section();


		//Style
		$this->start_controls_section(
			'section_style_slider',
			[
				'label' => esc_html__( 'Slider Item', 'bdthemes-element-pack' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'item_background',
			[
				'label'     => esc_html__( 'Background', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item' => 'background-color: {{VALUE}};'
				]
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'item_border',
				'label'       => esc_html__( 'Border', 'bdthemes-element-pack' ),
				'selector'    => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item',
			]
		);

		$this->add_control(
			'item_border_radius',
			[
				'label'      => esc_html__( 'Border Radius', 'bdthemes-element-pack' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'item_content_padding',
			[
				'label'      => esc_html__( 'Padding', 'bdthemes-element-pack' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_iamge',
			[
				'label'     => esc_html__( 'Image', 'bdthemes-element-pack' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_slide_image' => [ 'yes' ],
				],
			]
		);

		$this->add_control(
			'show_background_overlay',
			[
				'label'   => esc_html__( 'Background Overlay ?', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SWITCHER,
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'     => 'image_background',
				'types'    => [ 'gradient' ],
				'selector' => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image:after',
				'condition' => [
					'show_background_overlay' => 'yes',
				],
			]
		);

		$this->add_control(
			'iamge_bg_color',
			[
				'label'     => esc_html__( 'Background', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image' => 'background: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'iamge_border',
				'label'       => esc_html__( 'Border', 'bdthemes-element-pack' ),
				'separator'	  => 'before',
				'selector'    => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image, {{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image img',
			]
		);

		$this->add_control(
			'iamge_border_radius',
			[
				'label'      => esc_html__( 'Border Radius', 'bdthemes-element-pack' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image, {{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image img, {{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image:after' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'iamge_box_shadow',
				'selector' => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image, {{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-slide-image img',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_title',
			[
				'label'     => esc_html__( 'Title', 'bdthemes-element-pack' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_title' => [ 'yes' ],
				],
			]
		);

		$this->add_control(
			'title_color',
			[
				'label'     => esc_html__( 'Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-title' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'title_spacing',
			[
				'label'     => esc_html__( 'Spacing', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-title' => 'padding-bottom: {{SIZE}}{{UNIT}}',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'title_typography',
				'label'    => esc_html__( 'Typography', 'bdthemes-element-pack' ),
				'selector' => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-title',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_sub_title',
			[
				'label'     => esc_html__( 'Subtitle', 'bdthemes-element-pack' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_subtitle' => [ 'yes' ],
				],
			]
		);

		$this->add_control(
			'sub_title_color',
			[
				'label'     => esc_html__( 'Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-subtitle' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'sub_title_spacing',
			[
				'label'     => esc_html__( 'Spacing', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-subtitle' => 'margin-bottom: {{SIZE}}{{UNIT}}',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'sub_title_typography',
				'label'    => esc_html__( 'Typography', 'bdthemes-element-pack' ),
				'selector' => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-subtitle',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_description',
			[
				'label'     => esc_html__( 'Description', 'bdthemes-element-pack' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_description' => [ 'yes' ],
				],
			]
		);

		$this->add_control(
			'description_color',
			[
				'label'     => esc_html__( 'Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-description' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'description_spacing',
			[
				'label'     => esc_html__( 'Spacing', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-description' => 'padding-bottom: {{SIZE}}{{UNIT}}',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'description_typography',
				'label'    => esc_html__( 'Typography', 'bdthemes-element-pack' ),
				'selector' => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-description',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_button',
			[
				'label'     => esc_html__( 'Button', 'bdthemes-element-pack' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_button' => 'yes',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_button_style' );

		$this->start_controls_tab(
			'tab_button_normal',
			[
				'label' => esc_html__( 'Normal', 'bdthemes-element-pack' ),
			]
		);

		$this->add_control(
			'button_text_color',
			[
				'label'     => esc_html__( 'Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'     => 'button_background',
				'types'    => [ 'gradient' ],
				'selector' => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a',
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'button_box_shadow',
				'selector' => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'button_border',
				'label'       => esc_html__( 'Border', 'bdthemes-element-pack' ),
				'selector'    => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a',
				'separator'   => 'before',
			]
		);

		$this->add_control(
			'button_border_radius',
			[
				'label'      => esc_html__( 'Border Radius', 'bdthemes-element-pack' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition' => [
					'border_radius_advanced_show!' => 'yes',
				],
			]
		);

		$this->add_control(
			'border_radius_advanced_show',
			[
				'label' => __( 'Advanced Radius', 'bdthemes-element-pack' ),
				'type'  => Controls_Manager::SWITCHER,
			]
		);

		$this->add_control(
			'border_radius_advanced',
			[
				'label'       => esc_html__('Radius', 'bdthemes-element-pack'),
				'description' => sprintf(__('For example: <b>%1s</b> or Go <a href="%2s" target="_blank">this link</a> and copy and paste the radius value.', 'bdthemes-element-pack'), '30% 70% 82% 18% / 46% 62% 38% 54%', 'https://9elements.github.io/fancy-border-radius/'),
				'type'        => Controls_Manager::TEXT,
				'size_units'  => [ 'px', '%' ],
				'separator'   => 'after',
				'default'     => '30% 70% 82% 18% / 46% 62% 38% 54%',
				'selectors'   => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a'     => 'border-radius: {{VALUE}}; overflow: hidden;',
				],
				'condition' => [
					'border_radius_advanced_show' => 'yes',
				],
			]
		);

		$this->add_control(
			'button_padding',
			[
				'label'      => esc_html__( 'Padding', 'bdthemes-element-pack' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'button_typography',
				'label'     => esc_html__( 'Typography', 'bdthemes-element-pack' ),
				'selector'  => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_button_hover',
			[
				'label' => esc_html__( 'Hover', 'bdthemes-element-pack' ),
			]
		);

		$this->add_control(
			'button_hover_color',
			[
				'label'     => esc_html__( 'Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a:hover'  => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'      => 'button_hover_background',
				'types'    => [ 'gradient' ],
				'selector'  => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a:hover',
			]
		);

		$this->add_control(
			'button_hover_border_color',
			[
				'label'     => esc_html__( 'Border Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'condition' => [
					'button_border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a:hover' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'button_hover_box_shadow',
				'selector' => '{{WRAPPER}} .bdt-fancy-slider .swiper-wrapper .bdt-fancy-slider-item .bdt-fancy-slider-content .bdt-fancy-slider-button a:hover',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_navigation',
			[
				'label'     => __( 'Navigation', 'bdthemes-element-pack' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'navigation' => [ 'arrows', 'dots', 'both', 'arrows-fraction', 'progressbar' ],
				],
			]
		);

		$this->add_control(
			'arrows_size',
			[
				'label' => __( 'Arrows Size', 'bdthemes-element-pack' ),
				'type'  => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 20,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev svg,
					{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next svg' => 'height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}}',
				],
				'condition' => [
					'navigation!' => [ 'dots', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'arrows_background',
			[
				'label'     => __( 'Background Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev, {{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'navigation!' => [ 'dots', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'arrows_hover_background',
			[
				'label'     => __( 'Hover Background Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev:hover, {{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next:hover' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'navigation!' => [ 'dots', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'arrows_color',
			[
				'label'     => __( 'Arrows Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev svg, {{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next svg' => 'color: {{VALUE}}',
				],
				'condition' => [
					'navigation!' => [ 'dots', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'arrows_hover_color',
			[
				'label'     => __( 'Arrows Hover Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev:hover svg, {{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next:hover svg' => 'color: {{VALUE}}',
				],
				'condition' => [
					'navigation!' => [ 'dots', 'progressbar', 'none' ],
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
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev' => 'margin-right: {{SIZE}}px;',
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next' => 'margin-left: {{SIZE}}px;',
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'both',
						],
						[
							'name'     => 'both_position',
							'operator' => '!=',
							'value'    => 'center',
						],
					],
				],
			]
		);

		$this->add_responsive_control(
			'arrows_padding',
			[
				'label' => esc_html__( 'Padding', 'bdthemes-element-pack' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev, {{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'border_radius',
			[
				'label'      => __( 'Border Radius', 'bdthemes-element-pack' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'separator'  => 'after',
				'selectors'  => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev, {{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition' => [
					'navigation!' => [ 'dots', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'dots_size',
			[
				'label' => __( 'Dots Size', 'bdthemes-element-pack' ),
				'type'  => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 5,
						'max' => 20,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-bullet' => 'height: {{SIZE}}{{UNIT}};width: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'navigation!' => [ 'arrows', 'arrows-fraction', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'dots_color',
			[
				'label'     => __( 'Dots Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-bullet' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'navigation!' => [ 'arrows', 'arrows-fraction', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'active_dot_color',
			[
				'label'     => __( 'Active Dots Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'after',
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-bullet-active' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'navigation!' => [ 'arrows', 'arrows-fraction', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'fraction_color',
			[
				'label'     => __( 'Fraction Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-fraction' => 'color: {{VALUE}}',
				],
				'condition' => [
					'navigation!' => [ 'arrows', 'dots', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'active_fraction_color',
			[
				'label'     => __( 'Active Fraction Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-current' => 'color: {{VALUE}}',
				],
				'condition' => [
					'navigation!' => [ 'arrows', 'dots', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'fraction_typography',
				'label'     => esc_html__( 'Typography', 'bdthemes-element-pack' ),
				'selector'  => '{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-fraction',
				'condition' => [
					'navigation!' => [ 'arrows', 'dots', 'progressbar', 'none' ],
				],
			]
		);

		$this->add_control(
			'progresbar_color',
			[
				'label'     => __( 'Bar Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-progressbar' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'navigation' => 'progressbar',
				],
			]
		);

		$this->add_control(
			'progres_color',
			[
				'label'     => __( 'Progress Color', 'bdthemes-element-pack' ),
				'type'      => Controls_Manager::COLOR,
				'separator' => 'after',
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-progressbar .swiper-pagination-progressbar-fill' => 'background: {{VALUE}}',
				],
				'condition' => [
					'navigation' => 'progressbar',
				],
			]
		);

		$this->add_control(
			'arrows_ncx_position',
			[
				'label'   => __( 'Horizontal Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'arrows',
						],
						[
							'name'     => 'arrows_position',
							'operator' => '!=',
							'value'    => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'arrows_ncy_position',
			[
				'label'   => __( 'Vertical Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 40,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-arrows-container' => 'transform: translate({{arrows_ncx_position.size}}px, {{SIZE}}px);',
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'arrows',
						],
						[
							'name'     => 'arrows_position',
							'operator' => '!=',
							'value'    => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'arrows_acx_position',
			[
				'label'   => __( 'Horizontal Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => -60,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev' => 'left: {{SIZE}}px;',
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next' => 'right: {{SIZE}}px;',
				],
				'conditions' => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'arrows',
						],
						[
							'name'  => 'arrows_position',
							'value' => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'dots_nnx_position',
			[
				'label'   => __( 'Horizontal Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'dots',
						],
						[
							'name'     => 'dots_position',
							'operator' => '!=',
							'value'    => '',
						],
					],
				],
			]
		);

		$this->add_control(
			'dots_nny_position',
			[
				'label'   => __( 'Vertical Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 30,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-dots-container' => 'transform: translate({{dots_nnx_position.size}}px, {{SIZE}}px);',
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'dots',
						],
						[
							'name'     => 'dots_position',
							'operator' => '!=',
							'value'    => '',
						],
					],
				],
			]
		);

		$this->add_control(
			'both_ncx_position',
			[
				'label'   => __( 'Horizontal Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'both',
						],
						[
							'name'     => 'both_position',
							'operator' => '!=',
							'value'    => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'both_ncy_position',
			[
				'label'   => __( 'Vertical Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 40,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-arrows-dots-container' => 'transform: translate({{both_ncx_position.size}}px, {{SIZE}}px);',
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'both',
						],
						[
							'name'     => 'both_position',
							'operator' => '!=',
							'value'    => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'both_cx_position',
			[
				'label'   => __( 'Arrows Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => -60,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev' => 'left: {{SIZE}}px;',
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next' => 'right: {{SIZE}}px;',
				],
				'conditions' => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'both',
						],
						[
							'name'  => 'both_position',
							'value' => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'both_cy_position',
			[
				'label'   => __( 'Dots Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 30,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-dots-container' => 'transform: translateY({{SIZE}}px);',
				],
				'conditions' => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'both',
						],
						[
							'name'  => 'both_position',
							'value' => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'arrows_fraction_ncx_position',
			[
				'label'   => __( 'Horizontal Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'arrows-fraction',
						],
						[
							'name'     => 'arrows_fraction_position',
							'operator' => '!=',
							'value'    => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'arrows_fraction_ncy_position',
			[
				'label'   => __( 'Vertical Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 40,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-arrows-dots-container' => 'transform: translate({{arrows_fraction_ncx_position.size}}px, {{SIZE}}px);',
				],
				'conditions'   => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'arrows-fraction',
						],
						[
							'name'     => 'arrows_fraction_position',
							'operator' => '!=',
							'value'    => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'arrows_fraction_cx_position',
			[
				'label'   => __( 'Arrows Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => -60,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-prev' => 'left: {{SIZE}}px;',
					'{{WRAPPER}} .bdt-fancy-slider .bdt-navigation-next' => 'right: {{SIZE}}px;',
				],
				'conditions' => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'arrows-fraction',
						],
						[
							'name'  => 'arrows_fraction_position',
							'value' => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'arrows_fraction_cy_position',
			[
				'label'   => __( 'Fraction Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 30,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-fraction' => 'transform: translateY({{SIZE}}px);',
				],
				'conditions' => [
					'terms' => [
						[
							'name'  => 'navigation',
							'value' => 'arrows-fraction',
						],
						[
							'name'  => 'arrows_fraction_position',
							'value' => 'center',
						],
					],
				],
			]
		);

		$this->add_control(
			'progress_y_position',
			[
				'label'   => __( 'Progress Offset', 'bdthemes-element-pack' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 15,
				],
				'range' => [
					'px' => [
						'min' => -200,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-fancy-slider .swiper-pagination-progressbar' => 'transform: translateY({{SIZE}}px);',
				],
				'condition' => [
					'navigation' => 'progressbar',
				],
			]
		);

		$this->end_controls_section();

	}

	public function render_header() {
		$settings        = $this->get_settings_for_display();
		$id              = 'bdt-fancy-slider-' . $this->get_id();

		$elementor_vp_lg = get_option( 'elementor_viewport_lg' );
		$elementor_vp_md = get_option( 'elementor_viewport_md' );
		$viewport_lg     = !empty($elementor_vp_lg) ? $elementor_vp_lg - 1 : 1023;
		$viewport_md     = !empty($elementor_vp_md) ? $elementor_vp_md - 1 : 767;
		
		$this->add_render_attribute( 'fancy-slider', 'id', $id );
		$this->add_render_attribute( 'fancy-slider', 'class', 'bdt-fancy-slider');

		if ('arrows' == $settings['navigation']) {
			$this->add_render_attribute( 'fancy-slider', 'class', 'bdt-arrows-align-'. $settings['arrows_position'] );
		} elseif ('dots' == $settings['navigation']) {
			$this->add_render_attribute( 'fancy-slider', 'class', 'bdt-dots-align-'. $settings['dots_position'] );
		} elseif ('both' == $settings['navigation']) {
			$this->add_render_attribute( 'fancy-slider', 'class', 'bdt-arrows-dots-align-'. $settings['both_position'] );
		} elseif ('arrows-fraction' == $settings['navigation']) {
			$this->add_render_attribute( 'fancy-slider', 'class', 'bdt-arrows-dots-align-'. $settings['arrows_fraction_position'] );
		}

		if ('arrows-fraction' == $settings['navigation'] ) {
			$pagination_type = 'fraction';
		} elseif ('both' == $settings['navigation'] or 'dots' == $settings['navigation']) {
			$pagination_type = 'bullets';
		} elseif ('progressbar' == $settings['navigation'] ) {
			$pagination_type = 'progressbar';
		} else {
			$pagination_type = '';
		}

		$this->add_render_attribute(
			[
				'fancy-slider' => [
					'data-settings' => [
						wp_json_encode(array_filter([
							"autoplay"       => ( "yes" == $settings["autoplay"] ) ? [ "delay" => $settings["autoplay_speed"] ] : false,
							"loop"           => ($settings["loop"] == "yes") ? true : false,
							"speed"          => $settings["speed"]["size"],
							"effect"         => 'fade',
							"lazy"           => true,
							"pauseOnHover"   => ("yes" == $settings["pauseonhover"]) ? true : false,
							"slidesPerView"  => 1,
							"slidesPerGroup" => ($settings["slides_to_scroll"] > 1) ? $settings["slides_to_scroll"] : false,
							"observer"       => ($settings["observer"]) ? true : false,
							"observeParents" => ($settings["observer"]) ? true : false,
			      	        "navigation" => [
			      				"nextEl" => "#" . $id . " .bdt-navigation-next",
			      				"prevEl" => "#" . $id . " .bdt-navigation-prev",
			      			],
			      			"pagination" => [
								"el"             => "#" . $id . " .swiper-pagination",
								"type"           => $pagination_type,
								"clickable"      => "true",
							],
				        ]))
					]
				]
			]
		);

		?>
		<div <?php echo $this->get_render_attribute_string( 'fancy-slider' ); ?>>
			<div class="swiper-container">
				<div class="swiper-wrapper">
		<?php
	}

	protected function render_both_navigation() {
		$settings = $this->get_settings_for_display();
		$hide_arrow_on_mobile = $settings['hide_arrow_on_mobile'] ? 'bdt-visible@m' : '';
		
		?>
		<div class="bdt-position-z-index bdt-position-<?php echo esc_attr($settings['both_position']); ?>">
			<div class="bdt-arrows-dots-container bdt-slidenav-container ">
				
				<div class="bdt-flex bdt-flex-middle">
					<div class="<?php echo esc_attr( $hide_arrow_on_mobile ); ?>">
						<a href="" class="bdt-navigation-prev bdt-slidenav-previous bdt-icon bdt-slidenav" bdt-icon="icon: chevron-left; ratio: 1.9"></a>
					</div>

					<?php if ('center' !== $settings['both_position']) : ?>
						<div class="swiper-pagination"></div>
					<?php endif; ?>
					
					<div class="<?php echo esc_attr( $hide_arrow_on_mobile ); ?>">
						<a href="" class="bdt-navigation-next bdt-slidenav-next bdt-icon bdt-slidenav" bdt-icon="icon: chevron-right; ratio: 1.9"></a>
					</div>
					
				</div>
			</div>
		</div>		
		<?php
	}

	protected function render_arrows_fraction() {
		$settings             = $this->get_settings_for_display();
		$hide_arrow_on_mobile = $settings['hide_arrow_on_mobile'] ? 'bdt-visible@m' : '';
		
		?>
		<div class="bdt-position-z-index bdt-position-<?php echo esc_attr($settings['arrows_fraction_position']); ?>">
			<div class="bdt-arrows-dots-container bdt-slidenav-container ">
				
				<div class="bdt-flex bdt-flex-middle">
					<div class="<?php echo esc_attr( $hide_arrow_on_mobile ); ?>">
						<a href="" class="bdt-navigation-prev bdt-slidenav-previous bdt-icon bdt-slidenav" bdt-icon="icon: chevron-left; ratio: 1.9"></a>
					</div>

					<?php if ('center' !== $settings['arrows_fraction_position']) : ?>
						<div class="swiper-pagination"></div>
					<?php endif; ?>
					
					<div class="<?php echo esc_attr( $hide_arrow_on_mobile ); ?>">
						<a href="" class="bdt-navigation-next bdt-slidenav-next bdt-icon bdt-slidenav" bdt-icon="icon: chevron-right; ratio: 1.9"></a>
					</div>
					
				</div>
			</div>
		</div>		
		<?php
	}

	protected function render_navigation() {
		$settings = $this->get_settings_for_display();
		$hide_arrow_on_mobile = $settings['hide_arrow_on_mobile'] ? ' bdt-visible@m' : '';
		
		if ( 'arrows' == $settings['navigation'] ) : ?>
			<div class="bdt-position-z-index bdt-position-<?php echo esc_attr( $settings['arrows_position'] . $hide_arrow_on_mobile ); ?>">
				<div class="bdt-arrows-container bdt-slidenav-container">
					<a href="" class="bdt-navigation-prev bdt-slidenav-previous bdt-icon bdt-slidenav" bdt-icon="icon: chevron-left; ratio: 1.9"></a>
					<a href="" class="bdt-navigation-next bdt-slidenav-next bdt-icon bdt-slidenav" bdt-icon="icon: chevron-right; ratio: 1.9"></a>
				</div>
			</div>
		<?php endif;
	}

	protected function render_pagination() {
		$settings = $this->get_settings_for_display();
		
		if ( 'dots' == $settings['navigation'] or 'arrows-fraction' == $settings['navigation'] ) : ?>
			<div class="bdt-position-z-index bdt-position-<?php echo esc_attr($settings['dots_position']); ?>">
				<div class="bdt-dots-container">
					<div class="swiper-pagination"></div>
				</div>
			</div>

		<?php elseif ( 'progressbar' == $settings['navigation'] ) : ?>
			<div class="swiper-pagination bdt-position-z-index bdt-position-<?php echo esc_attr($settings['progress_position']); ?>"></div>
		<?php endif;
	}

	public function render_footer() {
		$settings = $this->get_settings_for_display();
		
		?>
				</div>
			</div>
			
			<?php if ('both' == $settings['navigation']) : ?>
				<?php $this->render_both_navigation(); ?>
				<?php if ( 'center' === $settings['both_position'] ) : ?>
					<div class="bdt-dots-container">
						<div class="swiper-pagination"></div>
					</div>
				<?php endif; ?>
			<?php elseif ('arrows-fraction' == $settings['navigation']) : ?>
				<?php $this->render_arrows_fraction(); ?>
				<?php if ( 'center' === $settings['arrows_fraction_position'] ) : ?>
					<div class="bdt-dots-container">
						<div class="swiper-pagination"></div>
					</div>
				<?php endif; ?>
			<?php else : ?>			
				<?php $this->render_pagination(); ?>
				<?php $this->render_navigation(); ?>
			<?php endif; ?>
			
		</div>

		<?php
	}

	protected function rendar_item_image( $content ) {
        $settings = $this->get_settings_for_display();
        $thumb_url = Group_Control_Image_Size::get_attachment_image_src( $content['slide_image']['id'], 'thumbnail_size', $settings);

        if ( ! $thumb_url ) {
        	$thumb_url = $content['slide_image']['url'];
        }

		?>

            <img src="<?php echo esc_url( $thumb_url); ?>" alt="<?php echo esc_html( $content['title'] ); ?>">

        <?php
	}

	protected function rendar_item_content($content) {
		$settings = $this->get_settings_for_display();

		?>
		
				<div class="bdt-fancy-slider-image">
					<?php if ($content['slide_image'] && ( 'yes' == $settings['show_slide_image'] )) : ?>
						<div class="bdt-slide-image swiper-lazy">
							<?php $this->rendar_item_image($content); ?>
							<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
						</div>
					<?php endif; ?>
				</div>

				<div class="bdt-fancy-slider-content">
					<?php if ($content['sub_title'] && ( 'yes' == $settings['show_subtitle'] )) : ?>
						<div class="bdt-fancy-slider-subtitle">
							<?php echo wp_kses_post($content['sub_title']); ?>
						</div>
					<?php endif; ?>
		
					<?php if ($content['title'] && ( 'yes' == $settings['show_title'] )) : ?>
						<h2 class="bdt-fancy-slider-title">
							<?php if ( '' !== $content['title_link']['url'] ) : ?>
								<a href="<?php echo esc_url( $content['title_link']['url'] ); ?>">
							<?php endif; ?>
								<?php echo wp_kses_post($content['title']); ?>
							<?php if ( '' !== $content['title_link']['url'] ) : ?>
								</a>
							<?php endif; ?>
						</h2>
					<?php endif; ?>
		
					<?php if ($content['description'] && ( 'yes' == $settings['show_description'] )) : ?>
						<div class="bdt-fancy-slider-description">
							<?php echo wp_kses_post($content['description']); ?>
						</div>
					<?php endif; ?>
		
					<?php if ($content['slide_button'] && ( 'yes' == $settings['show_button'] )) : ?>
						<div class="bdt-fancy-slider-button">
							<?php if ( '' !== $content['button_link']['url'] ) : ?>
								<a href="<?php echo esc_url( $content['button_link']['url'] ); ?>">
							<?php endif; ?>
								<?php echo wp_kses_post($content['slide_button']); ?>
							<?php if ( '' !== $content['button_link']['url'] ) : ?>
								</a>
							<?php endif; ?>
						</div>
					<?php endif; ?>
				</div>

		<?php
	}

	protected function render() {
		$settings         = $this->get_settings_for_display();

		$this->render_header();

			foreach ( $settings['slides'] as $slide ) : ?>
					    
					<div class="swiper-slide bdt-fancy-slider-item elementor-repeater-item-<?php echo esc_attr($slide['_id']); ?>">
					
						<?php $this->rendar_item_content($slide); ?>
						
			        </div>

				<?php endforeach;

		$this->render_footer();
	}
}
