<?php

namespace ElementPack\Modules\AdvancedPostTab;

use ElementPack\Base\Element_Pack_Module_Base;

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class Module extends Element_Pack_Module_Base
{

    public function get_name()
    {
        return 'advanced-post-tab';
    }

    public function get_widgets()
    {

        $widgets = [
            'Advanced_Post_Tab',
        ];

        return $widgets;
    }

    public function __construct()
    {
        parent::__construct();

        add_action('wp_ajax_nopriv_element_pack_ajax_advanced_post_tab', array($this, 'element_pack_ajax_advanced_post_tab'));
        add_action('wp_ajax_element_pack_ajax_advanced_post_tab', array($this, 'element_pack_ajax_advanced_post_tab'));

        add_action('wp_ajax_nopriv_element_pack_ajax_advanced_post_tab_load_more', array($this, 'element_pack_ajax_advanced_post_tab_load_more'));
        add_action('wp_ajax_element_pack_ajax_advanced_post_tab_load_more', array($this, 'element_pack_ajax_advanced_post_tab_load_more'));

        add_filter('element_pack_ajax_advanced_post_tab_ajax_load_taxonomy_settings_filter', array($this, 'ajax_load_settings_taxonomy_filter'), 10, 2);
    }

    public function element_pack_ajax_advanced_post_tab_load_more()
    {

        check_ajax_referer( 'ajax-ep-advanced-post-tab-nonce', 'security' );

        if ('POST' == $_SERVER['REQUEST_METHOD']) {
            $widgetId   = sanitize_text_field($_POST['widget_id']);
            $page_id    = intval($_POST['page_id']);
            $page_no    = intval($_POST['paged']);
            $taxonomy   = sanitize_text_field($_POST['taxonomy']);
            $settings   = $this->get_widget_settings($page_id, $widgetId);

            if ($taxonomy != 'all') {
                $settings = apply_filters('element_pack_ajax_advanced_post_tab_ajax_load_taxonomy_settings_filter', $settings, $taxonomy);
            }
            $query_args             = Advanced_Post_Tab_Helper::build_query_args($settings);
            $query_args['paged']    = $page_no;
            $query_args             = apply_filters('ep_advanced_post_tab_' . $widgetId . '_query_args', $query_args, $settings);
            $query_args['offset']   = $page_no * $query_args['posts_per_page'];
            $loop                   = new \WP_Query($query_args);
            ob_start();
            ?>
            <?php
            $max_page_no = $loop->max_num_pages;

            while ($loop->have_posts()) : $loop->the_post();
                ?>
                <div class="bdt-width-1-3@m bdt-post-grid-secondary">
                <?php include(BDTEP_MODULES_PATH . 'advanced-post-tab/template-parts/temp-item.php'); ?>
                </div><?php
            endwhile; ?>
            <?php
            $output = trim(ob_get_contents());
            ob_end_clean();
            echo wp_json_encode(array('data' => $output,'max_page_no'=>$max_page_no), 200);
        }
        exit;
    }

    public function element_pack_ajax_advanced_post_tab()
    {
        check_ajax_referer( 'ajax-ep-advanced-post-tab-nonce', 'security' );

        if ('POST' == $_SERVER['REQUEST_METHOD']) {
            $widgetId   = sanitize_text_field($_POST['widget_id']);
            $page_id    = intval($_POST['page_id']);
            $segment    = intval($_POST['segment']);
            $taxonomy   = sanitize_text_field($_POST['taxonomy']);
            $settings   = $this->get_widget_settings($page_id, $widgetId);

            $settings = apply_filters('element_pack_ajax_advanced_post_tab_ajax_load_taxonomy_settings_filter', $settings, $taxonomy);

            $query_args = Advanced_Post_Tab_Helper::build_query_args($settings);

            if(isset($query_args['posts_per_page']) && is_numeric($query_args['posts_per_page']) && $query_args['posts_per_page'] > 2){
                $query_args['posts_per_page'] = intval($query_args['posts_per_page']) - 1;
            }
            $query_args = apply_filters('ep_advanced_post_tab_' . $widgetId . '_query_args', $query_args, $settings);
            $loop       = new \WP_Query($query_args);

             ob_start();
            if ($loop->have_posts()) :
                $max_page_no = $loop->max_num_pages;
                $i = 1;
                ?>
                <div class="bdt-grid-row bdt-active segment-<?php echo esc_attr($segment) ?>">
                    <div class="bdt-grid-small" bdt-grid>
                        <?php
                        while ($loop->have_posts()) : $loop->the_post();
                            $cols = ($i < 3) ? 2 : 3;
                            $bdt_post_class = ( $cols <= 2) ? ' bdt-post-grid-primary' : ' bdt-post-grid-secondary';
                            ?>
                            <div class="bdt-width-1-<?php echo esc_attr($cols) ?>@m<?php echo esc_attr($bdt_post_class); ?>">
                                <?php include(BDTEP_MODULES_PATH . 'advanced-post-tab/template-parts/temp-item.php'); ?>
                            </div><?php
                            $i++;
                        endwhile; ?>
                    </div>
                    <?php if ($max_page_no > 1): ?>
                        <div class="bdt-advanced-post-tab-pagination">
                            <a data-paged="1" data-total="<?php echo esc_attr($loop->found_posts) ?>" data-page-id="<?php echo esc_attr($page_id) ?>" data-max-paged="<?php echo esc_attr($max_page_no) ?>" data-taxonomy="<?php echo esc_attr($taxonomy) ?>" class="load-more-pagination" href="javascript:void()"><?php echo esc_html__('Load More', 'bdthemes-element-pack') ?></a>
                        </div>
                    <?php endif; ?>
                </div>
                <?php
            else:
                ?>
                <div class="bdt-grid-row bdt-active segment-<?php echo esc_attr($segment) ?>">
                    <div class="bdt-grid">
                        <p><?php echo esc_html__('Nothing found!','bdthemes-element-pack') ?> </p>
                    </div>
                </div>
                <?php
            endif;
            $output = ob_get_contents();
            ob_end_clean();
            echo wp_json_encode(array('data' => $output), 200);
        }
        exit;
    }

    public function ajax_load_settings_taxonomy_filter($settings, $taxonomy){
        if(isset($settings['tax_query'])){
            unset($settings['tax_query']);
        }

        if(isset($settings['tax_query_category'])){
            unset($settings['tax_query_category']);
        }

        if(isset($settings['tax_query_tag'])){
            unset($settings['tax_query_tag']);
        }

        if(isset($settings['post_author'])){
            unset($settings['post_author']);
        }

        if($taxonomy){
            list($label, $slug) = explode(':', $taxonomy);
            if($label == 'author' && is_numeric($slug) ){
                $taxonomy = array($taxonomy);
                $settings['author__in'] = Advanced_Post_Tab_Helper::get_author_ids($taxonomy);
            }elseif($label == 'post_tag'){
                $settings['tax_query_tag'] = array($taxonomy);
            }else{
                $settings['tax_query_category'] = array($taxonomy);
            }
        };

        return $settings;
    }
}
