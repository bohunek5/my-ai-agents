<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    p24_json(['ok' => false, 'message' => 'Metoda niedozwolona.'], 405);
}

try {
    $config = p24_config();
    p24_assert_configured($config);
    if (!p24_same_origin($config)) {
        p24_json(['ok' => false, 'message' => 'Żądanie zostało odrzucone.'], 403);
    }

    $booking = p24_prepare_booking(p24_input(), $config);
    $sessionId = 'MA-' . date('Ymd') . '-' . bin2hex(random_bytes(16));
    $order = $booking + [
        'session_id' => $sessionId,
        'status' => 'creating',
        'created_at' => gmdate('c'),
        'created_at_ts' => time(),
    ];
    p24_reserve_order($order);

    $registerSign = p24_sign([
        'sessionId' => $sessionId,
        'merchantId' => (int) $config['merchant_id'],
        'amount' => (int) $order['amount'],
        'currency' => (string) $order['currency'],
        'crc' => (string) $config['crc'],
    ]);

    $site = rtrim((string) $config['site_url'], '/');
    $payload = [
        'merchantId' => (int) $config['merchant_id'],
        'posId' => (int) $config['pos_id'],
        'sessionId' => $sessionId,
        'amount' => (int) $order['amount'],
        'currency' => (string) $order['currency'],
        'description' => 'Czarter Stillo 31 ' . $order['start_date'] . ' - ' . $order['end_date'],
        'email' => (string) $order['email'],
        'client' => (string) $order['name'],
        'phone' => (string) $order['phone'],
        'country' => (string) $config['country'],
        'language' => (string) $config['language'],
        'urlReturn' => $site . '/payments/return.php?session=' . rawurlencode($sessionId),
        'urlStatus' => $site . '/payments/status.php',
        'timeLimit' => 20,
        'sign' => $registerSign,
    ];

    $response = p24_api('POST', 'transaction/register', $payload, $config);
    $token = (string) ($response['data']['token'] ?? '');
    if (!preg_match('/\A[a-zA-Z0-9-]{10,100}\z/', $token)) {
        throw new RuntimeException('P24 did not return a valid token.');
    }

    $order['status'] = 'registered';
    $order['registered_at'] = gmdate('c');
    $order['p24_token'] = $token;
    p24_send_registered_emails($order);
    p24_save_order($order);

    p24_json([
        'ok' => true,
        'reservation_id' => $sessionId,
        'redirect_url' => rtrim((string) $config['payment_url'], '/') . '/' . rawurlencode($token),
    ]);
} catch (InvalidArgumentException | DomainException $exception) {
    p24_json(['ok' => false, 'message' => $exception->getMessage()], 422);
} catch (Throwable $exception) {
    if (isset($order) && is_array($order)) {
        $order['status'] = 'registration_failed';
        $order['updated_at'] = gmdate('c');
        try {
            p24_save_order($order);
        } catch (Throwable $ignored) {
        }
    }
    p24_log('registration_failed', ['session_id' => $sessionId ?? '']);
    p24_json(['ok' => false, 'message' => 'Płatność nie mogła zostać uruchomiona. Spróbuj ponownie za chwilę.'], 503);
}
