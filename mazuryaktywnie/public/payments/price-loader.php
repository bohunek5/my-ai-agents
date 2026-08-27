<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
p24_security_headers();
header('Content-Type: application/javascript; charset=utf-8');
$prices = p24_prices();
?>try {
localStorage.setItem('price_boat', <?= json_encode((string) $prices['boat']) ?>);
localStorage.setItem('price_sup', <?= json_encode((string) $prices['sup']) ?>);
localStorage.setItem('price_bike', <?= json_encode((string) $prices['bike']) ?>);
localStorage.setItem('price_ebike', <?= json_encode((string) $prices['ebike']) ?>);
localStorage.setItem('price_deposit', <?= json_encode((string) $prices['deposit']) ?>);
} catch (_) {}

