<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

try {
    $sessionId = (string) ($_GET['session'] ?? '');
    $order = p24_load_order($sessionId);
    if (!$order) {
        p24_json(['ok' => false, 'status' => 'unknown'], 404);
    }

    $status = (string) ($order['status'] ?? 'unknown');
    p24_json([
        'ok' => true,
        'status' => $status === 'paid' ? 'paid' : ($status === 'registration_failed' ? 'failed' : 'pending'),
        'amount_pln' => number_format(((int) $order['amount']) / 100, 2, '.', ''),
        'start_date' => (string) $order['start_date'],
        'end_date' => (string) $order['end_date'],
    ]);
} catch (Throwable $exception) {
    p24_json(['ok' => false, 'status' => 'unknown'], 404);
}

