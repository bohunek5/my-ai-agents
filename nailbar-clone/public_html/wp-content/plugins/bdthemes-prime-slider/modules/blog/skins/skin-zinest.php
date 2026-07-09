<?php
namespace PrimeSlider\Modules\Blog\Skins;

use Elementor\Utils;
use Elementor\Skin_Base as Elementor_Skin_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Skin_Zinest extends Elementor_Skin_Base {

	public function get_id() {
		return 'zinest';
	}

	public function get_title() {
		return esc_html__( 'Zinest', 'bdthemes-prime-slider' );
    }
    
    public function render_category() {
		?>
		<span class="bdt-ps-category">
			<span><?php echo get_the_category_list(', '); ?></span>
		</span>
		<?php 
    }
    
    public function query_posts() {
		$settings = $this->parent->get_settings();

		$args = array(
			'post_type'      => 'post',
			'posts_per_page' => 3,
			'orderby'        => $settings['orderby'],
			'order'          => $settings['order'],
			'post_status'    => 'publish'
		);

		if ( 'by_name' === $settings['post_source'] and !empty($settings['post_categories']) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'category',
				'field'    => 'slug',
				'terms'    => $settings['post_categories'],
			);
		}

		$query = new \WP_Query( $args );

		return $query;
	}

    public function render_navigation_arrows() {
		$settings = $this->parent->get_settings_for_display();

		?>

            <?php if ($settings['show_navigation_arrows']) : ?>
            <div class="bdt-navigation-arrows bdt-position-bottom-right">
				<a class="bdt-prime-slider-previous" href="#" bdt-slidenav-previous bdt-slideshow-item="previous"></a>
				<a class="bdt-prime-slider-next" href="#" bdt-slidenav-next bdt-slideshow-item="next"></a>
            </div>
            <?php endif; ?>
            
        <?php

	}

    public function render_footer() {
        $settings = $this->parent->get_settings_for_display();
        ?>

                </ul>

                <?php $this->render_navigation_arrows(); ?>

			</div>
            
            <?php if ( 'yes' == $settings['show_featured_post'] ) : ?>
            <div class="bdt-ps-blog-container bdt-ps-blog-featured bdt-position-bottom">
                <div class="bdt-child-width-1-3" bdt-grid>
                <?php
                    global $post;

                    $wp_query = $this->parent->query_posts();

                    if ( ! $wp_query->found_posts ) {
                        return;
                    }
                    
                    while ( $wp_query->have_posts() ) {
                        $wp_query->the_post();
                    ?>
                    <div>
                        <div class="bdt-ps-featured bdt-position-relative">
                            <div class="bdt-grid bdt-flex bdt-flex-middle">
                                <div class="bdt-width-1-1 bdt-width-1-2@m">
                                    <div class="bdt-ps-featured-thumbnav">
                                        <?php $this->parent->rendar_item_image(); ?>
                                    </div>
                                </div>
                                <div class="bdt-width-1-1 bdt-width-1-2@m bdt-visible@m">
                                    <div class="bdt-ps-content">
                                        <div class="bdt-ps-title">
                                            <a href="<?php echo esc_url( get_permalink($post->ID) ); ?>">
                                                <?php echo prime_slider_first_word( get_the_title() ); ?>
                                            </a>
                                        </div>
                                        <div class="bdt-ps-desc">
                                            <?php echo prime_slider_custom_excerpt(8, false); ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                    }
                    wp_reset_postdata(); 
                ?>
                </div>
            </div>
            <?php endif; ?>

        </div>
        <?php $this->parent->render_offcanvas(); ?>
        <?php
	}

    public function rendar_item_image() {

		$placeholder_image_src = Utils::get_placeholder_image_src();
		$image_src = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );

		if ( $image_src[0] ) {
			$image_src = $image_src[0];
		} else {
			$image_src = $placeholder_image_src;
		}

		?>

		<img src="<?php echo esc_url($image_src); ?>" alt="<?php echo get_the_title(); ?>" bdt-cover>

		<?php
	}

    public function render_item_content($post) {
        $settings = $this->parent->get_settings_for_display();

        ?>
        
        <div class="bdt-container">
            <div class="bdt-prime-slider-wrapper">
                <div class="bdt-prime-slider-content">
                    <div class="bdt-prime-slider-desc">

                        <?php if ( 'yes' == $settings['show_category'] ) : ?>
                            <div class="bdt-ps-category-wrapper" bdt-slideshow-parallax="y: 50,0,-50; opacity: 1,1,0">
                                <?php $this->render_category(); ?>
                            </div>
                        <?php endif; ?>

                        <?php if ( 'yes' == $settings['show_title'] ) : ?>
                            <div class="bdt-main-title">
                                <h1 bdt-slideshow-parallax="y: 80,0,-80; opacity: 1,1,0">

                                    <a href="<?php echo esc_url( get_permalink($post->ID) ); ?>">
                                        <?php echo prime_slider_first_word( get_the_title() ); ?>
                                    </a>

                                </h1>
                            </div>
                        <?php endif; ?>

                        <?php if ( 'yes' == $settings['show_meta'] ) : ?>
                            <div class="bdt-ps-meta">
                                <div class="bdt-child-width-1-1 bdt-child-width-1-3@s" bdt-grid>
                                    <div class="bdt-ps-meta-item bdt-flex bdt-flex-middle" bdt-slideshow-parallax="y: 110,0,-110; opacity: 1,1,0">
                                        <div class="bdt-meta-icon">
                                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-user fa-w-14 fa-2x"><path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" class=""></path></svg>
                                        </div>
                                        <div class="bdt-meta-text">
                                            <span class="bdt-author bdt-text-capitalize"><?php esc_html_e('Written by', 'bdthemes-prime-slider'); ?><br> <?php echo esc_attr(get_the_author()); ?> </span>
                                        </div>
                                    </div>

                                    <div class="bdt-ps-meta-item bdt-flex bdt-flex-middle" bdt-slideshow-parallax="y: 140,0,-140; opacity: 1,1,0">
                                        <div class="bdt-meta-icon">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-day" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-calendar-day fa-w-14 fa-2x"><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-96zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z" class=""></path></svg>
                                        </div>
                                        <div class="bdt-meta-text">
                                            <span>
                                            <?php esc_html_e('Published on', 'bdthemes-prime-slider'); ?> <br> <?php echo get_the_date(); ?>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="bdt-ps-meta-item bdt-flex bdt-flex-middle bdt-visible@s" bdt-slideshow-parallax="y: 170,0,-170; opacity: 1,1,0">
                                        <div class="bdt-meta-icon">
                                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comment" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-comment fa-w-16 fa-2x"><path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z" class=""></path></svg>
                                        </div>
                                        <div class="bdt-meta-text">
                                            <span>
                                                <?php esc_html_e('Number of Comments', 'bdthemes-prime-slider'); ?><br>
                                                <?php echo get_comments_number(); ?>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?>
                        
                    </div>
                </div>
            </div>
        </div>

        <?php
    }

    public function render_slides_loop() {
        $settings = $this->parent->get_settings_for_display();

        $kenburns_reverse = $settings['kenburns_reverse'] ? ' bdt-animation-reverse' : '';

        $slide_index = 1;

        global $post;

        $wp_query = $this->parent->query_posts();

		if ( ! $wp_query->found_posts ) {
			return;
		}

		while ( $wp_query->have_posts() ) {
			$wp_query->the_post();

			?>

			<li class="bdt-slideshow-item bdt-flex bdt-flex-middle elementor-repeater-item-<?php echo get_the_ID(); ?>">

				<?php if ('yes' == $settings['kenburns_animation']) : ?>
					<div class="bdt-position-cover bdt-animation-kenburns<?php echo esc_attr($kenburns_reverse); ?> bdt-transform-origin-center-left">
					<?php endif; ?>

						<?php $this->rendar_item_image(); ?>

					<?php if ('yes' == $settings['kenburns_animation']) : ?>
					</div>
				<?php endif; ?>

				<?php if ('none' !== $settings['overlay']) :
								$blend_type = ('blend' == $settings['overlay']) ? ' bdt-blend-' . $settings['blend_type'] : ''; ?>
					<div class="bdt-overlay-default bdt-position-cover<?php echo esc_attr($blend_type); ?>"></div>
				<?php endif; ?>

				<?php $this->render_item_content($post, $slide_index); ?>

				<?php $slide_index++; ?>

            </li>

            

			<?php
		}
        
		wp_reset_postdata();

    }

	public function render() {
        $settings = $this->parent->get_settings_for_display();
        
        $skin_name = 'zinest';

        $this->parent->render_header($skin_name);

        $this->render_slides_loop();

        $this->render_footer();

	}
}