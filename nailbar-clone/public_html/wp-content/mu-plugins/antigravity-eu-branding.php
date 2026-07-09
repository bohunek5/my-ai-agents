<?php
/**
 * Plugin Name: Antigravity EU Branding
 * Description: Dynamically injects EU funding compliance graphics and pages.
 * Version: 1.0
 * Author: Antigravity
 */

// Hook into template_redirect to render virtual /projekty-unijne page
add_action('template_redirect', function() {
    $request_uri = $_SERVER['REQUEST_URI'];
    $path = trim(parse_url($request_uri, PHP_URL_PATH), '/');
    if ($path === 'projekty-unijne') {
        status_header(200);
        get_header();
        ?>
        <div class="eu-project-page-container" style="background-color: #f8fafc; padding: 60px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; overflow: hidden; padding: 40px;">
                
                <!-- EU Banner Image -->
                <div style="margin-bottom: 40px; text-align: center; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                    <img src="/wp-content/uploads/dofinansowanie.webp" alt="Sfinansowano w ramach reakcji Unii na pandemię COVID-19" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
                </div>

                <!-- Main Content -->
                <div>
                    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="font-size: 26px; color: #1e3a8a; margin: 0; font-weight: 700; line-height: 1.3;">
                            Projekty Unijne
                        </h1>
                        <p style="font-size: 18px; color: #2563eb; font-style: italic; margin: 10px 0 0 0; font-weight: 500;">
                            „Sfinansowano w ramach reakcji Unii na pandemię COVID-19”
                        </p>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 24px; font-size: 16px; color: #334155; line-height: 1.6;">
                        <div class="eu-grid-row" style="display: grid; grid-template-columns: 200px 1fr; gap: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
                            <strong style="color: #0f172a;">Beneficjent:</strong>
                            <div>NAILBAR Małgorzata Marchelewicz</div>
                        </div>

                        <div class="eu-grid-row" style="display: grid; grid-template-columns: 200px 1fr; gap: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
                            <strong style="color: #0f172a;">Tytuł projektu:</strong>
                            <div>„Zabezpieczenie ciągłości działalności gospodarczej firmy Nailbar Małgorzata Marchelewicz w okresie epidemii”</div>
                        </div>

                        <div class="eu-grid-row" style="display: grid; grid-template-columns: 200px 1fr; gap: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
                            <strong style="color: #0f172a;">Opis i cele projektu:</strong>
                            <div>
                                Celem projektu jest opracowanie i wdrożenie działań zabezpieczających ciągłość działalności gospodarczej firmy Nailbar Małgorzata Marchelewicz w okresie epidemii wpływających na budowanie odporności firmy na przyszłe kryzysy.
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
                            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; text-align: left;">
                                <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #2563eb; font-weight: 600; display: block; margin-bottom: 8px;">Wartość projektu</span>
                                <strong style="font-size: 28px; color: #1e3a8a; display: block;">278 316,00 zł</strong>
                            </div>

                            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; text-align: left;">
                                <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #2563eb; font-weight: 600; display: block; margin-bottom: 8px;">Wkład Funduszy Europejskich</span>
                                <strong style="font-size: 28px; color: #1e3a8a; display: block;">278 316,00 zł</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            @media (max-width: 768px) {
                .eu-project-page-container div {
                    padding: 24px !important;
                }
                .eu-grid-row {
                    grid-template-columns: 1fr !important;
                    gap: 8px !important;
                }
            }
        </style>
        <?php
        get_footer();
        exit;
    }
});

// Inject floating EU flag in the footer (visible at the top, without scrolling)
add_action('wp_footer', function() {
    if (is_admin()) return;
    ?>
    <div id="eu-floating-badge-container">
        <a href="/projekty-unijne/" class="eu-floating-badge" aria-label="Projekty unijne - Unia Europejska">
            <div class="eu-flag-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 540" width="30" height="20">
                    <rect width="810" height="540" fill="#003399"/>
                    <g fill="#ffcc00" transform="translate(405,270)">
                        <g id="eu-star">
                            <polygon points="0,-30 9,-8 29,-8 12,4 19,26 0,13 -19,26 -12,4 -29,-8 -9,-8"/>
                        </g>
                        <use href="#eu-star" y="-180"/>
                        <use href="#eu-star" y="180"/>
                        <use href="#eu-star" x="-180"/>
                        <use href="#eu-star" x="180"/>
                        <use href="#eu-star" x="-90" y="-156"/>
                        <use href="#eu-star" x="90" y="-156"/>
                        <use href="#eu-star" x="-156" y="-90"/>
                        <use href="#eu-star" x="156" y="-90"/>
                        <use href="#eu-star" x="-90" y="156"/>
                        <use href="#eu-star" x="90" y="156"/>
                        <use href="#eu-star" x="-156" y="90"/>
                        <use href="#eu-star" x="156" y="90"/>
                    </g>
                </svg>
            </div>
            <span class="eu-flag-text">Unia Europejska</span>
        </a>
    </div>
    <style>
        #eu-floating-badge-container {
            position: fixed;
            top: 128px;
            left: 20px;
            z-index: 999999;
            pointer-events: auto;
        }
        .eu-floating-badge {
            display: grid;
            grid-template-columns: 46px 1fr;
            align-items: center;
            gap: 10px;
            width: 178px;
            background: #ffffff;
            border: 1px solid #d7dde8;
            padding: 7px 9px;
            border-radius: 0;
            box-shadow: none;
            text-decoration: none !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .eu-floating-badge:hover {
            border-color: #1e3a8a;
        }
        .eu-flag-icon {
            display: flex;
            align-items: center;
            border: 1px solid #d7dde8;
            border-radius: 0;
            overflow: hidden;
        }
        .eu-flag-icon svg {
            width: 44px;
            height: auto;
        }
        .eu-flag-text {
            font-size: 14px;
            font-weight: 700;
            color: #111827;
            white-space: nowrap;
            letter-spacing: 0;
        }
        
        @media (max-width: 480px) {
            #eu-floating-badge-container {
                top: 112px;
                left: 10px;
            }
            .eu-floating-badge {
                grid-template-columns: 38px 1fr;
                width: 152px;
                padding: 6px 8px;
                gap: 8px;
            }
            .eu-flag-icon svg {
                width: 36px;
            }
            .eu-flag-text {
                font-size: 12px;
            }
        }
    </style>
    <?php
});
