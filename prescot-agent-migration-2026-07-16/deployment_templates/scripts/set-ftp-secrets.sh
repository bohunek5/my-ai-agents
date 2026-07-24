#!/usr/bin/env bash
set -euo pipefail

if ! gh auth status >/dev/null 2>&1; then
  echo "Run first: gh auth login"
  exit 1
fi

read -r -p "FTP server/host: " ftp_server
read -r -p "FTP username: " ftp_username
read -r -s -p "FTP password: " ftp_password
printf "\n"
read -r -p "FTP remote dir, for example /public_html/domain.pl/: " ftp_server_dir

gh secret set FTP_SERVER -b "$ftp_server"
gh secret set FTP_USERNAME -b "$ftp_username"
gh secret set FTP_PASSWORD -b "$ftp_password"
gh secret set FTP_SERVER_DIR -b "$ftp_server_dir"

echo "FTP secrets saved in this GitHub repository."

