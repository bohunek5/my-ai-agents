<?php
$post_id = get_the_ID();
$size    = 'medium_large';
if(isset($settings['thumbnail_size_size']) && !empty($settings['thumbnail_size_size'])){
    $size    = $settings['thumbnail_size_size'];
}

?>
<div class="bdt-post-tab-item">

        <div class="bdt-post-tab-img-wrap">
            <?php
            $image_id = get_post_thumbnail_id( $post_id );
            $image_src = wp_get_attachment_image_src( $image_id, $size );

            if ( ! $image_src ) {
                $image_src = BDTEP_ASSETS_URL . 'images/block.jpg';
            } else{
                $image_src = $image_src[0];
            }

            ?>
            <a href="<?php echo get_the_permalink() ?>" class="bdt-post-tab-image bdt-background-cover" style="background-image: url(<?php echo esc_url($image_src) ?>)">
            </a>


            <?php if ( 'yes' == $settings['show_category'] ) : ?>
                <div class="bdt-post-tab-category">
                    <?php echo get_the_category_list(' '); ?>
                </div>
            <?php endif; ?>

            <?php if ( 'yes' == $settings['show_comments'] ) : ?>
                <div class="bdt-post-tab-comments">
                    <span><i class="ep-bubble" aria-hidden="true"></i> <?php echo get_comments_number() ?></span>
                </div>
            <?php endif; ?>

        </div>

        <div class="bdt-post-tab-desc">

            <div class="bdt-post-tab-meta">

                <?php if ( 'yes' == $settings['show_author'] ) : ?>
                    <span class="bdt-post-tab-author"><a href="#"><?php the_author() ?></a></span>
                <?php endif; ?>

                <?php if ( 'yes' == $settings['show_date'] ) : ?>
                    <span class="bdt-post-tab-date"><?php the_date()?></span>
                <?php endif; ?>

            </div>

            <?php if ( 'yes' == $settings['show_title'] ) : ?>
                <h4 class="bdt-post-tab-title">
                    <a href="<?php the_permalink() ?>"><?php the_title() ?></a>
                </h4>
            <?php endif; ?>

            <?php
            if ( 'yes' == $settings['show_excerpt'] ) : ?>
                <div class="bdt-post-tab-excerpt">
                    <?php echo \ElementPack\Modules\AdvancedPostTab\Advanced_Post_Tab_Helper::get_excerpt($settings['excerpt_length']) ?>
                </div>
            <?php endif; ?>

            <?php if ( 'yes' == $settings['show_readmore'] ) : ?>
                <div class="bdt-post-tab-btn">
                    <a href="<?php echo esc_url(get_permalink()); ?>" class="bdt-post-grid-readmore">
                        <?php echo esc_html($settings['readmore_text']); ?>

                        <?php if ( $settings['post_grid_icon']['value']) : ?>
                            <span class="bdt-button-icon-align-<?php echo esc_attr($settings['icon_align']); ?>">
                                <?php Elementor\Icons_Manager::render_icon( $settings['post_grid_icon'], [ 'aria-hidden' => 'true', 'class' => 'fa-fw' ] ); ?>
                            </span>
                        <?php endif; ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>