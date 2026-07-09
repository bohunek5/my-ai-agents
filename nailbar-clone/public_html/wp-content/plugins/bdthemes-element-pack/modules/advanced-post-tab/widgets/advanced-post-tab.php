<?php

namespace ElementPack\Modules\AdvancedPostTab\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Image_Size;
use ElementPack\Modules\QueryControl\Controls\Group_Control_Posts;
use ElementPack\Modules\AdvancedPostTab\Advanced_Post_Tab_Helper;

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class Advanced_Post_Tab extends Widget_Base
{

    public function get_name()
    {
        return 'bdt-advanced-post-tab';
    }

    public function get_title()
    {
        return BDTEP . esc_html__('Advanced Post Tab', 'bdthemes-element-pack');
    }

    public function get_icon()
    {
        return 'bdt-wi-advanced-post-tab';
    }

    public function get_categories()
    {
        return ['element-pack'];
    }

    public function get_keywords()
    {
        return ['post', 'grid', 'blog', 'recent', 'news'];
    }

    public function get_style_depends()
    {
        return ['element-pack-font', 'ep-advanced-post-tab'];
    }

    public function get_script_depends() {
        return ['ep-advanced-post-tab' ];
    }

    public function on_import($element)
    {
        if (!get_post_type_object($element['settings']['posts_post_type'])) {
            $element['settings']['posts_post_type'] = 'post';
        }

        return $element;
    }

    public function on_export($element)
    {
        $element = Group_Control_Posts::on_export_remove_setting_from_element($element, 'posts');
        return $element;
    }

    protected function _register_controls()
    {
        $this->start_controls_section(
            'section_content_layout',
            [
                'label' => esc_html__('Layout', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'heading',
            [
                'label' => __('Heading for the grid', 'bdthemes-element-pack'),
                'type' => Controls_Manager::TEXT,
                'placeholder' => __('My Posts', 'bdthemes-element-pack'),
                'default' => __('My Posts', 'bdthemes-element-pack'),
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $this->add_control(
            'heading_tag',
            [
                'label' => __('Heading HTML Tag', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SELECT,
                'options' => [
                    'h1' => __('H1', 'bdthemes-element-pack'),
                    'h2' => __('H2', 'bdthemes-element-pack'),
                    'h3' => __('H3', 'bdthemes-element-pack'),
                    'h4' => __('H4', 'bdthemes-element-pack'),
                    'h5' => __('H5', 'bdthemes-element-pack'),
                    'h6' => __('H6', 'bdthemes-element-pack'),
                    'div' => __('div', 'bdthemes-element-pack'),
                ],
                'default' => 'h3',
            ]
        );

        $this->add_group_control(
            Group_Control_Image_Size::get_type(),
            [
                'name'         => 'thumbnail_size',
                'label'        => esc_html__( 'Image Size', 'bdthemes-element-pack' ),
                'exclude'      => [ 'custom' ],
                'default'      => 'large',
                'prefix_class' => 'bdt-advanced-post-tab-thumbnail-size-',
            ]
        );

        

        $this->add_control(
            'show_title',
            [
                'label' => esc_html__('Title', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_author',
            [
                'label' => esc_html__('Author', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_date',
            [
                'label' => esc_html__('Date', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_comments',
            [
                'label' => esc_html__('Comments', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_category',
            [
                'label' => esc_html__('Category', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_excerpt',
            [
                'label' => esc_html__('Excerpt', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'excerpt_length',
            [
                'label' => esc_html__('Excerpt Length', 'bdthemes-element-pack'),
                'type' => Controls_Manager::NUMBER,
                'default' => 15,
                'condition' => [
                    'show_excerpt' => 'yes',
                ]
            ]
        );

        $this->add_control(
            'show_readmore',
            [
                'label' => esc_html__('Read More', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'readmore_text',
            [
                'label' => esc_html__('Read More Text', 'bdthemes-element-pack'),
                'type' => Controls_Manager::TEXT,
                'default' => esc_html__('Read More', 'bdthemes-element-pack'),
                'placeholder' => esc_html__('Read More', 'bdthemes-element-pack'),
                'condition' => [
                    'show_readmore' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'post_grid_icon',
            [
                'label' => esc_html__('Icon', 'bdthemes-element-pack'),
                'type' => Controls_Manager::ICONS,
                'condition' => [
                    'show_readmore' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'icon_align',
            [
                'label' => esc_html__('Icon Position', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SELECT,
                'default' => 'right',
                'options' => [
                    'left' => esc_html__('Before', 'bdthemes-element-pack'),
                    'right' => esc_html__('After', 'bdthemes-element-pack'),
                ],
                'condition' => [
                    'post_grid_icon[value]!' => '',
                ],
            ]
        );

        $this->add_control(
            'icon_indent',
            [
                'label' => esc_html__('Icon Spacing', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 8,
                ],
                'range' => [
                    'px' => [
                        'max' => 50,
                    ],
                ],
                'condition' => [
                    'post_grid_icon[value]!' => '',
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-button-icon-align-right' => 'margin-left: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-button-icon-align-left' => 'margin-right: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();
        
        
        $this->start_controls_section(
            'section_content_query',
            [
                'label' => esc_html__('Query', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'post_types',
            [
                'label' => __('Post Types', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SELECT2,
                'default' => 'post',
                'options' => Advanced_Post_Tab_Helper::get_all_post_type_options(),
                'multiple' => true
            ]
        );

        $this->add_control(
            'tax_query_category',
            [
                'label'         => __('Categories', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SELECT2,
                'options'       => Advanced_Post_Tab_Helper::get_all_categories_options(),
                'multiple'      => true,
                'label_block'   => true
            ]
        );

        $this->add_control(
            'tax_query_tag',
            [
                'label'         => __('Tags', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SELECT2,
                'options'       => Advanced_Post_Tab_Helper::get_all_tags_options(),
                'multiple'      => true,
                'label_block'   => true
            ]
        );

        $this->add_control(
            'post_author',
            [
                'label'         => __('Authors', 'bdthemes-element-pack'),
                'type'          => Controls_Manager::SELECT2,
                'options'       => Advanced_Post_Tab_Helper::get_all_author_options(),
                'multiple'      => true,
                'label_block'   => true
            ]
        );

        $this->add_control(
            'taxonomy_filter',
            [
                'type' => Controls_Manager::SELECT,
                'label' => __('Choose the taxonomy to display and filter on.', 'bdthemes-element-pack'),
                'label_block' => true,
                'description' => __('Choose the taxonomy information to display for posts/portfolio and the taxonomy that is used to filter the portfolio/post. Takes effect only if no taxonomy filters are specified when building query.', 'bdthemes-element-pack'),
                'options' => Advanced_Post_Tab_Helper::get_taxonomies_map(),
                'default' => 'category',
            ]
        );

        $this->add_control(
            'posts_per_page',
            [
                'label' => __('Posts Per Page', 'bdthemes-element-pack'),
                'type' => Controls_Manager::NUMBER,
                'default' => 6
            ]
        );
        
        $this->add_control(
            'orderby',
            [
                'label' => __('Order By', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SELECT,
                'options' => array(
                    'none' => __('No order', 'bdthemes-element-pack'),
                    'ID' => __('Post ID', 'bdthemes-element-pack'),
                    'author' => __('Author', 'bdthemes-element-pack'),
                    'title' => __('Title', 'bdthemes-element-pack'),
                    'date' => __('Published date', 'bdthemes-element-pack'),
                    'modified' => __('Modified date', 'bdthemes-element-pack'),
                    'parent' => __('By parent', 'bdthemes-element-pack'),
                    'rand' => __('Random order', 'bdthemes-element-pack'),
                    'comment_count' => __('Comment count', 'bdthemes-element-pack'),
                    'menu_order' => __('Menu order', 'bdthemes-element-pack'),
                    'post__in' => __('By include order', 'bdthemes-element-pack'),
                ),
                'default' => 'date'
            ]
        );

        $this->add_control(
            'order',
            [
                'label' => __('Order', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SELECT,
                'options' => array(
                    'ASC' => __('Ascending', 'bdthemes-element-pack'),
                    'DESC' => __('Descending', 'bdthemes-element-pack'),
                ),
                'default' => 'DESC'
            ]
        );

        $this->add_control(
            'offset',
            [
                'label' => __('Offset', 'bdthemes-element-pack'),
                'description' => __('Number of posts to skip or pass over.', 'bdthemes-element-pack'),
                'type' => Controls_Manager::NUMBER,
                'default' => 0
            ]
        );

        $this->end_controls_section();

        //Style
        $this->start_controls_section(
            'section_style_item',
            [
                'label' => esc_html__('Item', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'image_primary_min_height',
            [
                'label' => esc_html__('Primary Item Height', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 10,
                        'max' => 500,
                        'step' => 10,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-primary .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-image' => 'min-height: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'image_secondary_min_height',
            [
                'label' => esc_html__('Secondary Item Height', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 10,
                        'max' => 500,
                        'step' => 10,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-secondary .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-image' => 'min-height: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'item_border_radius',
            [
                'label'      => __('Border Radius', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'item_box_shadow',
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item',
            ]
        );

        $this->add_control(
            'item_content_heading',
            [
                'label'      => __('Content Heading', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::HEADING,
                'separator'  => 'before',
            ]
        );

        $this->add_control(
            'description_background',
            [
                'label' => esc_html__('Background', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc' => 'background: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'desc_border_radius',
            [
                'label'      => __('Border Radius', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'description_padding',
            [
                'label'      => esc_html__('Padding', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style_title',
            [
                'label' => esc_html__('Title', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'show_title' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label' => esc_html__('Title Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-title a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'title_spacing',
            [
                'label' => esc_html__('Spacing', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-title' => 'margin-bottom: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'title_typography',
                'label' => esc_html__('Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-title',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'primary_title_typography',
                'label' => esc_html__('Primary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-primary .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-title',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'secondary_title_typography',
                'label' => esc_html__('Secondary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-secondary .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-title',

            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style_author',
            [
                'label' => esc_html__('Author', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'show_author' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'author_color',
            [
                'label' => esc_html__('Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-meta .bdt-post-tab-author a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'author_typography',
                'label' => esc_html__('Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-meta .bdt-post-tab-author a',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'primary_author_typography',
                'label' => esc_html__('Primary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-primary .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-author a',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'secondary_author_typography',
                'label' => esc_html__('Secondary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-secondary .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-author a',

            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style_date',
            [
                'label' => esc_html__('Date', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'show_date' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'date_color',
            [
                'label' => esc_html__('Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-meta .bdt-post-tab-date' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'date_divider_color',
            [
                'label' => esc_html__('Divider Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-meta .bdt-post-tab-date:before' => 'background: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'date_typography',
                'label' => esc_html__('Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-meta .bdt-post-tab-date',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'primary_date_typography',
                'label' => esc_html__('Primary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-primary .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-meta .bdt-post-tab-date',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'secondary_date_typography',
                'label' => esc_html__('Secondary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-secondary .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-meta .bdt-post-tab-date',

            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style_comments',
            [
                'label' => esc_html__('Comments', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'show_comments' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'comments_color',
            [
                'label' => esc_html__('Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-comments' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'comments_typography',
                'label' => esc_html__('Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-comments',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'primary_comments_typography',
                'label' => esc_html__('Primary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-primary .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-comments',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'secondary_comments_typography',
                'label' => esc_html__('Secondary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-secondary .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-comments',

            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style_category',
            [
                'label' => esc_html__('Category', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'show_category' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'category_color',
            [
                'label' => esc_html__('Category Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-category a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'category_background',
            [
                'label' => esc_html__('Background', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-category a' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'category_border_radius',
            [
                'label'      => __('Border Radius', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-category a' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'category_padding',
            [
                'label'      => esc_html__('Padding', 'bdthemes-element-pack'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-category a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'category_typography',
                'label' => esc_html__('Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-category a',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'primary_category_typography',
                'label' => esc_html__('Primary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-primary .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-category a',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'secondary_category_typography',
                'label' => esc_html__('Secondary Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-grid-secondary .bdt-post-tab-item .bdt-post-tab-img-wrap .bdt-post-tab-category a',

            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style_excerpt',
            [
                'label' => esc_html__('Excerpt', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'show_excerpt' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'excerpt_color',
            [
                'label' => esc_html__('Excerpt Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-excerpt' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'excerpt_spacing',
            [
                'label' => esc_html__('Spacing', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 15,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 2,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item:hover .bdt-post-tab-desc .bdt-post-tab-excerpt' => 'margin-top: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'excerpt_typography',
                'label' => esc_html__('Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-excerpt',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style_readmore',
            [
                'label' => esc_html__('Read More', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'show_readmore' => 'yes',
                ],
            ]
        );

        $this->start_controls_tabs('tabs_readmore_style');

        $this->start_controls_tab(
            'tab_readmore_normal',
            [
                'label' => esc_html__('Normal', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'readmore_color',
            [
                'label' => esc_html__('Text Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'readmore_background',
            [
                'label' => esc_html__('Background Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'readmore_border',
                'label' => esc_html__('Border', 'bdthemes-element-pack'),
                'placeholder' => '1px',
                'default' => '1px',
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a',
                'separator' => 'before',
            ]
        );

        $this->add_responsive_control(
            'readmore_border_radius',
            [
                'label' => esc_html__('Border Radius', 'bdthemes-element-pack'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'readmore_shadow',
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a',
            ]
        );

        $this->add_responsive_control(
            'readmore_padding',
            [
                'label' => esc_html__('Padding', 'bdthemes-element-pack'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
                'separator' => 'before',
            ]
        );

        $this->add_responsive_control(
            'readmore_spacing',
            [
                'label' => esc_html__('Spacing', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 2,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item:hover .bdt-post-tab-desc .bdt-post-tab-btn' => 'margin-top: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'readmore_typography',
                'label' => esc_html__('Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a',
            ]
        );

        $this->end_controls_tab();

        $this->start_controls_tab(
            'tab_readmore_hover',
            [
                'label' => esc_html__('Hover', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'readmore_hover_color',
            [
                'label' => esc_html__('Text Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a:hover' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a:hover svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'readmore_hover_background',
            [
                'label' => esc_html__('Background Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'readmore_hover_border_color',
            [
                'label' => esc_html__('Border Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'condition' => [
                    'readmore_border_border!' => '',
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-post-tab-item .bdt-post-tab-desc .bdt-post-tab-btn a:hover' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'readmore_hover_animation',
            [
                'label' => esc_html__('Animation', 'bdthemes-element-pack'),
                'type' => Controls_Manager::HOVER_ANIMATION,
            ]
        );

        $this->end_controls_tab();
        
        $this->end_controls_tabs();
        
        $this->end_controls_section();

        $this->start_controls_section(
            'section_style_filter_bar',
            [
                'label' => esc_html__('Filter Bar', 'bdthemes-element-pack'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'filter_bar_main_title_color',
            [
                'label' => esc_html__('Main Title Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tabs-main-title .bdt-widget-heading' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'filter_bar_main_title_typography',
                'label' => esc_html__('Main Title Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tabs-main-title .bdt-widget-heading',
            ]
        );

        $this->start_controls_tabs('tabs_filter_bar_style');

        $this->start_controls_tab(
            'tab_filter_bar_normal',
            [
                'label' => esc_html__('Normal', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'filter_bar_text_normal_color',
            [
                'label' => esc_html__('Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tab>*>a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'filter_bar_text_normal_border_color',
            [
                'label' => esc_html__('Border Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tab:before' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'filter_bar_text_normal_boreder_width',
            [
                'label' => esc_html__('Border Width', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 10,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tab:before' => 'border-bottom-width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'filter_bar_text_typography',
                'label' => esc_html__('Typography', 'bdthemes-element-pack'),
                'selector' => '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tab>*>a',
            ]
        );

        $this->end_controls_tab();

        $this->start_controls_tab(
            'tab_filter_bar_hover',
            [
                'label' => esc_html__('Hover', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'filter_bar_text_hover_color',
            [
                'label' => esc_html__('Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tab>*>a:hover, {{WRAPPER}} .bdt-advanced-post-tab .bdt-tab>*>a:focus' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_tab();

        $this->start_controls_tab(
            'tab_filter_bar_active',
            [
                'label' => esc_html__('Active', 'bdthemes-element-pack'),
            ]
        );

        $this->add_control(
            'filter_bar_text_active_color',
            [
                'label' => esc_html__('Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tab>.bdt-active>a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'filter_bar_text_active_border_color',
            [
                'label' => esc_html__('Border Color', 'bdthemes-element-pack'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tab>.bdt-active>a' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'filter_bar_text_active_boreder_width',
            [
                'label' => esc_html__('Border Width', 'bdthemes-element-pack'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 10,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bdt-advanced-post-tab .bdt-tab>*>a' => 'border-bottom-width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_tab();

        $this->end_controls_tabs();

        $this->end_controls_section();

    }

    protected function render()
    {

        $settings       = $this->get_settings_for_display();
        $query_args     = Advanced_Post_Tab_Helper::build_query_args($settings);
        $query_args     = apply_filters('ep_advanced_post_tab_' . $this->get_id() . '_query_args', $query_args, $settings);

        if(isset($query_args['posts_per_page']) && is_numeric($query_args['posts_per_page']) && $query_args['posts_per_page'] > 2){
            $query_args['posts_per_page'] = intval($query_args['posts_per_page']) - 1;
        }

        $postAuthor     = isset($settings['post_author']) ? $settings['post_author']: array();
        $author_args    = Advanced_Post_Tab_Helper::get_author_ids($postAuthor);
        $loop           = new \WP_Query($query_args);

//        dd($loop);
        // Loop through the posts and do something with them.
        if ($loop->have_posts()) :
            $dir = is_rtl() ? ' dir="rtl"' : '';

            // Check if any taxonomy filter has been applied
            list($chosen_terms, $taxonomies) = Advanced_Post_Tab_Helper::get_chosen_terms($query_args);

            if (empty($chosen_terms)){
                $taxonomies[] = $settings['taxonomy_filter'];
            }

            ?>
            <div class="bdt-advanced-post-tab">
            <?php wp_nonce_field( 'ajax-ep-advanced-post-tab-nonce', 'bdt-advanced-post-tab-sc' ); ?>
            <input type="hidden" class="bdt_spinner_message" value="<?php echo __('Please wait!','bdthemes-element-pack') ?>"/>
            <?php
            if (!empty($settings['heading'])):
                $header_class = (trim($settings['heading']) === '') ? ' d-none' : '';
                ?>
                <div class="bdt-tabs-main-title <?php echo esc_attr($header_class) ?>">
                    <?php
                    if (isset($settings['heading_tag'])) :
                        ?>
                        <<?php echo esc_attr($settings['heading_tag']) ?> class="bdt-widget-heading"><?php echo wp_kses_post($settings['heading']) ?></<?php echo esc_attr($settings['heading_tag']) ?>>
                        <?php
                    endif;
                    ?>
                </div>
                <?php
                endif;

                echo Advanced_Post_Tab_Helper::get_taxonomy_terms_filter($taxonomies, $chosen_terms, $author_args);
                ?>
                <div class="bdt-advanced-post-tab-wrapper bdt-switcher bdt-margin">
                    <div class="bdt-grid-row segment-0">
                        <div class="bdt-grid-small" bdt-grid>
                            <?php
                            $max_page_no    = $loop->max_num_pages;
                            $page_id        = get_the_ID();
                            $i              = 1;
                            while ($loop->have_posts()) : $loop->the_post();
                                $cols = ($i < 3) ? 2 : 3;
                                $bdt_post_class = ( $cols <= 2) ? ' bdt-post-grid-primary' : ' bdt-post-grid-secondary';
                                ?>
                                <div class="bdt-width-1-<?php echo esc_attr($cols) ?>@m <?php echo esc_attr($bdt_post_class); ?>">
                                    <?php include(BDTEP_MODULES_PATH . 'advanced-post-tab/template-parts/temp-item.php'); ?>
                                </div>
                                <?php
                                $i++;
                            endwhile;
                            ?>
                        </div>
                        <?php if($max_page_no > 1): ?>
                            <div class="bdt-advanced-post-tab-pagination">
                                <a data-paged="1" data-total="<?php echo esc_attr($loop->found_posts) ?>" data-page-id="<?php echo esc_attr($page_id) ?>" data-max-paged="<?php echo esc_attr($max_page_no) ?>" data-taxonomy="all" class="load-more-pagination" href="javascript:void()"><?php echo esc_html__('Load More', 'bdthemes-element-pack') ?></a>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
                <?php
                wp_reset_postdata();
            endif;
    }
}