# ChatGPT prompts for 1899 Gator Getaway

Copy any prompt below into ChatGPT (image generation is on by default in GPT-4o and later). When a prompt says "attached", upload the photo first.

Two rules for everything:
- **No University of Florida trademarks.** No Gator head logo, no "UF" monogram, no Albert or Alberta, no "University of Florida" wordmark. The word "Gator" and orange and blue are fine. Using UF's marks on a commercial rental can draw a licensing letter.
- **Label renderings as concepts** on the site. The Photos page already has a "Concept" tag for this.

---

## 1. Logo

The site colors, so the logo matches:
- Gator navy `#13224A`
- Gator orange `#E0531F`
- Stained pine brown `#6E3A1F`
- Porch white `#FAFAF7`
- The site's headline typeface is **Besley**, a Clarendon-style slab serif from the 1800s.

Paste this style block at the end of whichever concept prompt you use:

> Style: a flat vector logo, two or three solid colors only (navy #13224A, orange #E0531F, optional brown #6E3A1F) on a plain off-white #FAFAF7 background. No gradients, no shadows, no 3D, no photo textures. Clean, confident lines that still read clearly at 32 pixels wide. Victorian in spirit but modern and simple, not clip art and not cartoonish. Do not use any University of Florida logos or trademarks. Show the symbol on its own, then the symbol with the wordmark "1899 Gator Getaway" set in a Clarendon-style slab serif similar to Besley.

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
> Attached is a photo of our 1899 Victorian rental house in Gainesville, Florida. Create a vertical social media announcement, 1080 by 1350 pixels, using the photo as the main image in the top two thirds. Below it, on an off-white #FAFAF7 panel, set the headline "Something big is coming to Gainesville." in a heavy Clarendon-style slab serif in navy #13224A, then the line "4 bedrooms · 4½ baths · Rent-ready end of 2026" and "1899gatorgetaway.com" in a clean sans serif. Add a thin orange #E0531F rule. Simple and elegant, real estate listing quality, no clip art, no University of Florida logos.

**Link preview image (1200 by 630, for when the website is shared in texts and Facebook):**
> Using the attached house photo, create a 1200 by 630 pixel website preview image. The photo fills the frame. Add a navy #13224A band along the bottom third with "1899 Gator Getaway" in a heavy Clarendon-style slab serif in off-white, and "A historic home for rent in Gainesville's Duck Pond" underneath in a smaller sans serif. Keep the house fully visible above the band.

Save it as `images/og-share.jpg` to replace the current one.

**Progress update posts:**
> Create a before and after social post, 1080 by 1080 pixels, with the two attached photos side by side, labeled "Before" and "Now" in small navy pill labels. Add "The 1899 Gator Getaway transformation" across the bottom in a Clarendon-style slab serif. Clean, no clutter.

---

## 5. Researching and writing the History page

Use this as a research checklist, then have ChatGPT help you write it up.

> I own an 1899 Victorian house at [street address] in the Duck Pond neighborhood of Gainesville, Florida (the Northeast Gainesville Residential District on the National Register of Historic Places). Give me a step-by-step plan for researching who built it and who lived in it. Include the Alachua County Property Appraiser and Clerk of Court deed records, the Sanborn fire insurance maps for Gainesville in the University of Florida Digital Collections, US census records, Gainesville city directories, the Matheson History Museum, the City of Gainesville historic preservation office, and the National Register nomination for the district. For each one, tell me what I'm likely to find and how to search it.

Then, once you have notes:

> Here are my research notes about our 1899 house in Gainesville's Duck Pond: [paste notes]. Write a warm, readable "History of the home" section for our vacation rental website, about 400 words, in our voice as the owners, Craig and Jenn. Use only facts from my notes and do not invent names, dates or events. Where my notes are uncertain, say "we believe" or "records suggest". Short paragraphs, plain language, no clichés like "nestled" or "steeped in history".

Paste the result into `history.html`. The editing instructions are at the top of that file.
