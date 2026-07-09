---
name: nextjs-homepl-deploy
description: Protocol for deploying Next.js static exports to home.pl FTP server. Prevents the "stale zip" deployment bug.
---

# Next.js to home.pl FTP Deployment Protocol

**CRITICAL BUG PREVENTION**: Never skip the `zip` step between `npm run build` and uploading the archive. If you run `npm run build`, the `out` directory is updated, but if you don't explicitly zip it, you will upload an old `out.zip` to the FTP server, leading to severe desynchronization and user frustration.

## Deployment Steps

Whenever you are asked to build and deploy a Next.js application (like `scharfer-redesign`) to a `home.pl` FTP server using a python upload script and PHP unzip script, you MUST use the following exact chain of commands (adjust paths/scripts if necessary, but keep the logical flow):

```bash
npm run build && rm -f out.zip && cd out && zip -r ../out.zip . && cd ../.. && python3 upload_ftp_home.py && curl -s https://<DOMAIN>/unzip_scharfer.php
```

### Breakdown of the mandatory chain:
1. `npm run build`: Generates the static export in the `out/` directory.
2. `rm -f out.zip`: Removes the stale zip file to avoid uploading old code if the zip fails.
3. `cd out && zip -r ../out.zip .`: **CRUCIAL STEP.** Compresses the fresh `out/` directory into `out.zip`.
4. `cd ../.. && python3 upload_ftp_home.py`: Uploads the newly created `out.zip` via FTP.
5. `curl -s https://<DOMAIN>/unzip_scharfer.php`: Triggers the remote extraction script on the server.

### Diagnostics
If the user reports that changes are "not visible", immediately check:
- Did you actually zip the `out` directory, or did you just run `upload_ftp_home.py`?
- Verify the timestamp of `out.zip` using `ls -l out.zip`. If the timestamp doesn't match your recent build time, your pipeline is broken.
