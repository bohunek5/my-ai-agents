<?php
require_once('wp-load.php');
// The issue is that get_theme_mod('op_portfolio_filter_typo_font_family') is returning an array/object instead of string
// Let's clear the problematic theme mods
remove_theme_mod('op_portfolio_filter_typo_font_family');
remove_theme_mod('op_portfolio_title_typo_font_family');
remove_theme_mod('op_portfolio_category_typo_font_family');
echo "OceanWP Portfolio fonts theme mods removed.\n";
