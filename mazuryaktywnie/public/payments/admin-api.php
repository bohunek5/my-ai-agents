<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
p24_admin_required();

function p24_admin_booking_from_input(array $input, ?array $existing = null): array
{
    $status = (string) ($input['status'] ?? 'Confirmed');
    if (!in_array($status, ['Paid', 'Confirmed', 'Pending', 'Cancelled'], true)) {
        throw new InvalidArgumentException('Nieprawidłowy status rezerwacji.');
    }

    $dates = (string) ($input['dates'] ?? '');
    if (!preg_match('/(\d{2}\.\d{2}\.\d{4})\s*-\s*(\d{2}\.\d{2}\.\d{4})/', $dates, $matches)) {
        throw new InvalidArgumentException('Podaj termin w formacie dd.mm.rrrr - dd.mm.rrrr.');
    }
    $start = p24_date($matches[1]);
    $end = p24_date($matches[2]);
    if ($end < $start) {
        throw new InvalidArgumentException('Data końcowa nie może być wcześniejsza niż początkowa.');
    }

    $name = p24_clean_text($input['clientName'] ?? 'Klient', 80);
    $email = trim((string) ($input['clientEmail'] ?? ''));
    if ($email !== '' && (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 100)) {
        throw new InvalidArgumentException('Podaj prawidłowy adres e-mail klienta.');
    }
    $phone = trim((string) ($input['clientPhone'] ?? ''));
    if (strlen($phone) > 30) {
        throw new InvalidArgumentException('Numer telefonu jest za długi.');
    }
    $addons = trim((string) ($input['addons'] ?? 'Brak'));
    $notes = trim((string) ($input['notes'] ?? ''));
    if (strlen($addons) > 300 || strlen($notes) > 2000) {
        throw new InvalidArgumentException('Dodatki lub notatki są za długie.');
    }
    $total = $input['total'] ?? 0;
    if (!is_numeric($total) || (float) $total < 0 || (float) $total > 1000000) {
        throw new InvalidArgumentException('Nieprawidłowa kwota rezerwacji.');
    }

    $days = max(1, (int) $start->diff($end)->days);
    $order = $existing ?? [];
    $order['session_id'] = (string) ($order['session_id'] ?? ('MA-' . date('Ymd') . '-' . bin2hex(random_bytes(16))));
    $order['status'] = (string) ($order['status'] ?? 'manual');
    $order['admin_status'] = $status;
    $order['name'] = $name;
    $order['email'] = $email;
    $order['phone'] = $phone;
    $order['start_date'] = $start->format('Y-m-d');
    $order['end_date'] = $end->format('Y-m-d');
    $order['days'] = $days;
    $order['amount'] = (int) round((float) $total * 100);
    $order['currency'] = (string) ($order['currency'] ?? 'PLN');
    $order['sup'] = (int) ($order['sup'] ?? 0);
    $order['bike'] = (int) ($order['bike'] ?? 0);
    $order['ebike'] = (int) ($order['ebike'] ?? 0);
    $order['addons_text'] = $addons === '' ? 'Brak' : $addons;
    $order['admin_notes'] = $notes;
    $order['created_at'] = (string) ($order['created_at'] ?? gmdate('c'));
    $order['created_at_ts'] = (int) ($order['created_at_ts'] ?? time());
    $order['updated_at'] = gmdate('c');

    // Never rewrite values signed and registered with Przelewy24. The admin may
    // change status/notes, while payment-critical data remains an audit record.
    if ($existing && ($existing['status'] ?? '') !== 'manual') {
        foreach (['name', 'email', 'phone', 'start_date', 'end_date', 'days', 'amount', 'currency', 'sup', 'bike', 'ebike', 'boat_amount'] as $field) {
            if (array_key_exists($field, $existing)) {
                $order[$field] = $existing[$field];
            }
        }
    }
    return $order;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
    $config = [];
    try {
        $config = p24_config();
    } catch (Throwable $ignored) {
    }
    p24_json([
        'ok' => true,
        'prices' => p24_prices(),
        'seasonal_prices' => p24_seasonal_prices(),
        'orders' => p24_admin_orders(),
        'blocked_ranges' => p24_public_availability(),
        'manual_blocked_ranges' => p24_manual_blocked_ranges(),
        'gateway' => [
            'name' => 'Przelewy24',
            'enabled' => ($config['enabled'] ?? false) === true,
            'merchant_id' => (int) ($config['merchant_id'] ?? 0),
        ],
    ]);
}


if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: GET, POST');
    p24_json(['ok' => false, 'message' => 'Metoda niedozwolona.'], 405);
}

$csrf = (string) ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
if ($csrf === '' || !hash_equals((string) ($_SESSION['csrf'] ?? ''), $csrf)) {
    p24_json(['ok' => false, 'message' => 'Nieprawidłowy token bezpieczeństwa.'], 403);
}

try {
    $input = p24_input();
    $action = (string) ($input['action'] ?? '');
    if ($action === 'save_prices') {
        $prices = p24_save_prices((array) ($input['prices'] ?? []));
        p24_json(['ok' => true, 'prices' => $prices]);
    }
    if ($action === 'save_seasonal_prices') {
        $periods = p24_save_seasonal_prices((array) ($input['seasonal_prices'] ?? []));
        p24_json([
            'ok' => true,
            'seasonal_prices' => $periods,
            'message' => 'Cennik okresowy został zapisany.',
        ]);
    }
    if ($action === 'save_blocked_ranges') {
        $ranges = p24_save_manual_blocked_ranges((array) ($input['blocked_ranges'] ?? []));
        p24_json([
            'ok' => true,
            'manual_blocked_ranges' => $ranges,
            'blocked_ranges' => p24_public_availability(),
            'message' => 'Blokady kalendarza zostały zapisane.',
        ]);
    }
    if ($action === 'save_booking') {
        $booking = (array) ($input['booking'] ?? []);
        $id = (string) ($booking['id'] ?? '');
        $existing = $id !== '' ? p24_load_order($id) : null;
        if ($id !== '' && !$existing) {
            throw new InvalidArgumentException('Nie znaleziono rezerwacji.');
        }
        $order = p24_admin_booking_from_input($booking, $existing);
        p24_save_order($order);
        p24_json(['ok' => true, 'orders' => p24_admin_orders(), 'booking_id' => $order['session_id']]);
    }
    if ($action === 'delete_booking') {
        $id = (string) ($input['booking_id'] ?? '');
        $path = p24_order_path($id);
        if (!is_file($path)) {
            throw new InvalidArgumentException('Nie znaleziono rezerwacji.');
        }
        if (!unlink($path)) {
            throw new RuntimeException('Nie udało się usunąć rezerwacji.');
        }
        p24_json(['ok' => true, 'orders' => p24_admin_orders()]);
    }
    if ($action === 'send_booking_email') {
        $id = (string) ($input['booking_id'] ?? '');
        $order = p24_load_order($id);
        if (!$order || !filter_var((string) ($order['email'] ?? ''), FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Rezerwacja nie ma prawidłowego adresu e-mail.');
        }
        $amount = number_format(((int) $order['amount']) / 100, 2, ',', ' ');
        $status = (string) ($order['admin_status'] ?? (($order['status'] ?? '') === 'paid' ? 'Paid' : 'Pending'));
        $body = "Dzień dobry,\n\n"
            . "status rezerwacji {$order['session_id']}: {$status}.\n"
            . "Termin: {$order['start_date']} – {$order['end_date']}\n"
            . "Liczba dób: {$order['days']}\n"
            . "Kwota: {$amount} PLN\n\n"
            . "W razie pytań odpowiedz na tę wiadomość.\n\nMazury Aktywnie";
        $sent = p24_send_mail((string) $order['email'], 'Informacja o rezerwacji — ' . $order['session_id'], $body, P24_ADMIN_EMAIL);
        p24_json(['ok' => $sent, 'message' => $sent ? 'Wiadomość została przyjęta do wysyłki.' : 'Serwer nie przyjął wiadomości.'], $sent ? 200 : 503);
    }
    if ($action === 'test_mail') {
        $sent = p24_send_mail(
            P24_ADMIN_EMAIL,
            'Test poczty — Mazury Aktywnie',
            "To jest test wiadomości wysłanej przez serwer mazuryaktywnie.com.pl.\n\nJeśli ją widzisz, wysyłka z aplikacji działa."
        );
        p24_json([
            'ok' => $sent,
            'message' => $sent ? 'Serwer przyjął wiadomość do wysyłki.' : 'Serwer odrzucił próbę wysłania wiadomości.',
        ], $sent ? 200 : 503);
    }
    if ($action === 'test_p24') {
        $config = p24_config();
        p24_assert_configured($config);
        $result = p24_api('GET', 'testAccess', [], $config);
        $connected = ($result['data'] ?? false) === true;
        p24_json([
            'ok' => $connected,
            'message' => $connected ? 'Połączenie z Przelewy24 działa.' : 'Przelewy24 odrzuciło dane dostępowe.',
        ], $connected ? 200 : 503);
    }
    if ($action === 'save_p24_config') {
        $config = p24_save_verified_config(
            (int) ($input['merchant_id'] ?? 0),
            (int) ($input['pos_id'] ?? 0),
            (string) ($input['api_key'] ?? ''),
            (string) ($input['crc'] ?? '')
        );
        p24_json([
            'ok' => true,
            'message' => 'Połączenie z Przelewy24 zostało potwierdzone.',
            'merchant_id' => (int) $config['merchant_id'],
        ]);
    }
    if ($action === 'change_password') {
        p24_change_admin_password((string) ($input['password'] ?? ''));
        p24_json(['ok' => true, 'message' => 'Hasło panelu zostało zmienione.']);
    }
    p24_json(['ok' => false, 'message' => 'Nieznana operacja.'], 400);
} catch (InvalidArgumentException $exception) {
    p24_json(['ok' => false, 'message' => $exception->getMessage()], 422);
} catch (Throwable $exception) {
    p24_log('admin_api_failed');
    p24_json(['ok' => false, 'message' => 'Nie udało się zapisać zmian.'], 500);
}
