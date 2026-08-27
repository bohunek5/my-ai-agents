"""Run a short, read-only live check of PHP pricing and Przelewy24 access."""

from io import BytesIO
import ftplib
import json
import runpy
import secrets
import urllib.request


CREDENTIALS = runpy.run_path("../scratch/download_mazuryaktywnie.py")
FILENAME = f"payments/runtime-check-{secrets.token_hex(10)}.php"
PHP = b"""<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
try {
    $config = p24_config();
    p24_assert_configured($config);
    $access = p24_api('GET', 'testAccess', [], $config);
    $periods = p24_normalize_seasonal_prices([[
        'id' => 'test', 'name' => 'Maj', 'from' => '2027-05-01',
        'to' => '2027-05-31', 'price' => 800,
    ]]);
    $booking = p24_prepare_booking([
        'name' => 'Test techniczny', 'email' => 'test@example.com',
        'phone' => '600000000', 'terms' => true,
        'startDate' => '28.09.2027', 'endDate' => '29.09.2027',
        'sup' => 0, 'bike' => 0, 'ebike' => 0,
    ], $config);
    p24_json([
        'ok' => ($access['data'] ?? false) === true,
        'p24' => ($access['data'] ?? false) === true,
        'seasonal_price' => $periods[0]['price'] ?? 0,
        'rental_days' => $booking['days'] ?? 0,
    ]);
} catch (Throwable $exception) {
    p24_json(['ok' => false], 500);
}
"""


def main() -> None:
    ftp = ftplib.FTP(CREDENTIALS["server"], timeout=30)
    ftp.login(CREDENTIALS["user"], CREDENTIALS["password"])
    try:
        ftp.storbinary(f"STOR {FILENAME}", BytesIO(PHP))
        with urllib.request.urlopen(f"https://mazuryaktywnie.com.pl/{FILENAME}", timeout=30) as response:
            result = json.loads(response.read())
        print(json.dumps(result, separators=(",", ":")))
        if result != {"ok": True, "p24": True, "seasonal_price": 800, "rental_days": 1}:
            raise SystemExit(1)
    finally:
        try:
            ftp.delete(FILENAME)
        finally:
            ftp.quit()


if __name__ == "__main__":
    main()
