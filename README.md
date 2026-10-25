# Gator Haven House

The website for www.gatorhavenhouse.com: an 1899 Victorian vacation rental in Gainesville's Historic Duck Pond District. Its job is to collect a guest list before the house opens at the end of 2026.

- `PLAN.md`: the design and content plan.
- `CHATGPT_PROMPTS.md`: prompts for the logo, renderings, social graphics and history research.
- `design-source/CLAUDE_FOR_CHROME_ART_RUN.md`: a run file for Claude for Chrome to generate the full illustration set in ChatGPT.
- `design-source/direction/`: the round 3 direction board and prototype.

## Pages

| File | What it is |
|---|---|
| `site/index.html` | Home: announcement, the house facts, location, guest list form with date calendar, drawing-to-house build, game day, history teaser |
| `site/photos.html` | Outside, inside, the transformation, and today/concept sliders of the finished rooms |
| `site/guide.html` | Visitor's guide: coffee, food, drinks, things to do, groceries, with times from the house |
| `site/history.html` | History of the home (written to be edited) |
| `site/404.html` | Shown for any address that doesn't exist (Cloudflare Pages and Netlify use it automatically) |
| `site/thanks.html` | Shown after the form is sent if a visitor's browser has JavaScript off |

The public site lives in `site/` (HTML, `css/site.css`, `js/site.js`, `images/`). The host publishes only that folder, so these notes and the prompts are never public. No build step.

The animation libraries (GSAP and Lenis) load from public CDNs. With reduced motion turned on in a visitor's settings, or if those scripts fail to load, every page still shows everything; only the motion is skipped.

The neighborhood map (`images/map-duck-pond.svg`) was drawn from OpenStreetMap data, which requires the "© OpenStreetMap contributors" credit already shown on the map and in the footer.

## See it on your computer

```sh
cd site && python3 -m http.server 8000
```

Then open http://localhost:8000.

## Put it online (Cloudflare Pages, recommended)

The domain is registered at Cloudflare, so Pages needs no DNS changes. It's free with no bandwidth limit.

1. Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, and pick this repository. (Choose Pages, not a Worker.)
2. Production branch: the branch with the finished site. Build command: none. Build output directory: `site`.
3. After the first deploy, **Custom domains → Set up a custom domain**: add `www.gatorhavenhouse.com`, then `gatorhavenhouse.com`. Cloudflare adds the DNS records and HTTPS.
4. **Rules → Redirect Rules → Create rule → "Redirect from root to WWW"** template, so the bare domain goes to www. (`site/_redirects` can't redirect a whole domain.)
5. In **Speed → Optimization**, leave **Rocket Loader** off; it reorders scripts and can break the animations.

`site/_headers` carries the security headers and image caching. Pages serves `/photos` for `photos.html`; the canonical links and sitemap use those clean addresses.

### The guest list form

Pages doesn't collect form posts, so sign-ups go to Formspree (free: 50 a month). The form is `https://formspree.io/f/xeaaajnn`, set as `FORM_ENDPOINT` in `js/site.js` and as the `action` of the `<form>` in `index.html` (for visitors with JavaScript off). Its hidden `_subject` field sets the email subject, and `_gotcha` is Formspree's spam trap. If the form can't send for any reason, it shows Craig's and Jenn's addresses with a pre-filled email and a copy button, so no sign-up is lost.

### Hosting on Netlify instead

`netlify.toml` holds the same settings. Formspree keeps working there. To use Netlify Forms instead, set `FORM_ENDPOINT = "netlify"`, add `data-netlify="true"` and a hidden `form-name` field to the form, enable **Forms → form detection**, and add craig@ and jenn@ under **Forms → Form notifications**.

## The email addresses

craig@ and jenn@gatorhavenhouse.com need email hosting on the domain before they'll receive mail. With the domain at Cloudflare, the simplest is **Email → Email Routing** (free): forward craig@ and jenn@ to existing inboxes. For full inboxes that can also send as those addresses, use Google Workspace, Microsoft 365 or Zoho Mail. Send a test message to each address before you share the site.

## Common edits

- **Add photos:** see the instructions at the top of `photos.html`. Resize photos to about 1600 pixels wide before adding them.
- **Write the history:** see the instructions at the top of `history.html`.
- **Change dates or wording:** edit the text in `index.html` directly.
- **Logo:** the hand-lettered wordmark (`images/wordmark-*.png`) and seal (`images/seal-emblem-*.png`) come from `design-source/art/`. Icons: `favicon-32.png`, `favicon-64.png`, `apple-touch-icon.png`, `icon-512.png`.
- **Update the share image:** replace `images/og-share.jpg` (1200 by 630 pixels).
