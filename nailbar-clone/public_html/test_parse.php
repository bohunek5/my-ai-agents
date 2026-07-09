<?php
require_once('wp-load.php');

$home_path = trim( parse_url( home_url(), PHP_URL_PATH ), '/' );
$home_path_regex = sprintf( '|^%s|i', preg_quote( $home_path, '|' ) );

$req_uri = '/zeglarstwomazury.pl/';
$req_uri  = trim( $req_uri, '/' );
$req_uri  = preg_replace( $home_path_regex, '', $req_uri );
$req_uri  = trim( $req_uri, '/' );

echo "home_path: '$home_path'\n";
echo "home_path_regex: '$home_path_regex'\n";
echo "req_uri: '$req_uri'\n";

global $wp;
echo "wp->request: '" . $wp->request . "'\n";

if ( empty( $wp->request ) ) {
    echo "wp->request is empty\n";
} else {
    echo "wp->request is NOT empty\n";
}

echo "Is error set in wp->query_vars? " . (isset($wp->query_vars['error']) ? $wp->query_vars['error'] : 'no') . "\n";
