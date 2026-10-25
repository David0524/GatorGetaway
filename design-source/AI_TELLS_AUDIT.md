# AI-tells audit: Gator Haven House

Run with the `ai-tells-site-audit` skill (catalog snapshot October 2026).

**Overall read.** The site has a real point of view: an 1899 souvenir-program look built from the house's own material (the clapboard yellow, the cabinet photo, the architect's drawing, Blanding's portrait) and Gator game-day props. It does not read as an untouched AI template. What gave it away before this pass was stacking and uniformity rather than any single element. There was a tracked-out uppercase label above almost every heading, an arrow on almost every button, and a tilted card with a handwritten caption everywhere. Most elements animated in on scroll, with bouncy easing, and a ticker scrolled on its own. Those same habits made the pages feel crowded.

**What I inspected.** Home, Photos and History in Chromium (1440 px desktop, 390 px phone) and in WebKit on an emulated iPhone 14. Also the full source and the skill's scanner.

**Strong-pattern count.** Before this pass: 5 of 16 (High).
- uppercase eyebrow labels
- fade-up animation on most sections
- stat row (5 min / 7 min / 10 min stamps)
- identical feature cards with art on top (the four occasion cards)
- a single accent word in the headline ("big")

After: 1–2 of 16 (Low to Medium).
- **"big" in the headline:** it stays. It comes straight from Craig and Jenn's own announcement ("Something BIG is coming").
- **Cream and serif with an orange accent:** borderline. The ground is the house's actual clapboard color and the orange is Gator orange, not clay. That's a brand reason, but it's worth knowing the combination sits near the 2025 "beige editorial" cluster.

The 16-pattern list is adapted from Krebs's study rather than identical to it. The scanner still counts 4 machine patterns, but 3 are false positives:
- **Gradient text:** the photo-in-letters postcard, a real 1940s technique.
- **Glows:** the fish-scale and ticket-mask radial gradients.
- **Scroll reveal:** the observer that swaps history pictures and shows the phone button.

## Fix first: quality defects

None found. Contrast passes (axe: 0 violations on every page). No content is stuck invisible without JavaScript (a 1.2 s failsafe shows the hero). The form posts to Netlify and falls back to email links. There are no dead links, no console errors and no sideways scrolling at six widths.

## The five changes that mattered most (all made)

1. **Removed the eyebrow labels.** There were 13 on the home page; the only 5 left are the drafting-table dates ("Sheet 1, 1899", "Raising the frame"…), where they carry information.
2. **Cut motion back to the moments that mean something.** The drawing-to-house build, the scrapbook pile, the map route and the slider sweep stay. Gone:
   - heading line reveals and the card drops (removed everywhere)
   - the ticker
   - the always-spinning seal (it now turns on hover)
   - the pulsing map dot
   - elastic and bounce easing
3. **Replaced the four identical occasion cards with a short list** inside the early-guest section, under a heading that states a fact: "Graduation weekends will go first".
4. **Cut sections that only repeated other sections.** Home went from 12 sections to 9 and about 1,150 words to 870:
   - the 5 / 7 / 10 minute stamps (the times are now in the house facts and the location list)
   - the home before/after slider (it lives on the Photos page, linked from the house facts)
   - the "Your ticket's waiting" closing band
   - the History page's architecture cards (the drawing's callouts already name those details)
5. **Rewrote the headings that failed the swap test:**

| Before | After |
|---|---|
| Room for the whole crew | The house at 306 NE Third |
| Made for the weekends that matter / Stay early, pay less | Graduation weekends will go first |
| Walk to dinner, drive to the game | Two miles from the stadium |
| The same porch, a new century | Built by a mayor, home to a general |
| Get your ticket in early / Punch my ticket | Join the guest list (heading and button) |

## Smaller changes

- **Buttons:** arrows removed from every button. There are fewer calls to action on the home page (10 → 6), and the phone's floating "Join the guest list" button stays.
- **Tilts:** only the hero photo, the history card and the scrapbook pile sit at an angle now. Gallery photos, game-day cards, the host card and the map are straight.
- **Separators:** the "✦" separators on the seal became plain bullets, and the middle-dot meta strings were rewritten as plain text.
- **Guest list form:** trimmed to name, email, occasion, dates and class year. Guest count, phone, notes and the early-rates checkbox are gone (everyone on the list gets the rates).

## What's already working

- The hero headline is the owners' own words.
- The drawing-to-house build, made from the house's real elevation.
- Real facts in the copy: Judge Davis, General Blanding, 1906, OpenStreetMap travel times, and May 2027 graduation already asked for.
- Real photos of the house. Concept renderings and illustrations are labeled as such, and there are no invented reviews or stats.

## What I need from the owners

- Real interior photos, as they come, to replace the concept rendering over time.
- An exact opening date.
- A short line in their own voice for the host card, such as why they bought the house.
