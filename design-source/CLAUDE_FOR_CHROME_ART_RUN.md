# Claude for Chrome: Gator Haven House art run

You are generating the illustration set for the Gator Haven House website in ChatGPT (chatgpt.com), then downloading each image with the exact file name below. Work through the assets in order. The person who started you is signed in to ChatGPT already.

## Ground rules

1. **One image per message.** Paste one prompt, wait until the image finishes, then judge it against that asset's checks before moving on.
2. **Attach reference files only where the asset says to.** They are in the local folder `GatorHaven-refs` (see Setup).
3. **Retry up to 3 times** when an image fails its checks. Reply in the same chat with the specific fix (for example "Same image, but keep the roofline exactly where it is in the attached drawing"). After 3 misses, keep the best attempt, add `-review` to its file name and move on.
4. **Download** each accepted image with ChatGPT's download button (hover the image, then the download icon). Save it into the `GatorHaven-art` folder and rename it to the exact file name listed.
5. **Stop and ask the person** if you hit a sign-in page, a CAPTCHA, a usage-limit message, or any prompt to pay, upgrade or change settings. Never purchase anything or change account settings.
6. **No University of Florida marks.** If an image shows a UF logo, the "Gator head" mark, a "UF" monogram, Albert/Alberta mascots or the words "University of Florida", reject it and regenerate. Generic alligators, footballs, orange and blue are fine.
7. **No lettering unless the asset asks for it.** AI lettering often comes out misspelled; the website sets real type over the art. If stray words appear, ask for the same image "with no text anywhere".
8. Keep a running log in a note or text file `GatorHaven-art/LOG.txt`: file name, number of attempts, and anything the person should know.

## Setup (the person does this before starting you)

Create a folder `GatorHaven-refs` in Downloads with these four files from the project repository (`site/images/`):

| File | What it is |
|---|---|
| `house-elevation-1600.jpg` | The approved pen-and-ink drawing of the house |
| `exterior-today-1600.jpg` | Today's photo of the house |
| `house-early-1900s-1200.jpg` | The early sepia photo of the house, around 1900 |
| `blanding-portrait.jpg` | Painted portrait of General Albert H. Blanding |

Create an empty folder `GatorHaven-art` in Downloads for the results.

## House style (paste this into the first message of every new chat)

> For this whole conversation, match this house style unless I say otherwise: an 1890s American print look. Palette: cream paper #F4EAD0, deep navy ink #1B2A55, burnt pennant orange #D8501C, royal blue #1F3F95, stained-wood brown #6B3A1E. No text, no logos, no borders, no watermarks. Highest resolution you can produce. Reply only with the image.

---

## Part 1: The house drawings (attach the drawing)

Open a new chat. Paste the house style, then for each asset attach `house-elevation-1600.jpg`.

### 1.1 `house-blueprint.png`
> Recreate the attached drawing as an 1890s cyanotype blueprint: exactly the same lines, composition and framing, converted to crisp white linework on deep Prussian blue (#16346E) with a faint paper grain. Do not move, add or remove anything.

Checks: same framing as the attached drawing (house in the same spot and size); white lines on blue; no text.

### 1.2 `build-1-guidelines.png`
> Keeping the composition identical to the attached drawing, show only the faint construction lines an architect draws first: the ground line, the roof pitch lines, the centerline of the front gable, the porch line, and light pencil boxes where the windows and doors will go. Thin grey-blue pencil on cream paper. Nothing else: no shading, no trees, no lawn.

### 1.3 `build-2-frame.png`
> Keeping the composition identical to the attached drawing, show this house in 1899 as a bare timber frame under construction: wall studs, roof rafters, the porch posts and porch roof framing, a few sawhorses and a ladder in the yard. Pen and ink in navy on cream paper. No siding, no shingles, no people.

### 1.4 `build-3-walls.png`
> Keeping the composition identical to the attached drawing, show the house partly finished: clapboard siding and roof shingles on, fish-scale shingles going onto the front gable, porch railings and the decorative spindle frieze not yet installed, a little scaffolding at one corner. Pen and ink in navy on cream paper, same line style as the attached.

Checks for 1.2 to 1.4: put each next to the attached drawing. The roof peak, porch line and front steps must sit in the same places, so the frames line up when the website plays them in sequence. Ask for a correction if anything has shifted noticeably.

---

## Part 2: Engraved spot illustrations (one new chat for the whole set)

Paste the house style, then add:

> All images in this chat are small spot illustrations in the style of an 1890s steel engraving from a Victorian magazine: fine parallel-line shading, single navy ink color (#1B2A55) on plain cream (#F4EAD0), centered with lots of empty space around the subject, no text, no frame.

Then one message each:

| File | Prompt |
|---|---|
| `spot-gator.png` | A friendly American alligator resting at the edge of a Florida pond among lily pads and cattails. Calm and charming, never menacing. |
| `spot-rockers.png` | Two white wooden rocking chairs on a Victorian porch with a small side table holding two glasses of sweet tea. |
| `spot-magnolia.png` | A Southern magnolia branch with one open blossom and two glossy leaves. |
| `spot-football.png` | An early-1900s leather football resting against a blank felt pennant. |
| `spot-gable.png` | Close-up of a Victorian gable with fish-scale shingles and a small arched attic window. |
| `spot-liveoak.png` | A Spanish-moss-draped live oak tree. |
| `spot-key.png` | An antique brass skeleton key with a small paper tag tied on with string. The tag is blank. |
| `spot-grill.png` | A classic backyard gas grill on a brick patio beside a white picket fence, drawn as a Victorian engraving. |

Checks: all eight look like one set (same line weight and ink color), cream background, nothing menacing about the alligator.

---

## Part 3: Ephemera props (new chat)

These are decorative props for the website's "scrapbook" sections. They are illustrations, not real historical items, and the site labels them that way. Paste the house style, then:

| File | Prompt |
|---|---|
| `prop-pennant.png` | Photograph, flat from directly above on a plain cream background: a vintage wool felt college pennant in burnt orange (#D8501C) with a royal blue (#1F3F95) strip and stitching along the wide end, completely blank (no letters), soft natural light, slight wear. |
| `prop-ticket-1.png` | Photograph, flat from above on plain cream: a 1920s-style admission ticket stub on thick cream card with a perforated edge, printed border ornaments in navy and orange, the text areas completely blank. |
| `prop-ticket-2.png` | Same as before, but a taller ticket with a torn edge, printed in royal blue and orange, blank text areas. |
| `prop-program.png` | A 1920s college football game-day program cover, illustrated in an Art Deco poster style: a player in a leather helmet mid-stride holding a football, sweeping stadium lights behind him, orange and royal blue on cream. No text, no team logos, no letters on the uniform. |
| `prop-postcard-back.png` | Photograph, flat from above: the back of an antique 1905 American postcard on cream card stock, with a vertical dividing line, faint printed address lines on the right and an empty stamp box in the top right corner. Completely blank: no handwriting, no printed words. |
| `prop-stamp.png` | A vintage-style postage stamp with a perforated edge showing an engraved Victorian house with a wraparound porch, printed in a single orange-red ink. No country name, no value, no words. |
| `prop-paper.png` | A seamless, tileable texture of aged cream cotton paper (#F4EAD0) with subtle fibers and faint foxing, evenly lit, no folds or stains in the center. Square. |
| `prop-ticket-blank.png` | Photograph, flat from above on plain cream: a completely blank vintage ticket stub on thick cream card stock with a perforated edge and slightly worn corners. No printing at all. |

Checks: no words or numbers anywhere, no logos, props photographed flat (no strong perspective) so the website can tilt them itself.

---

## Part 4: Map, wordmark and seal (new chat)

Paste the house style.

### 4.1 `map-illustrated.png`
> An illustrated tourist map in the style of a 1950s hand-painted American city map: soft gouache colors on cream paper (cream, navy, burnt orange, muted greens). A small grid of tree-lined streets runs from a yellow Queen Anne Victorian house with a wraparound porch in the upper right, west to a large college football stadium on the left side. Between them, a small downtown square with a fountain and a few brick storefronts; below them, a railroad depot park with a little steam engine. Tiny illustrated trees and a dotted walking path from the house to the stadium. Wide landscape format. No text, no labels, no logos.

Checks: house upper right, stadium on the left, a dotted path between them, no words.

### 4.2 `wordmark.png`
> Hand-lettered logo reading exactly "Gator Haven House", in the style of an 1890s American sign painter: "Gator Haven" in a bold Clarendon-style slab serif, and "House" underneath in delicate Spencerian script, finished with a small curling flourish that ends in an alligator's tail. Deep navy (#1B2A55) on plain cream. Flat, clean, no texture, no shadow. Spell every letter correctly.

Checks: the spelling is exactly "Gator Haven House". Regenerate on any spelling error. This is the one asset where text is allowed.

### 4.3 `seal-center.png`
> A small round emblem for the center of a badge: a Victorian house gable with fish-scale shingles and an arched attic window, with an alligator's eyes and snout peeking just above a wavy waterline across the bottom of the circle. Two colors only: cream (#FFFDF6) linework on navy (#1B2A55). Bold and simple enough to read at 60 pixels wide. No text.

---

## Part 5: History scrapbook (new chat, attach files as noted)

### 5.1 `postcard-1900-tinted.png` (attach `house-early-1900s-1200.jpg`)
> Turn the attached early photograph of this house into a 1905-style hand-tinted postcard: soft, slightly uneven watercolor tints over the original photo (pale butter-yellow house, green trees, blue sky), with the white border of an antique postcard. Keep every detail of the house and the people exactly as in the original. No text.

### 5.2 `blanding-engraved.png` (attach `blanding-portrait.jpg`)
> Redraw the attached painted portrait as a 1930s newspaper-style steel engraving portrait: fine line shading in navy ink on cream, same pose, same uniform and cap, same likeness. Oval vignette that fades to cream at the edges. No text.

Checks for 5.2: it must still clearly look like the same man. If the face drifts, reply "keep his face exactly as in the attached portrait".

---

## When you're done

1. Make sure `GatorHaven-art` holds every file name above (or its `-review` version) and `LOG.txt`.
2. Tell the person: "The art set is in Downloads/GatorHaven-art. Send the folder to Claude Code (drag the files into the chat, or commit them to `design-source/art/` in the repository)."
3. List any assets marked `-review`, with the reason from the log.
