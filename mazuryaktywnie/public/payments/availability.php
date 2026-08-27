<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    p24_json(['ok' => false], 405);
}

p24_json([
    'ok' => true,
    'ranges' => p24_public_availability(),
    'prices' => p24_prices(),
    'seasonal_prices' => p24_seasonal_prices(),
]);
