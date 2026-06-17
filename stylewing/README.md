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

## Deploy a live demo (Vercel, free) — beginner walkthrough

This gives you a public `https://` link to put in the YC application. The key stays on the server (safe to share), and it works on any phone.

1. Go to **vercel.com** and click **Sign Up** → **Continue with GitHub** (use the same GitHub account that owns this repo). Approve the access prompt.
2. On your Vercel dashboard, click **Add New… → Project**.
3. Find **`adityasr16/adityasr16`** in the list and click **Import**.
4. **⚠️ The one step people get wrong:** find **Root Directory**, click **Edit**, and choose the **`stylewing`** folder. (The app lives in that subfolder — if you skip this, the deploy fails.)
5. Open **Environment Variables** and add one:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from console.anthropic.com
   - Click **Add**.
6. Click **Deploy** and wait ~1 minute. You'll get a live link like `https://stylewing-xxxx.vercel.app`.

Everything else (framework = Next.js, build command, output) is auto-detected — don't change it. After this, any time the `main` branch updates, Vercel redeploys automatically.

## Zero-setup browser test

`standalone.html` — open it directly (or on your phone), paste your API key, and both features work with no server. Good for the very first test, but it exposes the key in-browser, so **don't host it publicly**. Use the Vercel deploy above for anything shared.

## Model

Set in `src/lib/claude.ts` (and `standalone.html`). Defaults to `claude-sonnet-4-6` for fast, low-cost demos. Switch to `claude-opus-4-8` for maximum identification accuracy.

## Cost

The app is free to users, but each scan costs API credits — roughly **2¢ per scan** on Sonnet 4.6. Negligible for demos; plan rate limits / monetization before scaling.
