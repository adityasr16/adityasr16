# StyleWing

Point your camera at any moment:

- **Outfit finder** — identifies clothing items and links straight to where to buy them.
- **Wingman** — reads the observable context (venue, vibe) and suggests natural conversation openers.

It only reasons about *what's observable* — never who anyone is. No face recognition, no identifying strangers.

## Run locally

```bash
npm install
cp .env.example .env.local      # then paste your key into .env.local
npm run dev                     # http://localhost:3000
```

Get an API key at **console.anthropic.com → API Keys**, and add credits under **Plans & Billing**.

## Deploy a live demo (Vercel, free)

For a shareable `https://` URL — the right way to demo for YC (key stays server-side, works on any phone):

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. Go to **vercel.com → Add New → Project** and import the repo.
3. Set **Root Directory** to `stylewing`.
4. Under **Environment Variables**, add `ANTHROPIC_API_KEY` = your key.
5. **Deploy.** You'll get a live URL in ~1 minute.

Framework preset (Next.js), build command, and output are auto-detected — no extra config needed.

## Zero-setup browser test

`standalone.html` — open it directly (or on your phone), paste your API key, and both features work with no server. Good for the very first test, but it exposes the key in-browser, so **don't host it publicly**. Use the Vercel deploy above for anything shared.

## Model

Set in `src/lib/claude.ts` (and `standalone.html`). Defaults to `claude-sonnet-4-6` for fast, low-cost demos. Switch to `claude-opus-4-8` for maximum identification accuracy.

## Cost

The app is free to users, but each scan costs API credits — roughly **2¢ per scan** on Sonnet 4.6. Negligible for demos; plan rate limits / monetization before scaling.
