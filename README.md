# AnonIntent Web (Next.js + Tailwind)

Anonymous, intent-centric coordination demo. You can submit an intent without personal data; the UI hashes it locally, aggregates simple counts, and suggests when to coordinate.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What you can do

- Submit an intent (client-side SHA-256)
- See live result (hash + time)
- View simple time-bucket aggregation (Last 1h / 24h / All time)
- Read coordination suggestions (open a batch/window when there’s enough activity)

## Notes

- Frontend-only demo (no backend). Data lives in `localStorage` under `anonintent:intents`.
- Token placeholder: XAN.
# AnonIntent
