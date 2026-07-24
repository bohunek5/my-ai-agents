---
name: look-preview
description: Use when the user asks to open, run, inspect, or compare a local website in LOOK, LOOK preview, multi-device preview, phone/tablet preview, or asks for a localhost target such as "site on 3000 and LOOK on 3001". This skill guides Codex to run the target app normally and run /Users/karolbohdanowicz/my-ai-agents/LOOK as the multi-device localhost dashboard.
---

# LOOK Preview

Use `/Users/karolbohdanowicz/my-ai-agents/LOOK` as the local multi-device preview dashboard.

## Workflow

1. Determine the target site URL. Default to `http://localhost:3000` when the user says "3000", "localhost 3000", or does not specify a target.
2. Start or keep the target app running on its normal port. Do not move the target app to port 3001 unless the user explicitly asks.
3. Start LOOK separately on port `3001`:

```bash
cd /Users/karolbohdanowicz/my-ai-agents/LOOK
TARGET_URL=http://localhost:3000 PORT=3001 npm start
```

4. Give the user both URLs:

```text
Target: http://localhost:3000
LOOK:   http://localhost:3001/?url=http%3A%2F%2Flocalhost%3A3000
```

## Notes

- LOOK renders the target in four iframe devices: iPhone portrait, iPhone landscape, iPad portrait, and iPad landscape.
- The user can click and scroll directly inside each device frame.
- If a target page blocks iframe embedding through `X-Frame-Options` or CSP, report that limitation and inspect the target in its normal browser tab instead.
