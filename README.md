# Alley Pally — design preview

A **temporary, static design preview** of a proposed Alley Pally website, published for
client review.

**This is not the live Alley Pally website.** The real site is
[alleypallycafe.com](https://alleypallycafe.com) and lives in a different repository. Every
page here is marked `noindex, nofollow` and carries a visible "Design preview" banner.

Live preview: **https://pgpgpgpgpgk.github.io/alley-pally/**

---

## What this is

A Next.js **static export** — plain HTML, CSS, JavaScript and images, with no server,
no database and no secrets. GitHub Pages cannot run a server, and the production
application depends on Cloudflare Workers and a D1 database, so it was never going to be
forced into this shape. This is a separate, cut-down copy of the approved design.

### Pages

| Path | What it is |
|---|---|
| `/` | The homepage |
| `/nallagandla/` | The main café — drone footage, Sunday music, four expandable tiles |
| `/mini/` | The kiosk at Pickleball Central |
| `/experience/read/` | Reading, the Reader's Room |
| `/experience/play/` | Board games, the Game Room |
| `/experience/eat-drink/` | Food, coffee, the wood-fired oven |
| `/events/` | What's on |

### What is adapted for static hosting

Three things in the working design read from a live database. None of them is faked here,
and **no record of any kind has been invented**:

- **The book catalogue** (Read) — normally the real shelf, queried from D1. The section
  explains that and links to the live catalogue.
- **Past events** — normally the real event history. The section explains that and links to
  the live events page.
- **Upcoming events** — shown as empty, which is the *accurate* state: the live site also
  has no upcoming events at the time of publishing. It is not a placeholder.

The menu is deliberately **not** copied. Its link points at the live
[`/menu`](https://alleypallycafe.com/menu), which printed QR codes in the café depend on.

Everything else — the storytelling interaction, the drone video, the expandable tiles, the
navigation, the imagery and the responsive behaviour — is the real design.

---

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000/alley-pally
npm run build    # static export into out/
```

`npm run build` runs `next build` and then `scripts/flatten-rsc.mjs`, which writes the
flattened route-payload filenames the Next client router requests. Without that step every
link hover logs a 404 on a static host.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the export and
publishes it to GitHub Pages. No other deployment target is involved — not Vercel, not
Netlify, not Cloudflare.

---

## Removing this preview when review is finished

The preview is temporary. To take it down, in order of how thorough you want to be:

1. **Unpublish the site** — repository **Settings → Pages → Source → None**. The URL stops
   serving immediately. This is the one step that actually removes the public site.
2. **Stop future deployments** — delete `.github/workflows/deploy.yml`, or disable the
   workflow under the **Actions** tab.
3. **Delete the deployment history** — repository **Settings → Environments →
   `github-pages` → delete**. Removes the stored build artifacts.
4. **Delete the repository** — Settings → General → Danger Zone. Only this repository;
   it is separate from the production application.

Nothing here needs to be kept: the approved design lives in the main Alley Pally project,
under `src/app/design-preview-v4/`, which is where any further work should happen.
