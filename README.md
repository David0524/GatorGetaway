# Gator Haven House

The website for www.gatorhavenhouse.com: an 1899 Victorian vacation rental in Gainesville's Historic Duck Pond District. Its job is to collect a guest list before the house opens at the end of 2026.

- `PLAN.md`: the design and content plan.
- `CHATGPT_PROMPTS.md`: prompts for the logo, renderings, social graphics and history research.
- `design-source/CLAUDE_FOR_CHROME_ART_RUN.md`: a run file for Claude for Chrome to generate the full illustration set in ChatGPT.
- `design-source/direction/`: the round 3 direction board and prototype.

## Pages

| File | What it is |
|---|---|
| `site/index.html` | Home: announcement, opening timeline, the house, before/after slider, early-guest rates, guest list form |
| `site/photos.html` | The home today, the transformation, and renderings of the finished rooms |
| `site/history.html` | History of the home (written to be edited) |
| `site/404.html` | Shown for any address that doesn't exist (Netlify uses it automatically) |
| `site/thanks.html` | Shown after the form is sent if a visitor's browser has JavaScript off |

The public site lives in `site/` (HTML, `css/site.css`, `js/site.js`, `images/`). Netlify publishes only that folder, so these notes and the prompts are never public. No build step.

The animation libraries (GSAP and Lenis) load from public CDNs. With reduced motion turned on in a visitor's settings, or if those scripts fail to load, every page still shows everything; only the motion is skipped.

The neighborhood map (`images/map-duck-pond.svg`) was drawn from OpenStreetMap data, which requires the "© OpenStreetMap contributors" credit already shown on the map and in the footer.

## See it on your computer

```sh
cd site && python3 -m http.server 8000
```

Then open http://localhost:8000.

## Put it online (Netlify, recommended)

Netlify is free for a site this size and handles the guest list form with no extra setup.

1. Create a free account at netlify.com.
2. **Add new site → Deploy manually**, and drag this whole folder onto the page. (Or connect this GitHub repository so every push updates the site.)
3. **Forms → Enable form detection**, then redeploy. Sign-ups appear under **Forms → guest-list**.
4. **Forms → Form notifications → Add notification → Email**: add craig@gatorhavenhouse.com and jenn@gatorhavenhouse.com so every sign-up is emailed to you.
5. **Domain management → Add a domain**: enter `www.gatorhavenhouse.com` and follow the DNS steps for your domain registrar. Netlify adds the HTTPS certificate for you.

Hosting somewhere else? Make a free form at formspree.io and put its URL in `js/site.js`:

```js
const FORM_ENDPOINT = "https://formspree.io/f/your-form-id";
```

If the form can't send for any reason, it opens an email to Craig and Jenn with the visitor's details filled in, so no sign-up is lost.

## The email addresses

craig@ and jenn@gatorhavenhouse.com need email hosting on the domain before they'll receive mail. Options: Google Workspace or Microsoft 365 (full inboxes, paid), Zoho Mail (free tier), or free forwarding to existing inboxes through your domain registrar or ImprovMX. Send a test message to each address before you share the site.

## Common edits

- **Add photos:** see the instructions at the top of `photos.html`. Resize photos to about 1600 pixels wide before adding them.
- **Write the history:** see the instructions at the top of `history.html`.
- **Change dates or wording:** edit the text in `index.html` directly.
- **Logo:** the hand-lettered wordmark (`images/wordmark-*.png`) and seal (`images/seal-emblem-*.png`) come from `design-source/art/`. Icons: `favicon-32.png`, `favicon-64.png`, `apple-touch-icon.png`, `icon-512.png`.
- **Update the share image:** replace `images/og-share.jpg` (1200 by 630 pixels).
