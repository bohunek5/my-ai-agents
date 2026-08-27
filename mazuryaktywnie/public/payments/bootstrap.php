<?php
declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

const P24_PRIVATE_DIR = __DIR__ . '/private';
const P24_ORDER_DIR = P24_PRIVATE_DIR . '/orders';
const P24_BLOCKED_RANGES_PATH = P24_PRIVATE_DIR . '/blocked-ranges.json';
const P24_SEASONAL_PRICES_PATH = P24_PRIVATE_DIR . '/seasonal-prices.json';
const P24_ADMIN_EMAIL = 'kontakt@mazuryaktywnie.com.pl';

function p24_security_headers(): void
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: same-origin');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
}

function p24_json(array $body, int $status = 200): void
{
    p24_security_headers();
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function p24_config(): array
{
    static $config;
    if (is_array($config)) {
        return $config;
    }

    $path = P24_PRIVATE_DIR . '/config.php';
    if (!is_file($path)) {
        throw new RuntimeException('Payment configuration is missing.');
    }

    $loaded = require $path;
    if (!is_array($loaded)) {
        throw new RuntimeException('Payment configuration is invalid.');
    }

    $config = $loaded;
    return $config;
}

function p24_assert_configured(array $config): void
{
    if (
        ($config['enabled'] ?? false) !== true ||
        (int) ($config['merchant_id'] ?? 0) <= 0 ||
        (int) ($config['pos_id'] ?? 0) <= 0 ||
        trim((string) ($config['api_key'] ?? '')) === '' ||
        trim((string) ($config['crc'] ?? '')) === ''
    ) {
        throw new RuntimeException('Payment configuration is incomplete.');
    }
}

function p24_save_verified_config(int $merchantId, int $posId, string $apiKey, string $crc): array
{
    $apiKey = trim($apiKey);
    $crc = trim($crc);
    if ($merchantId <= 0 || $posId <= 0 || strlen($apiKey) < 16 || strlen($apiKey) > 128 || strlen($crc) < 4 || strlen($crc) > 128) {
        throw new InvalidArgumentException('Dane Przelewy24 mają nieprawidłowy format.');
    }
    $config = [
        'enabled' => false,
        'merchant_id' => $merchantId,
        'pos_id' => $posId,
        'api_key' => $apiKey,
        'crc' => $crc,
        'api_url' => 'https://secure.przelewy24.pl/api/v1',
        'payment_url' => 'https://secure.przelewy24.pl/trnRequest/',
        'site_url' => 'https://mazuryaktywnie.com.pl',
        'currency' => 'PLN',
        'country' => 'PL',
        'language' => 'pl',
    ];
    $result = p24_api('GET', 'testAccess', [], $config);
    $connected = ($result['data'] ?? false) === true;
    if (!$connected) {
        throw new RuntimeException('Przelewy24 nie potwierdziło danych dostępowych.');
    }
    $config['enabled'] = true;
    $php = "<?php\ndeclare(strict_types=1);\nreturn " . var_export($config, true) . ";\n";
    $path = P24_PRIVATE_DIR . '/config.php';
    $handle = fopen($path, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('Nie udało się zapisać konfiguracji P24.');
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $php);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod($path, 0600);
    return $config;
}

function p24_input(): array
{
    $length = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($length > 16384) {
        p24_json(['ok' => false, 'message' => 'Nieprawidłowe dane żądania.'], 400);
    }

    $raw = file_get_contents('php://input');
    if (!is_string($raw) || $raw === '') {
        p24_json(['ok' => false, 'message' => 'Nieprawidłowe dane żądania.'], 400);
    }

    try {
        $data = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (JsonException $exception) {
        p24_json(['ok' => false, 'message' => 'Nieprawidłowy format danych.'], 400);
    }

    if (!is_array($data)) {
        p24_json(['ok' => false, 'message' => 'Nieprawidłowy format danych.'], 400);
    }

    return $data;
}

function p24_same_origin(array $config): bool
{
    $expected = rtrim((string) $config['site_url'], '/');
    $origin = rtrim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''), '/');
    if ($origin !== '') {
        return hash_equals($expected, $origin);
    }

    $referer = (string) ($_SERVER['HTTP_REFERER'] ?? '');
    return $referer !== '' && strpos($referer, $expected . '/') === 0;
}

function p24_clean_text($value, int $maxLength): string
{
    $text = trim(preg_replace('/\s+/u', ' ', (string) $value) ?? '');
    $length = function_exists('mb_strlen') ? mb_strlen($text) : strlen($text);
    if ($text === '' || $length > $maxLength || preg_match('/[\x00-\x1F\x7F]/u', $text)) {
        throw new InvalidArgumentException('Nieprawidłowe dane klienta.');
    }
    return $text;
}

function p24_date($value): DateTimeImmutable
{
    $date = DateTimeImmutable::createFromFormat('!d.m.Y', (string) $value, new DateTimeZone('Europe/Warsaw'));
    $errors = DateTimeImmutable::getLastErrors();
    if (!$date || (is_array($errors) && ($errors['warning_count'] > 0 || $errors['error_count'] > 0))) {
        throw new InvalidArgumentException('Nieprawidłowy termin rezerwacji.');
    }
    return $date;
}

function p24_prepare_booking(array $input, array $config): array
{
    $name = p24_clean_text($input['name'] ?? '', 40);
    $email = trim((string) ($input['email'] ?? ''));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 50) {
        throw new InvalidArgumentException('Podaj prawidłowy adres e-mail.');
    }

    $phone = preg_replace('/\D+/', '', (string) ($input['phone'] ?? '')) ?? '';
    if (strlen($phone) === 9) {
        $phone = '48' . $phone;
    }
    if (strlen($phone) < 9 || strlen($phone) > 12) {
        throw new InvalidArgumentException('Podaj prawidłowy numer telefonu.');
    }

    if (($input['terms'] ?? false) !== true) {
        throw new InvalidArgumentException('Zaakceptuj regulamin i politykę prywatności.');
    }

    $start = p24_date($input['startDate'] ?? '');
    $end = p24_date($input['endDate'] ?? '');
    $today = new DateTimeImmutable('today', new DateTimeZone('Europe/Warsaw'));
    if ($start < $today || $end < $start) {
        throw new InvalidArgumentException('Wybrany termin jest nieprawidłowy.');
    }

    // The end date is the return/check-out date. A 28-29 booking is one night.
    // A single selected date is still treated as a one-day charter.
    $days = max(1, (int) $start->diff($end)->days);
    if ($days < 1 || $days > 60) {
        throw new InvalidArgumentException('Rezerwacja może obejmować maksymalnie 60 dni.');
    }

    $counts = [];
    foreach (['sup', 'bike', 'ebike'] as $key) {
        $raw = $input[$key] ?? 0;
        if (!is_int($raw) && !(is_string($raw) && ctype_digit($raw))) {
            throw new InvalidArgumentException('Nieprawidłowa liczba dodatków.');
        }
        $counts[$key] = (int) $raw;
        if ($counts[$key] < 0 || $counts[$key] > 10) {
            throw new InvalidArgumentException('Nieprawidłowa liczba dodatków.');
        }
    }

    $prices = p24_prices();
    $boatAmount = p24_boat_total($start, $days, $prices, p24_seasonal_prices());
    $extrasDaily = $counts['sup'] * (int) ($prices['sup'] ?? 0)
        + $counts['bike'] * (int) ($prices['bike'] ?? 0)
        + $counts['ebike'] * (int) ($prices['ebike'] ?? 0);
    $amount = ($boatAmount + $extrasDaily * $days) * 100;
    if ($amount < 100 || $amount > 100000000) {
        throw new RuntimeException('Nie udało się obliczyć kwoty płatności.');
    }

    return [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'start_date' => $start->format('Y-m-d'),
        'end_date' => $end->format('Y-m-d'),
        'days' => $days,
        'boat_amount' => $boatAmount * 100,
        'sup' => $counts['sup'],
        'bike' => $counts['bike'],
        'ebike' => $counts['ebike'],
        'amount' => $amount,
        'currency' => (string) ($config['currency'] ?? 'PLN'),
    ];
}

function p24_prices(): array
{
    $defaults = [
        'boat' => 1200,
        'sup' => 50,
        'bike' => 50,
        'ebike' => 150,
        'deposit' => 2000,
    ];
    $path = P24_PRIVATE_DIR . '/prices.json';
    if (!is_file($path)) {
        return $defaults;
    }
    $raw = file_get_contents($path);
    $loaded = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($loaded)) {
        return $defaults;
    }
    foreach ($defaults as $key => $fallback) {
        $value = $loaded[$key] ?? $fallback;
        $defaults[$key] = is_int($value) ? $value : $fallback;
    }
    return $defaults;
}

function p24_save_prices(array $input): array
{
    $limits = [
        'boat' => [1, 100000],
        'sup' => [0, 10000],
        'bike' => [0, 10000],
        'ebike' => [0, 10000],
        'deposit' => [0, 100000],
    ];
    $prices = [];
    foreach ($limits as $key => [$min, $max]) {
        $value = $input[$key] ?? null;
        if (!is_int($value) && !(is_string($value) && ctype_digit($value))) {
            throw new InvalidArgumentException('Wszystkie ceny muszą być pełnymi kwotami w PLN.');
        }
        $value = (int) $value;
        if ($value < $min || $value > $max) {
            throw new InvalidArgumentException('Jedna z cen jest poza dozwolonym zakresem.');
        }
        $prices[$key] = $value;
    }
    $path = P24_PRIVATE_DIR . '/prices.json';
    $handle = fopen($path, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('Nie udało się zapisać cennika.');
    }
    $json = json_encode($prices, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $json);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod($path, 0600);
    return $prices;
}

function p24_seasonal_prices(): array
{
    if (!is_file(P24_SEASONAL_PRICES_PATH)) {
        return [];
    }
    $raw = file_get_contents(P24_SEASONAL_PRICES_PATH);
    $loaded = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($loaded)) {
        return [];
    }
    try {
        return p24_normalize_seasonal_prices($loaded);
    } catch (InvalidArgumentException $exception) {
        p24_log('seasonal_prices_invalid');
        return [];
    }
}

function p24_normalize_seasonal_prices(array $input): array
{
    if (count($input) > 80) {
        throw new InvalidArgumentException('Cennik może zawierać maksymalnie 80 okresów.');
    }

    $periods = [];
    foreach ($input as $index => $item) {
        if (!is_array($item)) {
            throw new InvalidArgumentException('Nieprawidłowa pozycja cennika.');
        }
        $start = p24_blocked_date($item['from'] ?? '');
        $end = p24_blocked_date($item['to'] ?? '');
        if ($end < $start) {
            throw new InvalidArgumentException('Koniec okresu cenowego nie może być wcześniejszy niż początek.');
        }
        if ((int) $start->diff($end)->days > 370) {
            throw new InvalidArgumentException('Jeden okres cenowy może obejmować maksymalnie 371 dni.');
        }

        $price = $item['price'] ?? null;
        if (!is_int($price) && !(is_string($price) && ctype_digit($price))) {
            throw new InvalidArgumentException('Cena okresu musi być pełną kwotą w PLN.');
        }
        $price = (int) $price;
        if ($price < 1 || $price > 100000) {
            throw new InvalidArgumentException('Cena okresu jest poza dozwolonym zakresem.');
        }

        $name = trim(preg_replace('/\s+/u', ' ', (string) ($item['name'] ?? '')) ?? '');
        if ($name === '') {
            $name = 'Okres ' . ($index + 1);
        }
        $nameLength = function_exists('mb_strlen') ? mb_strlen($name) : strlen($name);
        if ($nameLength > 60 || preg_match('/[\x00-\x1F\x7F]/u', $name)) {
            throw new InvalidArgumentException('Nazwa okresu cenowego jest za długa.');
        }

        $id = preg_replace('/[^a-zA-Z0-9_-]/', '', (string) ($item['id'] ?? '')) ?? '';
        if ($id === '') {
            $id = 'period-' . substr(hash('sha256', $start->format('Y-m-d') . '|' . $end->format('Y-m-d') . '|' . $index), 0, 12);
        }
        $periods[] = [
            'id' => substr($id, 0, 64),
            'name' => $name,
            'from' => $start->format('Y-m-d'),
            'to' => $end->format('Y-m-d'),
            'price' => $price,
        ];
    }

    usort($periods, static function (array $a, array $b): int {
        return strcmp($a['from'] . '|' . $a['to'], $b['from'] . '|' . $b['to']);
    });
    for ($index = 1, $count = count($periods); $index < $count; $index += 1) {
        if ($periods[$index]['from'] <= $periods[$index - 1]['to']) {
            throw new InvalidArgumentException('Okresy cenowe nie mogą na siebie nachodzić.');
        }
    }
    return $periods;
}

function p24_save_seasonal_prices(array $input): array
{
    $periods = p24_normalize_seasonal_prices($input);
    $handle = fopen(P24_SEASONAL_PRICES_PATH, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('Nie udało się zapisać cennika okresowego.');
    }
    $json = json_encode($periods, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $json);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod(P24_SEASONAL_PRICES_PATH, 0600);
    return $periods;
}

function p24_boat_price_for_date(DateTimeImmutable $date, array $prices, array $periods): int
{
    $key = $date->format('Y-m-d');
    foreach ($periods as $period) {
        if ($key >= $period['from'] && $key <= $period['to']) {
            return (int) $period['price'];
        }
    }
    return (int) ($prices['boat'] ?? 1200);
}

function p24_boat_total(DateTimeImmutable $start, int $days, array $prices, array $periods): int
{
    $total = 0;
    for ($offset = 0; $offset < $days; $offset += 1) {
        $total += p24_boat_price_for_date($start->modify('+' . $offset . ' days'), $prices, $periods);
    }
    return $total;
}

function p24_blocked_date($value): DateTimeImmutable
{
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', (string) $value, new DateTimeZone('Europe/Warsaw'));
    $errors = DateTimeImmutable::getLastErrors();
    if (!$date || (is_array($errors) && ($errors['warning_count'] > 0 || $errors['error_count'] > 0))) {
        throw new InvalidArgumentException('Nieprawidłowy format daty blokady.');
    }
    return $date;
}

function p24_normalize_blocked_ranges(array $input): array
{
    if (count($input) > 200) {
        throw new InvalidArgumentException('Zbyt duża liczba blokad kalendarza.');
    }

    $ranges = [];
    foreach ($input as $item) {
        if (!is_array($item)) {
            throw new InvalidArgumentException('Nieprawidłowa blokada kalendarza.');
        }

        $start = p24_blocked_date($item['from'] ?? '');
        $end = p24_blocked_date($item['to'] ?? '');
        if ($end < $start) {
            throw new InvalidArgumentException('Data końcowa blokady nie może być wcześniejsza niż początkowa.');
        }
        if ((int) $start->diff($end)->days > 365) {
            throw new InvalidArgumentException('Jedna blokada może obejmować maksymalnie 365 dni.');
        }

        $reason = trim(preg_replace('/\s+/u', ' ', (string) ($item['reason'] ?? '')) ?? '');
        if ($reason === '') {
            $reason = 'Blokada administratora';
        }
        $reasonLength = function_exists('mb_strlen') ? mb_strlen($reason) : strlen($reason);
        if ($reasonLength > 90 || preg_match('/[\x00-\x1F\x7F]/u', $reason)) {
            throw new InvalidArgumentException('Opis blokady jest za długi lub zawiera niedozwolone znaki.');
        }

        $ranges[] = [
            'from' => $start->format('Y-m-d'),
            'to' => $end->format('Y-m-d'),
            'status' => 'blocked',
            'reason' => $reason,
        ];
    }

    usort($ranges, static function (array $a, array $b): int {
        return strcmp($a['from'] . '|' . $a['to'] . '|' . $a['reason'], $b['from'] . '|' . $b['to'] . '|' . $b['reason']);
    });
    return $ranges;
}

function p24_manual_blocked_ranges(): array
{
    if (!is_file(P24_BLOCKED_RANGES_PATH)) {
        return [];
    }
    $raw = file_get_contents(P24_BLOCKED_RANGES_PATH);
    $loaded = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($loaded)) {
        return [];
    }
    try {
        return p24_normalize_blocked_ranges($loaded);
    } catch (InvalidArgumentException $exception) {
        p24_log('blocked_ranges_invalid');
        return [];
    }
}

function p24_save_manual_blocked_ranges(array $input): array
{
    $ranges = p24_normalize_blocked_ranges($input);
    if (!is_dir(P24_PRIVATE_DIR) && !mkdir(P24_PRIVATE_DIR, 0700, true) && !is_dir(P24_PRIVATE_DIR)) {
        throw new RuntimeException('Nie udało się przygotować zapisu blokad.');
    }

    $handle = fopen(P24_BLOCKED_RANGES_PATH, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('Nie udało się zapisać blokad kalendarza.');
    }

    $json = json_encode($ranges, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $json);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod(P24_BLOCKED_RANGES_PATH, 0600);
    return $ranges;
}

function p24_admin_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    session_name('mazury_admin_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

function p24_admin_required(): void
{
    p24_admin_session();
    if (($_SESSION['mazury_admin'] ?? false) !== true) {
        p24_json(['ok' => false, 'message' => 'Sesja administratora wygasła. Zaloguj się ponownie.'], 401);
    }
}

function p24_change_admin_password(string $password): void
{
    if (strlen($password) < 12 || strlen($password) > 128) {
        throw new InvalidArgumentException('Nowe hasło musi mieć co najmniej 12 znaków.');
    }
    $hash = password_hash($password, PASSWORD_DEFAULT);
    if (!is_string($hash)) {
        throw new RuntimeException('Nie udało się zabezpieczyć hasła.');
    }
    $php = "<?php\ndeclare(strict_types=1);\nreturn " . var_export([
        'username' => 'damian',
        'password_hash' => $hash,
    ], true) . ";\n";
    $path = P24_PRIVATE_DIR . '/admin.php';
    $handle = fopen($path, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('Nie udało się zmienić hasła.');
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $php);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod($path, 0600);
}

function p24_mail_subject(string $subject): string
{
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function p24_send_mail(string $to, string $subject, string $body, ?string $replyTo = null): bool
{
    if (!function_exists('mail')) {
        return false;
    }
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'From: Mazury Aktywnie <' . P24_ADMIN_EMAIL . '>',
    ];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    return mail($to, p24_mail_subject($subject), $body, implode("\r\n", $headers));
}

function p24_send_paid_emails(array &$order): void
{
    $amount = number_format(((int) $order['amount']) / 100, 2, ',', ' ');
    $reference = (string) $order['session_id'];
    $addons = [];
    if ((int) $order['sup'] > 0) $addons[] = 'SUP: ' . (int) $order['sup'];
    if ((int) $order['bike'] > 0) $addons[] = 'rowery tradycyjne: ' . (int) $order['bike'];
    if ((int) $order['ebike'] > 0) $addons[] = 'e-bike: ' . (int) $order['ebike'];
    $addonsText = $addons ? implode(', ', $addons) : 'brak';

    if (($order['mail_customer_sent'] ?? false) !== true) {
        $body = "Dzień dobry,\n\n"
            . "potwierdzamy płatność i rezerwację czarteru Stillo 31.\n\n"
            . "Termin: {$order['start_date']} – {$order['end_date']}\n"
            . "Liczba dni: {$order['days']}\n"
            . "Dodatki: {$addonsText}\n"
            . "Zapłacono: {$amount} PLN\n"
            . "Numer rezerwacji: {$reference}\n\n"
            . "W razie pytań odpowiedz na tę wiadomość lub napisz na " . P24_ADMIN_EMAIL . ".\n\n"
            . "Mazury Aktywnie";
        $order['mail_customer_sent'] = p24_send_mail(
            (string) $order['email'],
            'Potwierdzenie płatności i rezerwacji — Mazury Aktywnie',
            $body,
            P24_ADMIN_EMAIL
        );
    }

    if (($order['mail_admin_sent'] ?? false) !== true) {
        $body = "Nowa opłacona rezerwacja\n\n"
            . "Klient: {$order['name']}\n"
            . "E-mail: {$order['email']}\n"
            . "Telefon: {$order['phone']}\n"
            . "Termin: {$order['start_date']} – {$order['end_date']}\n"
            . "Liczba dni: {$order['days']}\n"
            . "Dodatki: {$addonsText}\n"
            . "Zapłacono: {$amount} PLN\n"
            . "Numer rezerwacji: {$reference}\n";
        $order['mail_admin_sent'] = p24_send_mail(
            P24_ADMIN_EMAIL,
            'Nowa opłacona rezerwacja — ' . $reference,
            $body,
            (string) $order['email']
        );
    }
    $order['mail_last_attempt_at'] = gmdate('c');
}

function p24_send_registered_emails(array &$order): void
{
    $amount = number_format(((int) $order['amount']) / 100, 2, ',', ' ');
    $reference = (string) $order['session_id'];
    $addons = [];
    if ((int) $order['sup'] > 0) $addons[] = 'SUP: ' . (int) $order['sup'];
    if ((int) $order['bike'] > 0) $addons[] = 'rowery tradycyjne: ' . (int) $order['bike'];
    if ((int) $order['ebike'] > 0) $addons[] = 'e-bike: ' . (int) $order['ebike'];
    $addonsText = $addons ? implode(', ', $addons) : 'brak';

    if (($order['mail_started_customer_sent'] ?? false) !== true) {
        $body = "Dzień dobry,\n\n"
            . "przyjęliśmy dane rezerwacji i przekierowujemy płatność do Przelewy24. "
            . "Rezerwacja zostanie ostatecznie potwierdzona po zaksięgowaniu płatności.\n\n"
            . "Termin: {$order['start_date']} – {$order['end_date']}\n"
            . "Liczba dób: {$order['days']}\n"
            . "Dodatki: {$addonsText}\n"
            . "Kwota: {$amount} PLN\n"
            . "Numer rezerwacji: {$reference}\n\n"
            . "Jeżeli płatność została przerwana, rozpocznij rezerwację ponownie lub skontaktuj się z nami.\n\n"
            . "Mazury Aktywnie";
        $order['mail_started_customer_sent'] = p24_send_mail(
            (string) $order['email'],
            'Przyjęliśmy rezerwację — oczekiwanie na płatność',
            $body,
            P24_ADMIN_EMAIL
        );
    }

    if (($order['mail_started_admin_sent'] ?? false) !== true) {
        $body = "Nowa rezerwacja oczekująca na płatność\n\n"
            . "Klient: {$order['name']}\n"
            . "E-mail: {$order['email']}\n"
            . "Telefon: {$order['phone']}\n"
            . "Termin: {$order['start_date']} – {$order['end_date']}\n"
            . "Liczba dób: {$order['days']}\n"
            . "Dodatki: {$addonsText}\n"
            . "Kwota: {$amount} PLN\n"
            . "Numer rezerwacji: {$reference}\n";
        $order['mail_started_admin_sent'] = p24_send_mail(
            P24_ADMIN_EMAIL,
            'Nowa rezerwacja oczekująca — ' . $reference,
            $body,
            (string) $order['email']
        );
    }
    $order['mail_started_last_attempt_at'] = gmdate('c');
}

function p24_order_path(string $sessionId): string
{
    if (!preg_match('/\AMA-[0-9]{8}-[a-f0-9]{32}\z/', $sessionId)) {
        throw new InvalidArgumentException('Invalid session identifier.');
    }
    return P24_ORDER_DIR . '/' . $sessionId . '.json';
}

function p24_save_order(array $order): void
{
    if (!is_dir(P24_ORDER_DIR) && !mkdir(P24_ORDER_DIR, 0700, true) && !is_dir(P24_ORDER_DIR)) {
        throw new RuntimeException('Cannot create order storage.');
    }

    $path = p24_order_path((string) $order['session_id']);
    $handle = fopen($path, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('Cannot store order.');
    }

    $json = json_encode($order, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $json);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod($path, 0600);
}

function p24_load_order(string $sessionId): ?array
{
    $path = p24_order_path($sessionId);
    if (!is_file($path)) {
        return null;
    }
    $raw = file_get_contents($path);
    if (!is_string($raw)) {
        return null;
    }
    try {
        $order = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (JsonException $exception) {
        return null;
    }
    return is_array($order) ? $order : null;
}

function p24_all_orders(): array
{
    $orders = [];
    foreach (glob(P24_ORDER_DIR . '/MA-*.json') ?: [] as $path) {
        $raw = file_get_contents($path);
        $order = is_string($raw) ? json_decode($raw, true) : null;
        if (is_array($order)) {
            $orders[] = $order;
        }
    }
    usort($orders, static function (array $a, array $b): int {
        return (int) ($b['created_at_ts'] ?? 0) <=> (int) ($a['created_at_ts'] ?? 0);
    });
    return $orders;
}

function p24_order_blocks_calendar(array $order): bool
{
    $adminStatus = (string) ($order['admin_status'] ?? '');
    if ($adminStatus === 'Cancelled') {
        return false;
    }
    if (in_array($adminStatus, ['Paid', 'Confirmed', 'Pending'], true)) {
        return true;
    }
    if (($order['status'] ?? '') === 'paid') {
        return true;
    }
    return in_array(($order['status'] ?? ''), ['creating', 'registered'], true)
        && (int) ($order['created_at_ts'] ?? 0) > time() - 1800;
}

function p24_order_occupied_end(array $order): string
{
    $start = DateTimeImmutable::createFromFormat('!Y-m-d', (string) ($order['start_date'] ?? ''));
    if (!$start) {
        return (string) ($order['end_date'] ?? '');
    }
    $days = max(1, (int) ($order['days'] ?? 1));
    return $start->modify('+' . ($days - 1) . ' days')->format('Y-m-d');
}

function p24_public_availability(): array
{
    $ranges = p24_manual_blocked_ranges();
    foreach (p24_all_orders() as $order) {
        if (!p24_order_blocks_calendar($order)) {
            continue;
        }
        $ranges[] = [
            'from' => (string) $order['start_date'],
            'to' => p24_order_occupied_end($order),
            'status' => ($order['status'] ?? '') === 'paid' ? 'booked' : 'held',
        ];
    }
    usort($ranges, static function (array $a, array $b): int {
        return strcmp($a['from'] . '|' . $a['to'] . '|' . $a['status'], $b['from'] . '|' . $b['to'] . '|' . $b['status']);
    });
    return $ranges;
}

function p24_admin_orders(): array
{
    $result = [];
    foreach (p24_all_orders() as $order) {
        $status = (string) ($order['status'] ?? '');
        if (!in_array($status, ['paid', 'creating', 'registered', 'registration_failed', 'manual'], true)) {
            continue;
        }
        $addons = [];
        if ((int) ($order['sup'] ?? 0) > 0) $addons[] = 'SUP x ' . (int) $order['sup'];
        if ((int) ($order['bike'] ?? 0) > 0) $addons[] = 'Rower tradycyjny x ' . (int) $order['bike'];
        if ((int) ($order['ebike'] ?? 0) > 0) $addons[] = 'Rower elektryczny x ' . (int) $order['ebike'];
        $start = DateTimeImmutable::createFromFormat('!Y-m-d', (string) $order['start_date']);
        $end = DateTimeImmutable::createFromFormat('!Y-m-d', (string) $order['end_date']);
        $result[] = [
            'id' => (string) $order['session_id'],
            'dates' => ($start ? $start->format('d.m.Y') : (string) $order['start_date'])
                . ' - ' . ($end ? $end->format('d.m.Y') : (string) $order['end_date']),
            'startDate' => (string) $order['start_date'],
            'endDate' => (string) $order['end_date'],
            'days' => (int) $order['days'],
            'addons' => (string) ($order['addons_text'] ?? ($addons ? implode(', ', $addons) : 'Brak')),
            'total' => ((int) $order['amount']) / 100,
            'status' => (string) ($order['admin_status'] ?? ($status === 'paid' ? 'Paid' : ($status === 'registration_failed' ? 'Cancelled' : 'Pending'))),
            'clientName' => (string) $order['name'],
            'clientEmail' => (string) $order['email'],
            'clientPhone' => (string) $order['phone'],
            'created_at' => (string) $order['created_at'],
            'notes' => (string) ($order['admin_notes'] ?? ($status === 'paid'
                ? 'Płatność potwierdzona przez Przelewy24. ID P24: ' . (int) ($order['p24_order_id'] ?? 0)
                : 'Oczekiwanie na potwierdzenie płatności Przelewy24.')),
        ];
    }
    return $result;
}

function p24_periods_overlap(array $a, array $b): bool
{
    return $a['start_date'] <= $b['end_date'] && $b['start_date'] <= $a['end_date'];
}

function p24_reserve_order(array $order): void
{
    if (!is_dir(P24_ORDER_DIR) && !mkdir(P24_ORDER_DIR, 0700, true) && !is_dir(P24_ORDER_DIR)) {
        throw new RuntimeException('Cannot create order storage.');
    }

    $lock = fopen(P24_PRIVATE_DIR . '/booking.lock', 'c+');
    if (!$lock || !flock($lock, LOCK_EX)) {
        throw new RuntimeException('Cannot lock booking storage.');
    }

    $now = time();
    foreach (p24_manual_blocked_ranges() as $blocked) {
        if (p24_periods_overlap([
            'start_date' => $order['start_date'],
            'end_date' => p24_order_occupied_end($order),
        ], [
            'start_date' => $blocked['from'],
            'end_date' => $blocked['to'],
        ])) {
            flock($lock, LOCK_UN);
            fclose($lock);
            throw new DomainException('Wybrany termin jest zablokowany w kalendarzu. Wybierz inny termin.');
        }
    }

    foreach (glob(P24_ORDER_DIR . '/MA-*.json') ?: [] as $path) {
        $raw = file_get_contents($path);
        $existing = is_string($raw) ? json_decode($raw, true) : null;
        if (!is_array($existing)) {
            continue;
        }
        $active = ($existing['status'] ?? '') === 'paid'
            || (in_array(($existing['status'] ?? ''), ['creating', 'registered'], true)
                && (int) ($existing['created_at_ts'] ?? 0) > $now - 1800);
        if ($active && p24_periods_overlap([
            'start_date' => $order['start_date'],
            'end_date' => p24_order_occupied_end($order),
        ], [
            'start_date' => $existing['start_date'],
            'end_date' => p24_order_occupied_end($existing),
        ])) {
            flock($lock, LOCK_UN);
            fclose($lock);
            throw new DomainException('Wybrany termin został właśnie zarezerwowany. Wybierz inny termin.');
        }
    }

    p24_save_order($order);
    flock($lock, LOCK_UN);
    fclose($lock);
}

function p24_sign(array $values): string
{
    return hash('sha384', json_encode($values, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR));
}

function p24_api(string $method, string $path, array $payload, array $config): array
{
    if (!function_exists('curl_init')) {
        throw new RuntimeException('PHP cURL extension is unavailable.');
    }

    $curl = curl_init(rtrim((string) $config['api_url'], '/') . '/' . ltrim($path, '/'));
    curl_setopt_array($curl, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 6,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
        CURLOPT_USERPWD => (int) $config['pos_id'] . ':' . (string) $config['api_key'],
        CURLOPT_HTTPHEADER => ['Accept: application/json', 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR),
    ]);
    $raw = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $error = curl_error($curl);
    curl_close($curl);

    if (!is_string($raw) || $error !== '') {
        throw new RuntimeException('P24 network error.');
    }
    try {
        $body = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (JsonException $exception) {
        throw new RuntimeException('Invalid P24 response.');
    }
    if ($status < 200 || $status >= 300 || !is_array($body)) {
        throw new RuntimeException('P24 rejected the request with HTTP ' . $status . '.');
    }
    return $body;
}

function p24_log(string $event, array $context = []): void
{
    $safe = array_intersect_key($context, array_flip(['session_id', 'http_status', 'code']));
    error_log('[mazury-p24] ' . $event . ' ' . json_encode($safe, JSON_UNESCAPED_SLASHES));
}
