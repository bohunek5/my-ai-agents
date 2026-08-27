"""Download the non-secret PHP/JS runtime currently deployed on home.pl.

Credentials stay in the existing private workspace helper and runtime secrets
under payments/private are deliberately excluded.
"""

from pathlib import Path
import ftplib
import runpy


ROOT = Path(__file__).resolve().parents[2]
PROJECT = ROOT / "mazuryaktywnie"
CREDENTIALS = runpy.run_path(str(ROOT / "scratch" / "download_mazuryaktywnie.py"))

REMOTE_FILES = (
    "payments/bootstrap.php",
    "payments/availability.php",
    "payments/price-loader.php",
    "payments/start.php",
    "payments/status.php",
    "payments/return.php",
    "payments/check.php",
    "payments/admin-api.php",
    "payments/payment-bridge.js",
    "payments/admin-bridge.js",
    "payments/payment.css",
    "admin/index.php",
    "admin/.htaccess",
)


def main() -> None:
    ftp = ftplib.FTP(CREDENTIALS["server"], timeout=30)
    ftp.login(CREDENTIALS["user"], CREDENTIALS["password"])
    try:
        for remote in REMOTE_FILES:
            target = PROJECT / "public" / remote
            target.parent.mkdir(parents=True, exist_ok=True)
            with target.open("wb") as handle:
                ftp.retrbinary(f"RETR {remote}", handle.write)
            print(f"Downloaded {remote}")
    finally:
        ftp.quit()


if __name__ == "__main__":
    main()
