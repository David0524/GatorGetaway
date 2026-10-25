# ChatGPT prompts for Gator Haven House

## Round 3 art: "The 1899 Program"

These make the new direction look custom instead of templated. For any prompt that says "attached", upload the file named. Ask for the **largest size** ChatGPT offers and **PNG**. When you get one you like, reply "same image, higher detail, no changes" once to sharpen it.

Rules for all of them: no University of Florida logos or marks, no real people's faces except Blanding's portrait, and no words inside the image unless the prompt asks for them (AI lettering often comes out misspelled; the site sets real type over the art).

### 1. The architect's elevation (the drawing-to-house moment): most important
Attach `site/images/exterior-today-1600.jpg`.

> Redraw the attached photograph as an 1890s architect's presentation drawing of this exact house. Keep the camera angle, framing, proportions and every architectural detail exactly where they are in the photo, so the drawing lines up perfectly when laid over the original: the steep front gable with fish-scale shingles and the small arched attic window, the second-floor window, the wraparound porch with turned posts, the spindle frieze under the porch roof, the gabled entry over the front steps, the porch railings, the brick lattice foundation, the front steps and the walk. Style: fine pen-and-ink linework in deep navy ink (#1B2A55) on warm cream drafting paper (#F4EAD0), crisp ruled lines for the architecture, light cross-hatching for shadows under the porch roof and eaves. Trees, lawn and fence drawn loosely and lightly so they fade toward the edges, the way an architect sketches landscaping. No text, no labels, no border, no people, no cars. Same aspect ratio as the photo.

Then ask for a blueprint version of the same drawing:

> Same drawing, exactly the same lines and composition, as an 1890s cyanotype blueprint: white lines on deep Prussian blue (#16346E), with faint paper texture. No text.

Save as `house-elevation.png` and `house-blueprint.png`. I'll replace the photo-traced stand-in in the prototype.

### 2. The house being built (optional upgrade to the drawing moment)
Attach the elevation drawing from prompt 1. Ask for each frame separately, always with "keep the composition identical to the attached drawing":

> Frame 1: only the faint pencil construction lines and centerlines of this exact house, as an architect starts a drawing: light grey guide lines, the ground line and the roofline. Nothing else.

> Frame 2: the same house as a bare timber frame under construction in 1899: studs, rafters and porch posts in pen and ink, no siding yet. Identical composition.

> Frame 3: the same house with clapboard, roof shingles and fish-scale gable going on, porch railings not yet added. Identical composition.

With four frames that line up, the site can "build" the house as you scroll: guide lines, then the frame, then the walls, then the finished drawing, then the real photo.

### 3. Engraved spot illustrations (a matched set)
Ask in one conversation so they match. Start with:

> Create a set of small spot illustrations in the style of an 1890s steel engraving from a Victorian magazine: fine parallel-line shading, single deep navy ink color (#1B2A55) on a plain cream background (#F4EAD0), no text, no border, each centered with generous empty space around it. First: a friendly American alligator resting at the edge of a Florida pond among lily pads and cattails, calm and charming, not menacing.

Then, one at a time in the same chat:

> Same style: a pair of white wooden rocking chairs on a Victorian porch with a small table and two glasses of sweet tea.

> Same style: a Southern magnolia branch with one open blossom.

> Same style: a vintage leather football from the early 1900s resting against a felt pennant (the pennant blank, no letters).

> Same style: a close-up of a Victorian gable with fish-scale shingles and a small arched attic window.

> Same style: a Spanish-moss-draped live oak.

### 4. Illustrated neighborhood map (replaces the plain map)
> Create an illustrated tourist map in the style of a 1950s hand-painted American city map: soft gouache colors on cream paper, cream (#F4EAD0), navy (#1B2A55), burnt orange (#D8501C) and muted greens. Show a small grid of tree-lined streets running from a Victorian house in the upper right (a yellow Queen Anne with a wraparound porch) west to a large college football stadium on the left, with a small downtown square with a fountain between them and a railroad depot park below. Little illustrated trees, a dotted walking path from the house to the stadium. No text, no labels, no logos (I'll add the labels myself).

### 5. Hand-lettered wordmark
> Hand-lettered logo text "Gator Haven House" in the style of an 1890s American sign painter: a bold Clarendon-style slab serif for "Gator Haven" with a delicate Spencerian script "House" underneath, finished with a small curling flourish that ends in an alligator's tail. Deep navy (#1B2A55) on plain cream. Check that every letter is spelled correctly. Flat, clean vector look, no texture, no shadow.

### 6. Center of the spinning seal
> A small round emblem for the center of a badge: a Victorian house gable with fish-scale shingles and an arched attic window, with an alligator's eyes and snout peeking just above a wavy waterline at the bottom of the circle. Two colors only, cream (#FFFDF6) linework on navy (#1B2A55). Simple enough to read at 60 pixels. No text.

### 7. Paper and ephemera textures
> A seamless, tileable texture of aged cream cotton paper (#F4EAD0) with very subtle fibers and faint foxing, evenly lit, no folds, no stains in the center. 2048 by 2048.

> A vintage admission ticket stub on thick cream card stock with a perforated edge, photographed flat from above on a plain background, completely blank (no printing), slightly worn corners.

### 8. A hand-tinted postcard of the house (for the History scrapbook)
Attach `site/images/house-early-1900s-1200.jpg`.

> Turn the attached early photograph of this house into a 1905-style hand-tinted postcard: soft, slightly uneven watercolor tints over the original photo (pale butter-yellow house, green trees, blue sky), with the white border of an antique postcard. Keep every detail of the house and the people exactly as in the original. No text.

Label this one "colorized" on the site.

### 9. The 98-inch TV (two images)
Upload both to the same Drive folder as before and Claude will place them.

**`spot-tv.png`**: matches the engraved set (game-day card, occasion cards). Paste in the chat that made the other spot illustrations, or start with the house style line from the Claude for Chrome run file.

> Same engraving style as the set: a Victorian parlor with tall windows, crown molding and dark wood trim, and a giant modern flat-screen TV mounted over the fireplace showing a college football game from a high stadium angle: a packed crowd, the field and players, no team logos, no letters or numbers on the uniforms. A deep sectional sofa facing it with a football-shaped throw pillow and a bowl of popcorn on the ottoman. Single navy ink (#1B2A55) on plain cream (#F4EAD0), fine parallel-line shading, no text, no frame, lots of empty space around the scene.

**`render-living-room.png`**: a photoreal concept rendering for the Photos page "When it's finished". If you have a photo of the living room, attach it and start with "Using the attached photo of this exact room, keeping the windows, trim and floors..."

> Photorealistic interior design rendering of the living room of an 1899 Queen Anne Victorian house in Florida, styled for game day: a 98-inch flat-screen TV mounted on the main wall showing a college football game (generic teams, no logos, no readable text), a large deep sectional sofa in warm oatmeal fabric facing it, orange and blue throw pillows, a leather ottoman with snack boards, original dark-stained wood trim, tall windows with plantation shutters, wide-plank wood floors, warm late-afternoon light. Wide angle from the room's entrance, high-end vacation rental listing photography. No people, no text, no University of Florida branding.

---


Copy any prompt below into ChatGPT (image generation is on by default in GPT-4o and later). When a prompt says "attached", upload the photo first.

Two rules for everything:
- **No University of Florida trademarks.** No Gator head logo, no "UF" monogram, no Albert or Alberta, no "University of Florida" wordmark. The word "Gator" and orange and blue are fine. Using UF's marks on a commercial rental can draw a licensing letter.
- **Label renderings as concepts** on the site. The Photos page already has a "Concept" tag for this.

---
### 10. Furnished renders of the real rooms, and the woodwork as vectors

The reference images are in `design-source/chatgpt-refs/`, numbered to match. They're lightly color-corrected and cropped to 2:3, the shape ChatGPT returns, so the renders line up with the real photos in a drag slider.

**Renders 1 to 3, and 6.** Open one new chat and paste this first, with no image:

> In this chat I'll attach real photos of rooms in our 1899 Victorian house and ask you to furnish them. Every image you make is an edit of the attached photo, not a new picture. Keep the exact camera position, lens and framing, and keep every wall, window, door, trim board, baseboard, fretwork piece, mantel, floor board and light fixture in the same place and the same size, so the two images line up when one is laid over the other. Only add furniture and decor, and fix the specific things I name. Portrait, 1024 by 1536. Photorealistic, like high-end vacation rental listing photography, soft natural daylight. No people, no text, no logos, no University of Florida branding. Reply only with the image.

**1. `render-living-room-real.png`** (attach `1-living-room.jpg`)
> Furnish the living room seen through the carved fretwork arch. A deep sofa in oatmeal linen facing the fireplace, two cognac leather armchairs, a round wood coffee table, a large vintage-style rug in muted navy and rust, a brass floor lamp, a tall potted fiddle-leaf fig in the corner. Keep the mantel, its oval mirror and the chandelier. Remove the extension cord on the floor and make the worn threshold in the doorway look refinished.

**2. `render-primary-bedroom.png`** (attach `2-primary-bedroom.jpg`)
> Furnish this upstairs room as the primary bedroom. A king bed with a low upholstered headboard in soft cream, white bedding with a burnt-orange and navy quilt folded across the foot, two nightstands with brass lamps, a woven rug under the bed, an upholstered bench at the foot, light linen curtains on the three windows. Keep the ceiling fan.

**3. `render-kitchen.png`** (attach `3-kitchen.jpg`)
> Show this room finished as a new kitchen. Along the back wall: shaker cabinets painted deep navy, a white quartz counter, a large single-bowl sink centered where the plumbing is, cream subway tile up to the dark-stained picture rail, brass hardware, and open wood shelves. Replace the laminate floor with wide-plank wood that matches the original floor in the foreground, so the whole floor is one wood. Keep the painted wood mantel on the left wall, the window, the picture rail and all the trim. Replace the track lights with two brass schoolhouse pendants.

If Craig and Jenn have picked a cabinet color or counter, swap it in.

**6. `render-entry-hall.png`** (attach `6-entry-hall.jpg`)
> Show this entry hall finished. Repair the torn drywall above the doorway so it is smooth and painted to match the wall, keeping all of the carved fretwork. Remove the broom, dustpan, step ladder, water bottles, cord and the loose screen door. Add a long runner rug, a narrow wood console under the window with a lamp and a bowl for keys, a bench with brass coat hooks, and a potted palm. Keep the staircase, the window, the light fixture and the front doors.

**Check each render** before you save it: open the original and the render in two tabs and flick between them. If a door, window or the arch has moved, reply "Keep everything except the furniture exactly where it is in the original photo" and try again (up to 3 times).

**Vectors 4 and 5: the house's own woodwork.** These become the site's ornaments (section dividers, photo corners, the frame around the house facts), so they need to be flat and clean enough to trace into SVG. Open a second new chat.

**4. `ornament-fretwork-arch.png`** (attach `4-fretwork-arch.jpg`)
> The attached photo shows carved wooden fretwork over a doorway in our 1899 house: a sunburst of spindles at the center, scrolling C and S curves, and a drop-pendant corner bracket running down the side. Redraw it as a flat vector-style ornament for a doorway header. Straight-on, no perspective. Make it complete and symmetrical: mirror the right side to make the left. Keep the shapes faithful to the photo. One solid color, navy #1B2A55, on a pure white background. No shading, no wood grain, no wall, no door frame, no text. Crisp, smooth edges with clean open gaps between the pieces, like a laser-cut stencil. Landscape 1536 by 1024, ornament spanning the full width with a small margin.

Follow-up in the same chat:
> Now only the corner bracket, the piece that runs down the side with the drop pendant, on its own. Same style, navy on pure white, square 1024 by 1024.

**5. `ornament-spindle-frieze.png`** (attach `5-spindle-frieze.jpg`)
> The attached photo shows a spindle frieze over our staircase: a row of turned spindles between two rails, a sawtooth trim along the bottom, and a round wheel bracket at the end. Redraw it as a flat vector-style horizontal border, straight-on with no perspective: one long run of spindles with the sawtooth below and a wheel bracket at each end. One solid color, navy #1B2A55, on a pure white background. No shading, no wood grain, no text. Crisp, smooth edges like a laser-cut stencil. Landscape 1536 by 1024.

Follow-up:
> Now only the wheel bracket on its own, same style, square 1024 by 1024.

Drop everything in the Google Drive folder with these file names. I'll build the sliders and trace the ornaments into SVG.

### 11. The game-day living room, from the real room

Replaces the old game-day rendering, which showed a room that isn't in the house.

**`render-living-room-gameday.png`** (attach `7-living-room-furnished.jpg`, the furnished render that already lines up with the real photo). New chat:
> This is a furnished rendering of the living room in our 1899 Victorian house, seen through a carved fretwork arch. Edit this exact image, don't make a new one. Add a 98-inch flat-screen TV mounted over the fireplace, in place of the oval mirror, showing a college football game from a high stadium angle: a packed crowd and the field, no team logos, no readable text or numbers. Turn the sofa and the two leather armchairs to face the TV, and put a bowl of popcorn and a few drinks on the coffee table. Keep the fretwork arch, the door frame, the doorways, the windows, the chandelier, the rug, the floors and everything outside the room exactly where they are, at the same size. Portrait, 1024 by 1536, photorealistic, warm late-afternoon light. No people, no text, no University of Florida branding. Reply only with the image.

If the TV is going on a different wall, replace "over the fireplace, in place of the oval mirror" with that wall.

**`spot-tv.png`, the engraving for the game-day row** (attach `1-living-room.jpg`). Paste this in the chat that made the other engravings, or in a new chat:
> Redraw the attached photo as a small 1890s steel engraving: the same view through the carved fretwork arch into the living room, now furnished with a deep sofa and two armchairs facing a huge flat-screen TV over the fireplace that shows a football game. Fine parallel-line shading, single navy ink (#1B2A55) on plain cream (#F4EAD0), centered with empty space around it, no text, no frame, no logos.

---

## 1. Logo

The site colors, so the logo matches:
- Gator navy `#13224A`
- Gator orange `#E0531F`
- Stained pine brown `#6E3A1F`
- Porch white `#FAFAF7`
- The site's headline typeface is **Besley**, a Clarendon-style slab serif from the 1800s.

Paste this style block at the end of whichever concept prompt you use:

> Style: a flat vector logo, two or three solid colors only (navy #13224A, orange #E0531F, optional brown #6E3A1F) on a plain off-white #FAFAF7 background. No gradients, no shadows, no 3D, no photo textures. Clean, confident lines that still read clearly at 32 pixels wide. Victorian in spirit but modern and simple, not clip art and not cartoonish. Do not use any University of Florida logos or trademarks. Show the symbol on its own, then the symbol with the wordmark "Gator Haven House" set in a Clarendon-style slab serif similar to Besley.

### Concept A: The gable gator (recommended)
> Design a logo symbol based on the front gable of an 1899 Queen Anne Victorian house: a steep triangular gable filled with rows of fish-scale shingles, with a small arched attic window near the peak. Hide an alligator in it. The fish-scale shingles should double as the alligator's scales, and the negative space along one side of the gable should form an alligator's head in profile, snout pointing right, with the attic window as its eye. The house should be the first thing people see; the gator is the second look, the thing people point out to each other.

### Concept B: Eyes above the waterline
> Design a logo symbol of a short run of Victorian porch railing: a top rail, a bottom rail, and five turned balusters. On the top rail, two small bumps and a pair of nostrils peek up, so the railing reads like an alligator lying in still water with only its eyes and snout above the surface, the way you'd spot one in a Gainesville pond. Keep it subtle and symmetrical, and make the railing the main shape.

### Concept C: The key with teeth
> Design a logo symbol of an antique Victorian skeleton key, laid horizontally. The key's bow (the loop you hold) is the outline of a house with a steep gable roof and a small arched attic window. The key's bit (the end that goes in the lock) has notches cut into it that form a neat row of alligator teeth. The idea is "the key to your home away from home" with a gator bite at the end.

### Concept D: The 1899 monogram
> Design a typographic logo of the numerals "1899" in a heavy Clarendon-style slab serif. Turn the round counters (the holes) of the two 9s into a pair of alligator eyes, and run a single thin horizontal line just below them like a waterline, so the numerals read as a gator peeking out of the water. Subtle enough that the numbers read first.

### Concept E: The gingerbread bracket
> Design a logo symbol based on a Victorian porch corner bracket, the decorative carved "gingerbread" piece where a porch post meets the beam. Its scrollwork should curl into the shape of an alligator's tail, and a small cut-out circle in the bracket becomes the alligator's eye. Elegant and restrained, like something cut from wood with a scroll saw.

### Concept F: The haven
> Design a logo symbol of a simple house outline with a steep Victorian gable and a small arched attic window, with an alligator curled protectively around its base so its body forms a half-circle cradle under the house and its tail wraps up one side. The gator should feel calm and watchful, a guardian, not a threat. The house is the hero; the gator is the "haven" around it.

### Follow-up prompts once you pick one
> Simplify this logo for use as a favicon and phone app icon: the symbol only, centered on a navy #13224A rounded square, in off-white and orange. It must read at 32 by 32 pixels.

> Give me this logo in four versions: full color on off-white, all navy, all off-white on navy, and a one-color version for embroidery or a branded doormat.

> Recreate this logo as clean SVG code with simple paths, using only the colors #13224A, #E0531F and #6E3A1F.

ChatGPT makes images as PNGs. For the website, a clean SVG is best: ask for SVG code (last prompt above), or run the PNG through a vectorizer such as vectorizer.ai, or have a designer trace it. Send the final file over and it replaces the placeholder mark in the site header and `favicon.svg`.

---

## 2. Renderings of the finished rooms

For each room, take a photo from the doorway in daylight, then use this prompt with the photo attached. Fill in the brackets.

> Attached is a photo of the [living room / primary bedroom / kitchen / bedroom 2] in our 1899 Victorian house in Gainesville, Florida. Create a photorealistic interior design concept of this exact room after renovation. Keep the same camera angle, the same walls, windows, doors and ceiling height, the original wood floors and the dark-stained wood trim and baseboards. Style: warm, comfortable Southern Victorian with modern comforts. [Describe what's going in the room, e.g. "a queen bed with a tall upholstered headboard, two nightstands with brass lamps, a dresser, crisp white bedding."] Soft natural light. No people. No text, no logos, no University of Florida branding. It should look like a real photograph from a high-end vacation rental listing.

Room-specific lines to drop into the brackets:

- **Living room, game day:** "A 98-inch flat-screen TV mounted on the main wall showing a generic college football game with no team logos, a large deep sectional sofa facing it, an ottoman with snack trays, and orange and blue throw pillows."
- **Front porch:** use a photo of the porch. "Four white rocking chairs and a porch swing, ferns hanging between the turned posts, a small side table with glasses of sweet tea, late afternoon light."
- **Backyard:** use a photo of the yard. "The white picket fence around the yard, a stainless steel gas grill on a paver patio, an outdoor dining table for eight, string lights overhead, a lawn with cornhole boards."
- **Bathroom:** "A walk-in shower with white subway tile, a dark wood vanity with a marble top, brass fixtures, hex tile floor."

To keep every rendering matching, add this line to each one:

> Match the finishes of the attached half-bath concept: cream tile, dark wood, antique brass hardware.

(Attach `images/alcove-after-concept-1086.jpg` as the second image.)

---

## 3. The historic photograph

**Restoration (safe for the History page):**
> Attached is an early photograph of our house, probably from around 1900. Restore it: remove scratches, dust, creases and stains, and even out the fading, while keeping it a sepia photograph. Do not add, remove or change anything in the scene. Keep every person, the house, the tree and the fence exactly as they are. Output at the highest resolution you can.

**Colorized version (label it "Colorized" on the site):**
> Colorize the attached restored photograph of an 1899 Victorian house in Gainesville, Florida, with historically believable colors for the period. Keep every detail exactly as in the original. Subtle, natural color, not oversaturated.

---

## 4. Social media graphics

**Announcement post (Instagram and Facebook, 1080 by 1350):**
> Attached is a photo of our 1899 Victorian rental house in Gainesville, Florida. Create a vertical social media announcement, 1080 by 1350 pixels, using the photo as the main image in the top two thirds. Below it, on an off-white #FAFAF7 panel, set the headline "Something big is coming to Gainesville." in a heavy Clarendon-style slab serif in navy #13224A, then the line "4 bedrooms · 4½ baths · Rent-ready end of 2026" and "gatorhavenhouse.com" in a clean sans serif. Add a thin orange #E0531F rule. Simple and elegant, real estate listing quality, no clip art, no University of Florida logos.

**Link preview image (1200 by 630, for when the website is shared in texts and Facebook):**
> Using the attached house photo, create a 1200 by 630 pixel website preview image. The photo fills the frame. Add a navy #13224A band along the bottom third with "Gator Haven House" in a heavy Clarendon-style slab serif in off-white, and "A historic home for rent in Gainesville's Duck Pond" underneath in a smaller sans serif. Keep the house fully visible above the band.

Save it as `images/og-share.jpg` to replace the current one.

**Progress update posts:**
> Create a before and after social post, 1080 by 1080 pixels, with the two attached photos side by side, labeled "Before" and "Now" in small navy pill labels. Add "The Gator Haven House transformation" across the bottom in a Clarendon-style slab serif. Clean, no clutter.

---

## 5. Researching and writing the History page

Use this as a research checklist, then have ChatGPT help you write it up.

> I own an 1899 Victorian house at [street address] in the Duck Pond neighborhood of Gainesville, Florida (the Northeast Gainesville Residential District on the National Register of Historic Places). Give me a step-by-step plan for researching who built it and who lived in it. Include the Alachua County Property Appraiser and Clerk of Court deed records, the Sanborn fire insurance maps for Gainesville in the University of Florida Digital Collections, US census records, Gainesville city directories, the Matheson History Museum, the City of Gainesville historic preservation office, and the National Register nomination for the district. For each one, tell me what I'm likely to find and how to search it.

Then, once you have notes:

> Here are my research notes about our 1899 house in Gainesville's Duck Pond: [paste notes]. Write a warm, readable "History of the home" section for our vacation rental website, about 400 words, in our voice as the owners, Craig and Jenn. Use only facts from my notes and do not invent names, dates or events. Where my notes are uncertain, say "we believe" or "records suggest". Short paragraphs, plain language, no clichés like "nestled" or "steeped in history".

Paste the result into `history.html`. The editing instructions are at the top of that file.
