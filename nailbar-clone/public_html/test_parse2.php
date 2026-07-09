<?php
$home_path = 'zeglarstwomazury.pl';
$home_path_regex = sprintf( '|^%s|i', preg_quote( $home_path, '|' ) );

$req_uri = '/zeglarstwomazury.pl/';
$req_uri  = trim( $req_uri, '/' );
$req_uri  = preg_replace( $home_path_regex, '', $req_uri );
$req_uri  = trim( $req_uri, '/' );

echo "home_path: '$home_path'\n";
echo "home_path_regex: '$home_path_regex'\n";
echo "req_uri: '$req_uri'\n";

$requested_path = $req_uri;
if (empty($requested_path)) {
    echo "requested_path is EMPTY!\n";
} else {
    echo "requested_path is NOT EMPTY: '$requested_path'\n";
}

