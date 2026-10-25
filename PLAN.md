# Gator Haven House — Website Plan

## 1. The job of the site

One job: **get people on the guest list.** The house won't take bookings until the end of 2026, so the site's purpose is to make people want the house, trust the owners, and leave an email address with their dates.

Secondary jobs:
- Show the house as it is today, the work in progress, and renderings of the finished rooms.
- Give Craig and Jenn a History page they can write and keep adding to.
- Give them a simple place to add progress photos as the renovation moves along.

## 2. Who's renting, and what they need to feel

| Guest | Why they come | What they worry about | What the site says to them |
|---|---|---|---|
| Parents of UF students (40–60, the main audience) | Move-in, Family Weekend, game days, graduation | Hotels sell out and triple in price; is this place real, clean, safe? | Real owners with names and emails. 4 bedrooms and 4½ baths so the whole family fits. Fenced yard and on-site parking. |
| Graduating families | One weekend in May or December, often with grandparents | Getting a place at all | "A family has already asked for May 2027 graduation." Join the list to hear about dates first. |
| Alumni and game-day groups | Football weekends | Space to gather, somewhere to watch the game | 98-inch TV, gas grill, porch, fenced backyard. |
| Return guests ("all four years") | Visits across a student's time at UF | Re-booking every time | Tell us your Gator's class year and we'll plan around it. |

Psychology the design leans on, in order of weight:
1. **Trust.** Real names (Craig and Jenn), real email addresses, real photos, renderings labeled as renderings. People hand over an email when they believe a person will read it.
2. **Scarcity, stated honestly.** Graduation and game weekends are the hardest rooms in Gainesville to find. One family has already asked for May 2027. No fake countdowns.
3. **A reason to act now.** Discounted early-guest rates for stays before the full transformation, in exchange for feedback.
4. **Story.** A house older than UF's Gainesville campus (the house went up in 1899; the university opened here in 1906) is a talking point guests will repeat.
5. **Low effort.** The form asks only what's needed: name, email, what's bringing you, rough dates. Everything else is optional.

## 3. Design direction

The house is an 1899 Queen Anne–style Victorian: butter-yellow clapboard, fish-scale shingles in the gable, turned porch posts, a spindle frieze along the wraparound porch, a brick lattice foundation. Inside: dark-stained trim and wood floors, pale blue walls. The design takes its cues from the house and from the South, with Gator orange and blue used sparingly.

**Palette (drawn from the house)**
- Porch white `#FAFAF7`: page background, kept cool so it doesn't read as generic cream.
- Haint blue `#DDEBE7`: the pale blue-green Southern porch ceilings are painted. Used for section bands. It also echoes the blue walls inside the house.
- Gator navy `#13224A`: text and headings. A deepened UF blue.
- Gator orange `#E0531F`: buttons and calls to action only.
- Stained pine `#6E3A1F`: the dark interior trim. Thin rules, small details.
- Clapboard yellow `#F1E2A4`: rare highlights (the status chip on the timeline).

**Type (chosen for the period)**
- Display: **Besley**, a revival of Robert Besley's 1845 Clarendon, the face of Victorian-era posters and newspaper ads. Bold, warm, unmistakably 19th-century without being a costume.
- Body and interface: **Libre Franklin**, a revival of Franklin Gothic (1902), the American gothic of the same era. Clean and very readable on phones.

**One signature ornament:** a thin band of turned balusters taken from the porch railing, used as a divider under the header and above the footer. Nothing else is decorative.

**One signature interaction:** a before/after slider that drags the empty upstairs alcove into the concept half bath ("this is the ½ in 4½ baths").

Things deliberately avoided: emoji as section markers, identical rounded cards everywhere, gradient washes, fake countdown timers, stock photography.

## 4. Site map

```
Home (index.html)
  Header: logo · The House · Photos · History · [Join the guest list]
  Hero: "Something big is coming to Gainesville." + exterior photo
  Opening timeline: Purchased → Renovating now → Rent-ready end of 2026 → Finished summer 2027
  The house: 4 bedrooms · 4½ baths · fenced backyard · gas grill · on-site parking · 98-inch TV
  The transformation: before/after slider (alcove → half bath)
  Made for: game weekends · graduation · Family Weekend · all four years
  Early-guest rates + "already asked for May 2027 graduation"
  Guest list form
  Footer: emails for Craig and Jenn, Duck Pond, Gainesville FL

Photos (photos.html)
  Jump links: The home today · The transformation · When it's finished
  The home today: current photos
  The transformation: progress photos (empty state until the first ones go up)
  When it's finished: renderings, clearly labeled as concepts
  Tap any photo to view it full screen

History (history.html)
  The early photograph, large
  Then and now: what has changed and what survives
  Built in 1899: Gainesville at the turn of the century
  The Duck Pond: the neighborhood and its historic district
  The people who lived here: an invitation to share stories
  Timeline: 1899 → 1906 → 1980 → 2026 → 2027
```

## 5. Content facts used (checked)

- Northeast Gainesville Residential District, locally known as the Duckpond, listed on the National Register of Historic Places on February 12, 1980.
- The Buckman Act (1905) created the University of Florida in Gainesville; the school moved from Lake City and opened in Gainesville in September 1906.
- Everything else comes from Craig and Jenn's announcement. Nothing about the house's past owners is invented; that section invites guests and neighbors to share what they know.

## 6. Technical plan

- Plain static site: HTML, one CSS file, one small JS file. No build step, no framework. Opens on any host.
- Images resized to web sizes (JPEG + WebP, with `srcset`) so the site loads fast on phones at a tailgate.
- Guest list form works out of the box on **Netlify** (Netlify Forms emails each sign-up to Craig and Jenn). A one-line setting in `js/site.js` switches it to Formspree or any other form service for other hosts. If neither is set up, the form falls back to opening an email to Craig and Jenn.
- Accessible: keyboard-operable slider and lightbox, visible focus, reduced-motion respected, alt text on every photo.
- Search and sharing: page titles, descriptions, Open Graph image (the exterior), and VacationRental structured data.
- `README.md` explains how to deploy, connect the domain, set up the email addresses, edit the history, and add photos.

## 7. Assets still needed (see `CHATGPT_PROMPTS.md`)

- Logo (the site ships with a simple placeholder mark until the final logo is chosen).
- Renderings of the bedrooms, living room with the 98-inch TV, backyard and porch.
- A social share graphic for Facebook/Instagram posts.

## 8. Open questions for Craig and Jenn

- Is the exterior photo a current photo or an enhanced rendering? If it's a rendering, add the "Concept" label in `photos.html`.
- The street address: shown or hidden until booking? (Hidden for now.)
- Is "steps from campus" accurate for the address? The Duck Pond is a short walk to downtown; campus distance depends on the street. Copy currently says "minutes from UF's campus."
- The second email was written `jenn@@gatorhavenhouse.com`; the site uses `jenn@gatorhavenhouse.com`.

---

# Redesign (round 2)

## What changed and why

- **Name:** the brand is **Gator Haven House** (gatorhavenhouse.com). The house itself is presented by its historic name, **the Albert Blanding House**, which gives the brand real pedigree. Emails: craig@ and jenn@gatorhavenhouse.com.
- **Feel:** quiet luxury, like a boutique hotel site, with a few cinematic moments. It still reads as a college town: game-day copy, Gator orange and blue, "Go Gators" in the footer, and a site that works one-handed on a phone.
- **Address and map:** 306 NE 3rd Street is shown, with a custom map drawn from OpenStreetMap data in the site's colors and real walking, biking and driving times.

## Design references

Patterns borrowed from award-winning hospitality and editorial sites (Awwwards hotel winners such as Silena and Hotel Odisej, plus Aman and Auberge-style booking sites):

| Pattern | Where it's used |
|---|---|
| Full-bleed hero photo with headline rising line by line, image settling from a slow zoom | Home and History heroes |
| Text that fills in word by word as you scroll | Home "A house with a story" statement |
| Pinned "time-warp": 1899 photo wipes away to today while the year counts 1899 → 2026 | Home, after the statement |
| Sticky picture beside scrolling chapters | History timeline (1899, 1900, 1917, 1980, 2026) |
| Horizontal scroll section pinned on desktop, swipe on phones | Home "A home-game Saturday" |
| Parallax drift inside framed photos, frames that open as they arrive | The house, Then and now, architecture details |
| Route drawing itself on a custom map | Home location |
| Smooth scrolling, magnetic primary buttons, fill-up button hovers, header that hides on scroll | Site-wide |
| Full-screen serif menu on phones, cross-page fade transitions | Site-wide |

Built with GSAP 3.13 (ScrollTrigger, SplitText) and Lenis smooth scroll, loaded from public CDNs. Everything is an enhancement: with reduced motion turned on, or if the scripts fail to load, every page is complete and readable.

## History content sources

| Claim | Status |
|---|---|
| Built 1899, credited to Judge Horatio Davis, twice mayor | Supported by listing histories and Davis's 1900 *Gainesville Sun* obituary |
| Blanding lived here 1900–1910, family owned until 1958 | From local listing histories; owners' account |
| East Florida Seminary graduate (1894) | Wikipedia, National Guard Bureau |
| First in his class; Gainesville Guards | Owners' account; not yet confirmed in a second source |
| Distinguished Service Medal, WWI | Florida Dept. of State, National Guard Bureau |
| Chief of the National Guard Bureau 1936–1940 | Wikipedia, Florida Memory |
| Camp Blanding named for him (1939); helped found Everglades National Park | Wikipedia, Florida Memory |
| Named a Great Floridian (2000) | Florida Dept. of State |
| Great Floridian plaque at this house | **Not shown yet.** Wikipedia places Blanding's plaque at Bartow City Hall. The sentence is ready in `history.html`, commented out, to turn on once confirmed. |
