<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    p24_json(['ok' => false], 405);
}

try {
    $config = p24_config();
    p24_assert_configured($config);
    $notification = p24_input();

    $required = ['merchantId', 'posId', 'sessionId', 'amount', 'originAmount', 'currency', 'orderId', 'methodId', 'statement', 'sign'];
    foreach ($required as $field) {
        if (!array_key_exists($field, $notification)) {
            throw new InvalidArgumentException('Missing notification field.');
        }
    }

    $sessionId = (string) $notification['sessionId'];
    $order = p24_load_order($sessionId);
    if (!$order) {
        throw new InvalidArgumentException('Unknown transaction.');
    }

    if (
        (int) $notification['merchantId'] !== (int) $config['merchant_id'] ||
        (int) $notification['posId'] !== (int) $config['pos_id'] ||
        (int) $notification['amount'] !== (int) $order['amount'] ||
        (int) $notification['originAmount'] !== (int) $order['amount'] ||
        (string) $notification['currency'] !== (string) $order['currency']
    ) {
        throw new InvalidArgumentException('Transaction parameters do not match.');
    }

    $notificationSign = p24_sign([
        'merchantId' => (int) $notification['merchantId'],
        'posId' => (int) $notification['posId'],
        'sessionId' => $sessionId,
        'amount' => (int) $notification['amount'],
        'originAmount' => (int) $notification['originAmount'],
        'currency' => (string) $notification['currency'],
        'orderId' => (int) $notification['orderId'],
        'methodId' => (int) $notification['methodId'],
        'statement' => (string) $notification['statement'],
        'crc' => (string) $config['crc'],
    ]);
    if (!hash_equals($notificationSign, (string) $notification['sign'])) {
        throw new InvalidArgumentException('Invalid notification signature.');
    }

    if (($order['status'] ?? '') === 'paid' && (int) ($order['p24_order_id'] ?? 0) === (int) $notification['orderId']) {
        p24_send_paid_emails($order);
        p24_save_order($order);
        p24_json(['ok' => true]);
    }

    $verifyPayload = [
        'merchantId' => (int) $config['merchant_id'],
        'posId' => (int) $config['pos_id'],
        'sessionId' => $sessionId,
        'amount' => (int) $order['amount'],
        'currency' => (string) $order['currency'],
        'orderId' => (int) $notification['orderId'],
        'sign' => p24_sign([
            'sessionId' => $sessionId,
            'orderId' => (int) $notification['orderId'],
            'amount' => (int) $order['amount'],
            'currency' => (string) $order['currency'],
            'crc' => (string) $config['crc'],
        ]),
    ];
    $verified = p24_api('PUT', 'transaction/verify', $verifyPayload, $config);
    if (($verified['data']['status'] ?? '') !== 'success') {
        throw new RuntimeException('P24 verification failed.');
    }

    $order['status'] = 'paid';
    $order['paid_at'] = gmdate('c');
    $order['p24_order_id'] = (int) $notification['orderId'];
    $order['p24_method_id'] = (int) $notification['methodId'];
    unset($order['p24_token']);
    p24_save_order($order);
    p24_send_paid_emails($order);
    p24_save_order($order);
    p24_json(['ok' => true]);
} catch (Throwable $exception) {
    p24_log('notification_rejected', ['session_id' => $sessionId ?? '']);
    p24_json(['ok' => false], 400);
}
