"""Upload the static export and PHP runtime to mazuryaktywnie.com.pl.

The script performs an additive FTP deployment. It never removes remote files,
so the protected payment configuration and historical orders stay untouched.
"""

from pathlib import Path
import ftplib
import runpy
import tempfile


ROOT = Path(__file__).resolve().parents[2]
PROJECT = ROOT / "mazuryaktywnie"
EXPORT = PROJECT / "out"
CREDENTIALS = runpy.run_path(str(ROOT / "scratch" / "download_mazuryaktywnie.py"))

CRITICAL_REMOTE_FILES = (
    "index.html",
    ".htaccess",
    "admin/index.php",
    "admin/index.html",
    "payments/bootstrap.php",
    "payments/admin-api.php",
    "payments/availability.php",
    "payments/start.php",
    "payments/status.php",
    "payments/return.php",
)


def ensure_remote_dir(ftp: ftplib.FTP, path: str) -> None:
    if not path:
        return
    current = ftp.pwd()
    try:
        ftp.cwd("/")
        for part in path.split("/"):
            if not part:
                continue
            try:
                ftp.cwd(part)
            except ftplib.error_perm:
                ftp.mkd(part)
                ftp.cwd(part)
    finally:
        ftp.cwd(current)


def backup_critical_files(ftp: ftplib.FTP, backup_dir: Path) -> None:
    for remote in CRITICAL_REMOTE_FILES:
        target = backup_dir / remote
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with target.open("wb") as handle:
                ftp.retrbinary(f"RETR {remote}", handle.write)
        except ftplib.error_perm:
            target.unlink(missing_ok=True)


def main() -> None:
    if not (EXPORT / "index.html").is_file():
        raise SystemExit("Missing out/index.html. Run npm run build first.")
    if not (EXPORT / "payments" / "bootstrap.php").is_file():
        raise SystemExit("Missing PHP runtime in static export.")

    ftp = ftplib.FTP(CREDENTIALS["server"], timeout=60)
    ftp.login(CREDENTIALS["user"], CREDENTIALS["password"])
    uploaded = 0
    backup_dir = Path(tempfile.mkdtemp(prefix="mazuryaktywnie-before-deploy-"))
    try:
        backup_critical_files(ftp, backup_dir)
        for local in sorted(path for path in EXPORT.rglob("*") if path.is_file()):
            remote = local.relative_to(EXPORT).as_posix()
            ensure_remote_dir(ftp, str(Path(remote).parent).replace(".", "", 1).lstrip("/"))
            with local.open("rb") as handle:
                ftp.storbinary(f"STOR {remote}", handle, blocksize=1024 * 256)
            uploaded += 1
    finally:
        ftp.quit()

    print(f"Uploaded {uploaded} files.")
    print(f"Pre-deployment backup: {backup_dir}")


if __name__ == "__main__":
    main()
