<?php
namespace ElementPack\Modules\HoverBox\Skins;

use Elementor\Skin_Base as Elementor_Skin_Base;

use Elementor\Icons_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Skin_Envelope extends Elementor_Skin_Base {
	public function get_id() {
		return 'bdt-envelope';
	}

	public function get_title() {
		return __( 'Envelope', 'bdthemes-element-pack' );
	}

	public function render() {
		$settings = $this->parent->get_settings_for_display();

		if ($settings['hover_box_event']) {
			$hoverBoxEvent = $settings['hover_box_event'];
		} else {
			$hoverBoxEvent = false;
		}

		$this->parent->add_render_attribute(
			[
				'hover_box' => [
					'id' => 'bdt-hover-box-' . $this->parent->get_id(),
					'class' => 'bdt-hover-box bdt-hover-box-skin-envelope',
					'data-settings' => [
						wp_json_encode(array_filter([
							'box_id' => 'bdt-hover-box-' . $this->parent->get_id(),
							'mouse_event' => $hoverBoxEvent,
						]))
					]
				]
			]
		);

		?>
		<div <?php echo $this->parent->get_render_attribute_string( 'hover_box' ); ?>>

			<?php $this->parent->box_content(); ?>
			<?php $this->box_items(); ?>
			
		</div>

		<?php
	}

	public function box_items() {
		$settings = $this->parent->get_settings_for_display();
		$id       = $this->parent->get_id();

		$this->parent->add_render_attribute( 'box-settings', 'bdt-hover-box-items', 'connect: #bdt-box-content-' .  esc_attr($id) . ';' );
        $this->parent->add_render_attribute( 'box-settings', 'class', 'bdt-box-item-wrapper' );

		$this->parent->add_render_attribute('box-settings', 'bdt-grid', '');
		$this->parent->add_render_attribute('box-settings', 'class', ['bdt-grid', 'bdt-grid-small', 'bdt-grid-collapse'] );
		
		$this->parent->add_render_attribute('box-settings', 'class', 'bdt-slider-items');
		$this->parent->add_render_attribute('box-settings', 'class', 'bdt-child-width-1-' . esc_attr($settings['columns_mobile']));
		$this->parent->add_render_attribute('box-settings', 'class', 'bdt-child-width-1-' . esc_attr($settings['columns_tablet']) .'@s');
		$this->parent->add_render_attribute('box-settings', 'class', 'bdt-child-width-1-' . esc_attr($settings['columns']) .'@m');

		$this->parent->add_render_attribute(
			[
				'slider-settings' => [
					'bdt-slider' => [
						wp_json_encode(array_filter([
							"autoplay"          => false,
							"autoplay-interval" => 7000,
							"finite"            => true,
							"pause-on-hover"    => true,
						]))
					]
				]
			]
		);

		?>
		<div <?php echo ( $this->parent->get_render_attribute_string( 'slider-settings' ) ); ?>>
			<div <?php echo $this->parent->get_render_attribute_string( 'box-settings' ); ?>>

					<?php foreach ( $settings['hover_box'] as $index => $item ) :
						
						$tab_count = $index + 1;
						$tab_id    = 'bdt-box-'. $tab_count . esc_attr($id);

						if ($tab_id    == 'bdt-box-'. 1 . esc_attr($id)) {
							$this->parent->add_render_attribute( 'box-item', 'class', 'bdt-hover-box-item active', true );
						} else {
							$this->parent->add_render_attribute( 'box-item', 'class', 'bdt-hover-box-item', true );
						}

						
						?>
						<div>
							<div <?php echo ( $this->parent->get_render_attribute_string( 'box-item' ) ); ?> data-id="<?php echo esc_attr($tab_id); ?>">

							<div class="bdt-hover-box-description bdt-position-small bdt-position-<?php echo esc_attr( $settings['content_position'] ); ?>">
								<?php if ( 'yes' == $settings['show_icon'] ) : ?>
								<a class="bdt-hover-box-icon-box" href="javascript:void(0);" data-tab-index="<?php echo esc_attr($index); ?>" >
									<span class="bdt-icon-wrapper">
										<?php Icons_Manager::render_icon( $item['selected_icon'], [ 'aria-hidden' => 'true' ] ); ?>
									</span>
								</a>
								<?php endif; ?>
									<?php if ( $item['hover_box_sub_title'] && ( 'yes' == $settings['show_sub_title'] ) ) : ?>
										<div class="bdt-hover-box-sub-title">
											<?php echo wp_kses( $item['hover_box_sub_title'], element_pack_allow_tags('title') ); ?>
										</div>
									<?php endif; ?>
	
									<?php if ( $item['hover_box_title'] && ( 'yes' == $settings['show_title'] ) ) : ?>
										<h2 class="bdt-hover-box-title">
											<?php if ( '' !== $item['title_link']['url'] ) : ?>
												<a href="<?php echo esc_url( $item['title_link']['url'] ); ?>">
											<?php endif; ?>
												<?php echo wp_kses( $item['hover_box_title'], element_pack_allow_tags('title') ); ?>
											<?php if ( '' !== $item['title_link']['url'] ) : ?>
												</a>
											<?php endif; ?>
										</h2>
									<?php endif; ?>
	
									<?php if ( $item['hover_box_content'] && ( 'yes' == $settings['show_content'] ) ) : ?>
										<div class="bdt-hover-box-text">
											<?php echo wp_kses_post( $item['hover_box_content'] ); ?>
										</div>
									<?php endif; ?>
	
									<?php if ($item['hover_box_button'] && ( 'yes' == $settings['show_button'] )) : ?>
										<div class="bdt-hover-box-button">
											<?php if ( '' !== $item['button_link']['url'] ) : ?>
												<a href="<?php echo esc_url( $item['button_link']['url'] ); ?>">
											<?php endif; ?>
												<?php echo wp_kses_post($item['hover_box_button']); ?>
											<?php if ( '' !== $item['button_link']['url'] ) : ?>
												</a>
											<?php endif; ?>
										</div>
									<?php endif; ?>
								</div>

							</div>
						</div>
					<?php endforeach; ?>

				</div>
			</div>
		<?php
	}
}

