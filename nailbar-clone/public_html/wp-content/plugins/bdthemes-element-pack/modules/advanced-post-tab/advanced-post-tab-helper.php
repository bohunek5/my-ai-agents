<?php
namespace ElementPack\Modules\AdvancedPostTab;

class Advanced_Post_Tab_Helper {

    public static function get_all_post_type_options() {

        $post_types = get_post_types(array('public' => true), 'objects');

        $options = ['' => ''];

        foreach ($post_types as $post_type) {
            $options[$post_type->name] = $post_type->label;
        }

        return apply_filters('ep_advanced_post_tab_post_type_options', $options);
    }


    /**
     * Action to handle searching categories.
     */
    public static function get_all_categories_options() {

        $taxonomies = self::get_all_categories();

        $results = array();
        foreach ($taxonomies as $taxonomy) {
            $terms = get_terms(array('taxonomy' => $taxonomy));
            foreach ($terms as $term)
                $results[$term->taxonomy . ':' . $term->slug] = $term->name;
        }

        return apply_filters('ep_advanced_post_tab_category_options', $results);
    }

    /**
     * Action to handle searching Tags.
     */
    public static function get_all_tags_options() {

        $taxonomies = self::get_all_tags();

        $results = array();
        foreach ($taxonomies as $taxonomy) {
            $terms = get_terms(array('taxonomy' => $taxonomy));
            foreach ($terms as $term)
                $results[$term->taxonomy . ':' . $term->slug] = $term->name;
        }

        return apply_filters('ep_advanced_post_tab_tags_options', $results);
    }

    /**
     * Action to handle searching Author.
     */
    public static function get_all_author_options() {

        $authorsData = self::get_all_authors();

        $results = array();
        foreach ($authorsData as $author) {
            $results['author:' . $author['author']] = $author['name'];
        }

        return apply_filters('ep_advanced_post_tab_author_options', $results);
    }


    /** Isotope filtering support**/
    public static function get_taxonomy_terms_filter( $taxonomies, $chosen_terms = array(), $author_args = array() )
    {
        $output = '';
        $terms  = array();

        if ( empty($chosen_terms) ) {
            foreach ( $taxonomies as $taxonomy ) {
                global  $wp_version ;

                if ( version_compare( $wp_version, '4.5', '>=' ) ) {
                    $taxonomy_terms = get_terms( array(
                        'taxonomy' => $taxonomy,
                    ) );
                } else {
                    $taxonomy_terms = get_terms( $taxonomy );
                }

                if ( !empty($taxonomy_terms) && !is_wp_error( $taxonomy_terms ) ) {
                    $terms = array_merge( $terms, $taxonomy_terms );
                }
            }
        } else {
            $terms = $chosen_terms;
        }

        if ( !empty($terms) ) {
            $output .= '<div class="bdt-flex-right" bdt-tab>';
            $output .= '<div class="bdt-filter-item"><a data-value="*" data-segment="0" href="#">' . esc_html__( 'All', 'bdthemes-element-pack' ) . '</a></div>';
            $segment_count = 1;
            foreach ( $terms as $term ) {
                $taxonomy   = $term->taxonomy;
                $slug       = $term->slug;
                $output     .= '<div class="bdt-filter-item segment-'.$segment_count.'"><a href="#" data-segment="'.$segment_count.'" data-page-id="'.get_the_ID().'" data-taxonomy="'.$taxonomy.':'.$slug.'" data-value=".term-' . intval( $term->term_id ) . '" title="' . esc_html__( 'View all items filed under ', 'bdthemes-element-pack' ) . esc_attr( $term->name ) . '">' . esc_html( $term->name ) . '</a></div>';
                $segment_count++;
            }

            if(is_array($author_args) && !empty($author_args)){
                global $wpdb;
                $userIds = implode(',', $author_args);
                $userList = $wpdb->get_results("select * from {$wpdb->prefix}users WHERE id in ($userIds)");

                foreach($userList as $user){
                    $taxonomy       = 'author';
                    $full_name      = $user->display_name;
                    $full_name      =  apply_filters('ep_advanced_post_tab_author_name_frontend_loop', $full_name, $user);
                    $author_id      = $user->ID;
                    $output         .= '<div class="bdt-filter-item segment-'.$segment_count.'"><a href="#" data-segment="'.$segment_count.'" data-page-id="'.get_the_ID().'" data-taxonomy="'.$taxonomy.':'.$author_id.'" data-value=".term-' . intval( $author_id ) . '" title="' . esc_html__( 'View all items filed under ', 'bdthemes-element-pack' ) . esc_attr( $full_name ) . '">' . esc_html( $full_name ) . '</a></div>';
                    $segment_count++;
                }
            }

            $output .= '</div>';
        }

        return apply_filters(
            'ep_advanced_post_tab_taxonomy_terms_filter',
            $output,
            $taxonomies,
            $chosen_terms
        );
    }


    public static function get_chosen_terms( $query_args )
    {
        $chosen_terms   = array();
        $taxonomies     = array();

        if ( !empty($query_args) && !empty($query_args['tax_query']) ) {
            $term_queries = $query_args['tax_query'];
            foreach ( $term_queries as $terms_query ) {
                if ( !is_array( $terms_query ) ) {
                    continue;
                }
                $field      = $terms_query['field'];
                $taxonomy   = $terms_query['taxonomy'];
                $terms      = $terms_query['terms'];
                if ( empty($taxonomy) || empty($terms) ) {
                    continue;
                }
                if ( !in_array( $taxonomy, $taxonomies ) ) {
                    $taxonomies[] = $taxonomy;
                }

                if ( is_array( $terms ) ) {
                    foreach ( $terms as $term ) {
                        $chosen_terms[] = get_term_by( $field, $term, $taxonomy );
                    }
                } else {
                    $chosen_terms[] = get_term_by( $field, $terms, $taxonomy );
                }

            }
        }

        // Remove duplicates
        $taxonomies = array_unique( $taxonomies );
        $return = array( $chosen_terms, $taxonomies );
        return apply_filters( 'ep_advanced_post_tab_chosen_taxonomy_terms', $return, $query_args );
    }

    public static function get_all_categories()
    {
        $taxonomies = get_taxonomies( array(
            'public'   => true,
            '_builtin' => false,
        ) );
        $taxonomies = array_merge( array(
            'category' => 'category'
        ), $taxonomies );
        return $taxonomies;
    }

    public static function get_all_tags()
    {
        $taxonomies = get_taxonomies( array(
            'public'   => true,
            '_builtin' => false,
        ) );
        $taxonomies = array_merge( array(
            'post_tag' => 'post_tag'
        ), $taxonomies );
        return $taxonomies;
    }

    public static function get_all_authors( $args = '' ) {
        global $wpdb;

        $defaults = array(
            'orderby'       => 'name',
            'order'         => 'ASC',
            'number'        => '',
            'exclude_admin' => false,
            'show_fullname' => false,
            'hide_empty'    => true,
            'exclude'       => '',
            'include'       => '',
        );

        $args = wp_parse_args( $args, $defaults );
        $args =  apply_filters( 'ep_advanced_post_tab_author_data_args', $args );

        $return = array();

        $query_args           = wp_array_slice_assoc( $args, array( 'orderby', 'order', 'number', 'exclude', 'include' ) );
        $query_args['fields'] = 'ids';
        $authors              = get_users( $query_args );

        $author_count = array();
        foreach ( (array) $wpdb->get_results( "SELECT DISTINCT post_author, COUNT(ID) AS count FROM $wpdb->posts WHERE " . get_private_posts_cap_sql( 'post' ) . ' GROUP BY post_author' ) as $row ) {
            $author_count[ $row->post_author ] = $row->count;
        }
        foreach ( $authors as $author_id ) {
            $author = get_userdata( $author_id );

            if ( $args['exclude_admin'] && 'admin' == $author->display_name ) {
                continue;
            }

            $posts = isset( $author_count[ $author->ID ] ) ? $author_count[ $author->ID ] : 0;

            if ( ! $posts && $args['hide_empty'] ) {
                continue;
            }

            if ( $args['show_fullname'] && $author->first_name && $author->last_name ) {
                $name = "$author->first_name $author->last_name";
            } else {
                $name = $author->display_name;
            }

            $authorArra = array('name'=>$name, 'author'=> $author_id );
            $authorData =  apply_filters( 'ep_advanced_post_tab_author_data_loop', $authorArra, $author );
            if($authorData){
                $return[] = $authorData;
            }
        }
        return $return;

    }

    public static function get_all_taxonomies()
    {
        $taxonomies = get_taxonomies( array(
            'public'   => true,
            '_builtin' => false,
        ) );
        $taxonomies = array_merge( array(
            'category' => 'category',
            'post_tag' => 'post_tag',
        ), $taxonomies );
        return $taxonomies;
    }

    public static function build_query_args($settings){


        $query_args = self::default_query_args($settings);
        if (!empty($settings['post_types'])) {
            $query_args['post_type'] = $settings['post_types'];
        }

        $taxQueryCategory   = isset($settings['tax_query_category']) ? $settings['tax_query_category']:array();
        $taxQueryTag        = isset($settings['tax_query_tag']) ? $settings['tax_query_tag']:array();
        $taxQueryData       = array();

        if(is_array($taxQueryCategory) && !empty($taxQueryCategory)){
            $taxQueryData = $taxQueryCategory;
        }

        if(is_array($taxQueryTag) && !empty($taxQueryTag)){
            $taxQueryData = array_merge_recursive($taxQueryData, $taxQueryTag);
        }

         if (!empty($taxQueryData)) {
            $query_args['tax_query'] = array();
            if(count($taxQueryData) > 1){
                $query_args['tax_query']['relation'] = 'OR';
            }
            foreach ($taxQueryData as $tq) {
                list($tax, $term) = explode(':', $tq);

                if (empty($tax) || empty($term))
                    continue;
                $query_args['tax_query'][] = array(
                    'taxonomy' => $tax,
                    'field' => 'slug',
                    'terms' => $term
                );
            }
        }

        if(isset($settings['author__in']) && is_array($settings['author__in']) && !empty($settings['author__in'])){
            $query_args['author__in']   = $settings['author__in'];
        }

        $query_args = apply_filters('ep_advanced_post_tab_custom_query_args', $query_args, $settings);

        $query_args['paged'] = max(1, get_query_var('paged'), get_query_var('page'));

        return apply_filters('ep_advanced_post_tab_posts_query_args', $query_args, $settings);
    }

    public static function get_author_ids($postAuthor){
        $authorIDs  = array();
        if (!empty($postAuthor)) {
            foreach ($postAuthor as $tq) {
                list($label, $author) = explode(':', $tq);

                if (empty($label) || empty($author))
                    continue;
                $authorIDs[] = $author;
            }
        }

        return $authorIDs;

    }

    public static function default_query_args($settings) {

        $query_args = [
            'orderby'   => $settings['orderby'],
            'order'     => $settings['order'],
            'ignore_sticky_posts'   => 1,
            'post_status'           => 'publish',
        ];

        $query_args['posts_per_page'] = $settings['posts_per_page'];

        $query_args['offset'] = isset($settings['offset']) ? intval($settings['offset']) : 0;

        return apply_filters('ep_advanced_post_tab_default_query_args', $query_args, $settings);
    }

    // get all registered taxonomies
    public static function get_taxonomies_map()
    {
        $map = array();
        $taxonomies = self::get_all_taxonomies();
        foreach ( $taxonomies as $taxonomy ) {
            $map[$taxonomy] = $taxonomy;
        }
        return apply_filters( 'ep_advanced_post_tab_taxonomies_map', $map );
    }

    public static function get_excerpt($limit, $source = null){

        $excerpt = $source == "content" ? get_the_content() : get_the_excerpt();
        $excerpt = preg_replace(" (\[.*?\])",'',$excerpt);
        $excerpt = strip_shortcodes($excerpt);
        $excerpt = strip_tags($excerpt);
        $excerpt = substr($excerpt, 0, $limit);
        $excerpt = substr($excerpt, 0, strripos($excerpt, " "));
        $excerpt = trim(preg_replace( '/\s+/', ' ', $excerpt));
        return $excerpt;
    }

}
