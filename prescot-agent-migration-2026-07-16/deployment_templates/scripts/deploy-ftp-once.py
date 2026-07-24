#!/usr/bin/env python3
import ftplib
import os
from pathlib import Path


FTP_SERVER = os.environ["FTP_SERVER"]
FTP_USERNAME = os.environ["FTP_USERNAME"]
FTP_PASSWORD = os.environ["FTP_PASSWORD"]
FTP_SERVER_DIR = os.environ.get("FTP_SERVER_DIR", "/")
LOCAL_DIR = Path(os.environ.get("LOCAL_DIR", "dist")).resolve()


def ensure_dir(ftp: ftplib.FTP, path: str) -> None:
    parts = [p for p in path.strip("/").split("/") if p]
    if path.startswith("/"):
        ftp.cwd("/")
    for part in parts:
        try:
            ftp.mkd(part)
        except ftplib.error_perm:
            pass
        ftp.cwd(part)


def upload_dir(ftp: ftplib.FTP, local_dir: Path) -> None:
    for item in sorted(local_dir.iterdir()):
        if item.name in {".git", "node_modules", ".DS_Store"}:
            continue
        if item.is_dir():
            try:
                ftp.mkd(item.name)
            except ftplib.error_perm:
                pass
            ftp.cwd(item.name)
            upload_dir(ftp, item)
            ftp.cwd("..")
        elif item.is_file():
            with item.open("rb") as fh:
                ftp.storbinary(f"STOR {item.name}", fh)


def main() -> None:
    if not LOCAL_DIR.exists():
        raise SystemExit(f"LOCAL_DIR does not exist: {LOCAL_DIR}")

    with ftplib.FTP(FTP_SERVER, timeout=60) as ftp:
        ftp.login(FTP_USERNAME, FTP_PASSWORD)
        ensure_dir(ftp, FTP_SERVER_DIR)
        upload_dir(ftp, LOCAL_DIR)

    print(f"Uploaded {LOCAL_DIR} to {FTP_SERVER}:{FTP_SERVER_DIR}")


if __name__ == "__main__":
    main()

