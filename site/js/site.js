/* Gator Haven House: header, menu, motion, drafting table, before/after slider, map, history
   chapters, photo viewer, guest-list ticket and copy buttons. Every effect is an enhancement:
   without JavaScript, or with reduced motion turned on, the pages are complete as plain HTML. */

/* Where guest-list sign-ups go.
   A URL      posts to a form service: the Gator Haven House form on Formspree.
   "netlify"  uses Netlify Forms instead, if the site moves to Netlify (also restore the
              data-netlify attributes on the form in index.html).
   If sending fails, the form shows the hosts' email addresses and a copy button instead. */
const FORM_ENDPOINT = "https://formspree.io/f/xeaaajnn";
const HOST_EMAILS = ["craig@gatorhavenhouse.com", "jenn@gatorhavenhouse.com"];

(function () {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const motion = hasGsap && !reduceMotion;
  if (!motion) root.classList.remove("motion");
  let lenis = null;

  /* Smooth scrolling on desktop (touch keeps native scrolling) */
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1 });
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add((t) => lenis.raf(t * 1000));
    window.gsap.ticker.lagSmoothing(0);
  }
  /* A new page opens at the top unless the link names a section. Some viewers (the artifact
     preview frame, for one) carry the previous page's scroll position across a link. */
  const nav = performance.getEntriesByType?.("navigation")[0];
  if (!location.hash && (!nav || nav.type !== "back_forward")) {
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }
  const headerOffset = () => -(document.querySelector(".site-header")?.offsetHeight || 0) - 8;
  const scrollToEl = (el) => {
    if (lenis) lenis.scrollTo(el, { offset: headerOffset(), duration: 1.4 });
    else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };
  const focusTarget = (el) => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  /* Same-page anchor links: smooth scroll, move focus, keep the address bar honest */
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href*="#"]');
    if (!a || a.classList.contains("skip")) return;
    const url = new URL(a.href, location.href);
    if (url.pathname.replace(/index\.html$/, "") !== location.pathname.replace(/index\.html$/, "") || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    scrollToEl(target);
    focusTarget(target);
    if (location.hash !== url.hash) history.pushState(null, "", url.hash);
  });

  /* Header: a shadow once you scroll, tucks away while scrolling down */
  const header = document.querySelector(".site-header");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-solid", y > 8);
    if (y > lastY + 4 && y > 480) header?.classList.add("is-hidden");
    if (y < lastY - 4 || y < 200) header?.classList.remove("is-hidden");
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Floating guest-list button on phones: appears after the first screen, steps aside near the form and footer */
  const floatCta = document.querySelector(".float-cta");
  if (floatCta) {
    const avoid = [document.getElementById("guest-list"), document.querySelector(".closer"), document.querySelector(".site-footer")].filter(Boolean);
    const inView = new Set();
    const update = () => floatCta.classList.toggle("is-shown", window.scrollY > window.innerHeight * 0.8 && inView.size === 0);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => (en.isIntersecting ? inView.add(en.target) : inView.delete(en.target)));
        update();
      });
      avoid.forEach((el) => io.observe(el));
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* Full-screen menu, with the page behind it made inert */
  const menu = document.getElementById("menu");
  const menuBtn = document.querySelector(".menu-btn");
  const behindMenu = [".skip", ".site-header", "main", ".site-footer"].map((s) => document.querySelector(s)).filter(Boolean);
  const setInert = (on) => behindMenu.forEach((el) => { el.inert = on; });
  function closeMenu() {
    if (!menu || !menu.classList.contains("is-open")) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    setInert(false);
    menuBtn?.setAttribute("aria-expanded", "false");
    lenis?.start();
    document.body.style.overflow = "";
    menuBtn?.focus();
  }
  if (menu && menuBtn) {
    menuBtn.addEventListener("click", () => {
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      setInert(true);
      menuBtn.setAttribute("aria-expanded", "true");
      lenis?.stop();
      document.body.style.overflow = "hidden";
      menu.querySelector("nav a")?.focus();
    });
    menu.querySelector(".menu-close")?.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  /* Before / after slider */
  document.querySelectorAll("[data-compare]").forEach((box) => {
    const range = box.querySelector(".compare-range");
    let dragging = false;
    const set = (pct) => {
      const v = Math.max(0, Math.min(100, pct));
      box.style.setProperty("--pos", v + "%");
      range.value = Math.round(v);
    };
    const fromEvent = (e) => {
      const r = box.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };
    box.addEventListener("pointerdown", (e) => { dragging = true; box.setPointerCapture(e.pointerId); fromEvent(e); range.focus({ preventScroll: true }); });
    box.addEventListener("pointermove", (e) => { if (dragging) fromEvent(e); });
    box.addEventListener("pointerup", () => { dragging = false; });
    box.addEventListener("pointercancel", () => { dragging = false; });
    range.addEventListener("input", () => set(Number(range.value)));
    if (motion) {
      const st = { v: 50 };
      window.gsap.timeline({ scrollTrigger: { trigger: box, start: "top 65%", once: true }, delay: 0.3 })
        .to(st, { v: 18, duration: 1.1, ease: "power2.inOut", onUpdate: () => !dragging && set(st.v) })
        .to(st, { v: 78, duration: 1.3, ease: "power2.inOut", onUpdate: () => !dragging && set(st.v) })
        .to(st, { v: 50, duration: 0.9, ease: "power2.out", onUpdate: () => !dragging && set(st.v) });
    }
  });

  /* History chapters: swap the sticky keepsake as each chapter reaches the middle of the screen */
  const visuals = document.querySelectorAll(".cv");
  if (visuals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.getAttribute("data-visual");
        visuals.forEach((v) => v.classList.toggle("is-active", v.id === id));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll(".chapter[data-visual]").forEach((c) => io.observe(c));
  }

  /* ---------------- Motion (GSAP). Skipped for reduced motion or if the library didn't load. */
  if (motion) {
    const { gsap, ScrollTrigger } = window;
    const hasSplit = !!window.SplitText;
    gsap.registerPlugin(ScrollTrigger);
    if (hasSplit) gsap.registerPlugin(window.SplitText);
    const mm = gsap.matchMedia();

    /* Pinned sections first, so every later trigger measures the page with their spacers in place */

    /* Drafting table: the section holds still, centered on screen, while the drawing builds up,
       the callouts draw on, and the photograph develops through it. It's shorter than the screen,
       so the sections above and below stay in view while it plays. */
    const draft = document.querySelector(".drafting");
    if (draft) mm.add("(min-height: 560px)", () => {
      draft.classList.add("is-live");
      const steps = draft.querySelectorAll(".draft-step");
      const leads = draft.querySelectorAll(".notes .lead");
      leads.forEach((l) => { const n = l.getTotalLength(); l.style.strokeDasharray = n; l.style.strokeDashoffset = n; });
      const q = (s) => draft.querySelectorAll(s);
      gsap.set(q(".notes .dot, .notes text, .titleblock"), { opacity: 0 });
      gsap.set(q(".stage .draw"), { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(q(".pencil"), { left: "0%", opacity: 0 });
      gsap.set(q(".stage .build"), { opacity: 1 });
      const setStep = (i) => steps.forEach((s, k) => s.classList.toggle("is-on", k === i));
      setStep(0);
      let marks = [];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: draft, start: () => (draft.offsetHeight < innerHeight ? "center center" : "top top"), end: "+=180%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => setStep(marks.filter((m) => self.progress >= m).length),
        },
      });
      /* pencil guidelines, then the timber frame, then the walls, then the finished drawing */
      tl.to({}, { duration: 0.35 })
        .addLabel("frame").to(q(".build.b1"), { opacity: 0, duration: 0.5, ease: "none" })
        .to({}, { duration: 0.35 })
        .addLabel("walls").to(q(".build.b2"), { opacity: 0, duration: 0.5, ease: "none" })
        .to({}, { duration: 0.35 })
        .addLabel("drawing").to(q(".build.b3"), { opacity: 0, duration: 0.5, ease: "none" });
      tl.to(q(".notes .dot"), { opacity: 1, stagger: 0.06, duration: 0.1 })
        .to(leads, { strokeDashoffset: 0, stagger: 0.06, duration: 0.3, ease: "none" }, "<")
        .to(q(".notes text, .titleblock"), { opacity: 1, stagger: 0.05, duration: 0.15 }, "-=0.2")
        .to({}, { duration: 0.15 })
        .addLabel("photo")
        .set(q(".pencil"), { opacity: 1 })
        .to(q(".pencil"), { left: "100%", duration: 0.9, ease: "power1.inOut" })
        .to(q(".stage .draw"), { clipPath: "inset(0% 0% 0% 100%)", duration: 0.9, ease: "power1.inOut" }, "<")
        .to(q(".notes .note"), { opacity: 0, duration: 0.3, stagger: 0.03 }, "-=0.5")
        .to(q(".pencil"), { opacity: 0, duration: 0.05 })
        .to({}, { duration: 0.2 });
      /* captions switch a little after each stage begins */
      marks = ["frame", "walls", "drawing", "photo"].map((l) => (tl.labels[l] + 0.15) / tl.duration());
      return () => {
        draft.classList.remove("is-live");
        leads.forEach((l) => { l.style.strokeDasharray = ""; l.style.strokeDashoffset = ""; });
      };
    });

    /* Hero: the playbill sets line by line, the cabinet card drops onto the table, the seal stamps down */
    const playIntro = root.classList.contains("motion");
    window.__heroReady = true;
    if (document.querySelector(".hero [data-hero-in]")) gsap.set(".hero [data-hero-in]", { autoAlpha: 1 });
    if (playIntro) {
      /* each page animates only the intro pieces it has */
      const intro = (sel, vars) => { const els = document.querySelectorAll(sel); if (els.length) gsap.from(els, vars); };
      intro(".playbill > span", { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12, delay: 0.1 });
      intro(".hero .pb-rule, .hero-copy > *", { y: 20, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, delay: 0.55 });
      intro(".cabinet .cab", { y: 30, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.3 });
      intro(".cabinet .seal", { rotate: -90, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.7 });
      intro(".hist-title > *", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.1 });
      intro(".hist-card", { y: 30, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.3 });
      intro(".page-title > *", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.1 });
    }

    /* Postcard: the big word rises and the stamps get stuck on */
    if (document.querySelector(".greet")) {
      gsap.from(".greet-word", { yPercent: 30, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".greet", start: "top 70%" } });
    }

    /* Ephemera: pieces start scattered off the table and settle into the pile as you scroll */
    if (document.querySelector(".pile")) {
      [[".e-old", -260, -120, -24], [".e-now", 300, 60, 20], [".e-portrait", -80, 260, -18], [".e-pennant", 260, -200, -40], [".e-ticket", -320, 140, 34]]
        .forEach(([sel, x, y, r]) => gsap.from(sel, {
          x, y, rotate: "+=" + r, opacity: 0, ease: "power2.out",
          scrollTrigger: { trigger: ".pile", start: "top 95%", end: "center 55%", scrub: 0.8 },
        }));
      const pen = document.querySelector(".e-pennant");
      pen?.addEventListener("pointerenter", () => gsap.fromTo(pen, { rotate: -10 }, { rotate: -16, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }));
    }

    /* Illustrated map: the dotted walk from the house draws itself to the stadium as you scroll */
    const walk = document.querySelector(".walk-mask");
    if (walk && walk.getTotalLength) {
      const len = walk.getTotalLength();
      gsap.set(walk, { strokeDasharray: len, strokeDashoffset: len });
      /* desktop: the section holds still, centered, while the walk draws; phones draw it as it scrolls past */
      mm.add("(min-width: 1000px) and (min-height: 640px)", () => {
        const loc = document.getElementById("location");
        const tw = gsap.to(walk, { strokeDashoffset: 0, ease: "none", scrollTrigger: {
          trigger: loc, start: () => (loc.offsetHeight < innerHeight ? "center center" : "top top"),
          end: "+=110%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true } });
        return () => { tw.scrollTrigger?.kill(); tw.kill(); };
      });
      mm.add("(max-width: 999px), (max-height: 639px)", () => {
        const tw = gsap.to(walk, { strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: ".map-illo", start: "top 85%", end: "bottom 45%", scrub: 0.6 } });
        return () => { tw.scrollTrigger?.kill(); tw.kill(); };
      });
    }

    /* Map: the walking route draws itself to the stadium */
    const route = document.querySelector(".map-route");
    if (route && route.getTotalLength) {
      const len = route.getTotalLength();
      gsap.fromTo(route, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".map", start: "top 80%", end: "center 40%", scrub: true } });
      gsap.from(".map .pin", { y: 10, opacity: 0.3, duration: 0.8, ease: "power2.out", stagger: 0.06, scrollTrigger: { trigger: ".map", start: "top 75%", once: true } });
    }

    /* Primary buttons lean toward the pointer */
    if (finePointer) {
      document.querySelectorAll(".pill").forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
        btn.addEventListener("pointermove", (e) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.16);
          yTo((e.clientY - r.top - r.height / 2) * 0.26);
        });
        btn.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
      });
    }

    ScrollTrigger.sort();
    const landOnHash = () => {
      const t = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (!t) return;
      if (lenis) lenis.scrollTo(t, { offset: headerOffset(), immediate: true, force: true });
      else window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY + headerOffset());
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { ScrollTrigger.refresh(); landOnHash(); });
    window.addEventListener("load", () => { ScrollTrigger.refresh(); landOnHash(); });
  }

  /* ---------------- Game day row: arrows scroll the cards one at a time */
  document.querySelectorAll("[data-track-nav]").forEach((nav) => {
    const track = document.getElementById(nav.dataset.trackNav);
    if (!track) return;
    const prev = nav.querySelector('[data-step="-1"]'), next = nav.querySelector('[data-step="1"]');
    const step = () => (track.querySelector(".stop")?.getBoundingClientRect().width || 300) + 22;
    const sync = () => {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4;
    };
    [prev, next].forEach((b) => b.addEventListener("click", () => track.scrollBy({ left: Number(b.dataset.step) * step(), behavior: reduceMotion ? "auto" : "smooth" })));
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    nav.hidden = false;
    sync();
  });

  /* ---------------- Photo viewer */
  const links = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (links.length && typeof HTMLDialogElement === "function") {
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Photo viewer");
    dlg.innerHTML =
      '<div class="lightbox-inner"><img alt=""><p class="lightbox-caption"></p></div>' +
      '<button class="lightbox-btn lightbox-close" type="button" aria-label="Close photo">&#x2715;</button>' +
      '<button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous photo">&#x2039;</button>' +
      '<button class="lightbox-btn lightbox-next" type="button" aria-label="Next photo">&#x203A;</button>';
    document.body.appendChild(dlg);
    const img = dlg.querySelector("img");
    const cap = dlg.querySelector(".lightbox-caption");
    let index = 0;
    const show = (i) => {
      index = (i + links.length) % links.length;
      const a = links[index];
      const thumb = a.querySelector("img");
      img.src = a.getAttribute("href");
      img.alt = thumb ? thumb.alt : "";
      const fc = a.closest("figure")?.querySelector("figcaption");
      cap.textContent = fc ? fc.textContent.trim() : "";
    };
    const single = links.length < 2;
    dlg.querySelector(".lightbox-prev").hidden = single;
    dlg.querySelector(".lightbox-next").hidden = single;
    links.forEach((a, i) => a.addEventListener("click", (e) => { e.preventDefault(); show(i); lenis?.stop(); dlg.showModal(); }));
    dlg.addEventListener("close", () => lenis?.start());
    dlg.querySelector(".lightbox-close").addEventListener("click", () => dlg.close());
    dlg.querySelector(".lightbox-prev").addEventListener("click", () => show(index - 1));
    dlg.querySelector(".lightbox-next").addEventListener("click", () => show(index + 1));
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.classList.contains("lightbox-inner")) dlg.close(); });
    dlg.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") show(index - 1); if (e.key === "ArrowRight") show(index + 1); });
  }

  /* ---------------- Copy email buttons */
  const copyText = async (btn, text) => {
    try { await navigator.clipboard.writeText(text); btn.textContent = "Copied"; }
    catch (err) {
      const link = btn.parentElement.querySelector("a");
      if (link) { const sel = window.getSelection(); const r = document.createRange(); r.selectNodeContents(link); sel.removeAllRanges(); sel.addRange(r); }
      btn.textContent = "Selected";
    }
  };
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => { await copyText(btn, btn.getAttribute("data-copy")); setTimeout(() => { btn.textContent = "Copy"; }, 2000); });
  });

  /* ---------------- Date calendar on the guest-list ticket
     Without JavaScript the two native date fields stay. With it, they're hidden but still hold
     the values (checkin and checkout, as YYYY-MM-DD) that the form sends, and a date field
     opens the calendar as a dropdown over the form. */
  document.querySelectorAll("[data-calendar]").forEach((box) => {
    const inIn = box.querySelector('[name="checkin"]');
    const inOut = box.querySelector('[name="checkout"]');
    const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
    const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
    const nightsBetween = (a, b) => Math.round((b - a) / 86400000);
    const min = parse(box.dataset.min);
    const max = parse(box.dataset.max);
    const minNights = Number(box.dataset.minNights || 1);
    const fmtLong = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    const fmtShort = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });
    const fmtMonth = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
    let start = inIn.value ? parse(inIn.value) : null;
    let end = inOut.value ? parse(inOut.value) : null;
    let hover = null;
    let view = new Date((start || min).getFullYear(), (start || min).getMonth(), 1);
    let focusDay = start || min;

    box.querySelector(".date-inputs").hidden = true;
    const calId = "cal-" + Math.random().toString(36).slice(2, 8);
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "date-trigger";
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", calId);
    trigger.innerHTML =
      '<span class="dt-part"><small>Check-in</small><b data-dt="in">Add date</b></span>' +
      '<span class="dt-part"><small>Check-out</small><b data-dt="out">Add date</b></span>' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>';
    box.appendChild(trigger);
    const cal = document.createElement("div");
    cal.className = "cal";
    cal.id = calId;
    cal.hidden = true;
    cal.setAttribute("role", "dialog");
    cal.setAttribute("aria-label", "Choose your dates");
    cal.innerHTML =
      '<div class="cal-nav-row"><button type="button" class="cal-nav" data-step="-1" aria-label="Previous month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button>' +
      '<button type="button" class="cal-nav" data-step="1" aria-label="Next month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button></div>' +
      '<div class="cal-months"></div>' +
      '<div class="cal-foot"><p class="cal-summary" aria-live="polite"></p><span class="cal-actions"><button type="button" class="cal-clear" hidden>Clear</button><button type="button" class="cal-done">Done</button></span></div>';
    // The ticket's notched edges are a mask that would clip the dropdown, so it lives on the
    // ticket itself and is placed under the date field when it opens.
    const host = box.closest(".ticket") || box;
    host.appendChild(cal);
    const monthsEl = cal.querySelector(".cal-months");
    const summary = cal.querySelector(".cal-summary");
    const clearBtn = cal.querySelector(".cal-clear");
    const doneBtn = cal.querySelector(".cal-done");
    const tIn = trigger.querySelector('[data-dt="in"]');
    const tOut = trigger.querySelector('[data-dt="out"]');
    const prevBtn = cal.querySelector('[data-step="-1"]');
    const nextBtn = cal.querySelector('[data-step="1"]');

    const same = (a, b) => a && b && a.getTime() === b.getTime();
    const picking = () => start && !end;
    const blocked = (d) => d < min || d > max || (picking() && d > start && nightsBetween(start, d) < minNights);

    const monthTable = (first) => {
      const y = first.getFullYear(), m = first.getMonth();
      const lead = first.getDay();
      const days = new Date(y, m + 1, 0).getDate();
      let html = '<div class="cal-month"><p class="cal-title" id="cal-' + y + "-" + m + '">' + fmtMonth.format(first) + "</p>" +
        '<table aria-labelledby="cal-' + y + "-" + m + '"><thead><tr>' +
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => '<th scope="col" abbr="' + w + '">' + w[0] + "</th>").join("") +
        "</tr></thead><tbody><tr>";
      for (let i = 0; i < lead; i++) html += "<td></td>";
      for (let d = 1; d <= days; d++) {
        const date = new Date(y, m, d);
        const end2 = end || (picking() && hover && hover > start && !blocked(hover) ? hover : null);
        const cls = ["cal-day"];
        let state = "";
        if (same(date, start)) { cls.push("is-start"); state = ", check-in"; }
        if (same(date, end)) { cls.push("is-end"); state = ", check-out"; }
        if (start && end2 && date > start && date < end2) cls.push("in-range");
        if (!end && same(date, end2)) cls.push("is-preview");
        const off = blocked(date);
        const why = off && picking() && date > start ? ", " + minNights + "-night minimum" : off ? ", not available" : "";
        html += '<td><button type="button" class="' + cls.join(" ") + '" data-date="' + iso(date) + '" tabindex="' + (same(date, focusDay) ? "0" : "-1") + '"' +
          (off ? ' aria-disabled="true"' : "") + (state ? ' aria-pressed="true"' : "") +
          ' aria-label="' + fmtLong.format(date) + state + why + '">' + d + "</button></td>";
        if ((lead + d) % 7 === 0 && d < days) html += "</tr><tr>";
      }
      return html + "</tr></tbody></table></div>";
    };

    const render = (keepFocus) => {
      const second = new Date(view.getFullYear(), view.getMonth() + 1, 1);
      monthsEl.innerHTML = monthTable(view) + monthTable(second);
      prevBtn.disabled = view <= new Date(min.getFullYear(), min.getMonth(), 1);
      nextBtn.disabled = second >= new Date(max.getFullYear(), max.getMonth(), 1);
      if (start && end) {
        const n = nightsBetween(start, end);
        summary.innerHTML = "<b>" + fmtShort.format(start) + " to " + fmtShort.format(end) + ", " + end.getFullYear() + "</b> " + n + " nights";
      } else if (start) {
        summary.innerHTML = "<b>Check-in " + fmtShort.format(start) + ".</b> Now pick check-out.";
      } else {
        summary.textContent = "Pick a check-in date. Stays start December 26, 2026.";
      }
      clearBtn.hidden = !start;
      inIn.value = start ? iso(start) : "";
      inOut.value = end ? iso(end) : "";
      tIn.textContent = start ? fmtShort.format(start) : "Add date";
      tOut.textContent = end ? fmtShort.format(end) : "Add date";
      trigger.classList.toggle("has-dates", !!start);
      trigger.setAttribute("aria-label", "Your dates: " + (start && end ? fmtLong.format(start) + " to " + fmtLong.format(end) : start ? "check-in " + fmtLong.format(start) + ", no check-out yet" : "none chosen") + ". Open calendar");
      if (!cal.hidden) place();
      if (keepFocus) monthsEl.querySelector('[data-date="' + iso(focusDay) + '"]')?.focus({ preventScroll: true });
    };

    const showMonthOf = (d) => {
      const first = new Date(d.getFullYear(), d.getMonth(), 1);
      const second = new Date(view.getFullYear(), view.getMonth() + 1, 1);
      const twoUp = monthsEl.querySelectorAll(".cal-month")[1]?.offsetParent !== null;
      if (first < view) view = first;
      else if (first > (twoUp ? second : view)) view = twoUp ? new Date(first.getFullYear(), first.getMonth() - 1, 1) : first;
    };

    const isOpen = () => !cal.hidden;
    const place = () => {
      const h = host.getBoundingClientRect(), b = box.getBoundingClientRect(), t = trigger.getBoundingClientRect();
      cal.style.left = b.left - h.left + "px";
      cal.style.width = b.width + "px";
      // Drop down when there's room before the guest-list band ends, otherwise open upward.
      const band = (host.closest("section") || document.body).getBoundingClientRect();
      const below = t.bottom + 10 + cal.offsetHeight <= band.bottom - 8;
      cal.style.top = (below ? t.bottom - h.top + 10 : b.top - h.top - cal.offsetHeight - 10) + "px";
      cal.classList.toggle("is-up", !below);
    };
    const open = () => {
      if (isOpen()) return;
      cal.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      view = new Date((start || focusDay).getFullYear(), (start || focusDay).getMonth(), 1);
      render(false);
      place();
      window.addEventListener("resize", place);
      // Bring the whole calendar into view if it opened past the top or bottom of the screen.
      const r = cal.getBoundingClientRect();
      const topLimit = (document.querySelector(".site-header")?.offsetHeight || 0) + 12;
      const shift = r.top < topLimit ? r.top - topLimit : r.bottom > innerHeight - 12 ? Math.min(r.bottom - innerHeight + 12, r.top - topLimit) : 0;
      if (shift) { if (lenis) lenis.scrollTo(scrollY + shift, { duration: 0.6 }); else window.scrollBy({ top: shift, behavior: reduceMotion ? "auto" : "smooth" }); }
      monthsEl.querySelector('[data-date="' + iso(focusDay) + '"]')?.focus({ preventScroll: true });
      document.addEventListener("pointerdown", outside, true);
    };
    const close = (refocus) => {
      if (!isOpen()) return;
      cal.hidden = true;
      hover = null;
      trigger.setAttribute("aria-expanded", "false");
      document.removeEventListener("pointerdown", outside, true);
      window.removeEventListener("resize", place);
      if (refocus) trigger.focus();
    };
    const outside = (e) => { if (!cal.contains(e.target) && !trigger.contains(e.target)) close(false); };
    trigger.addEventListener("click", () => (isOpen() ? close(true) : open()));
    doneBtn.addEventListener("click", () => close(true));
    cal.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.preventDefault(); close(true); } });
    cal.addEventListener("focusout", (e) => { if (e.relatedTarget && !cal.contains(e.relatedTarget) && e.relatedTarget !== trigger) close(false); });

    const pick = (d) => {
      if (blocked(d)) return;
      if (!start || end || d <= start) { start = d; end = null; }
      else end = d;
      hover = null;
      focusDay = d;
      render(true);
      if (start && end) setTimeout(() => close(true), 350);
    };

    monthsEl.addEventListener("click", (e) => {
      const b = e.target.closest(".cal-day");
      if (b) pick(parse(b.dataset.date));
    });
    monthsEl.addEventListener("mouseover", (e) => {
      const b = e.target.closest(".cal-day");
      if (!b || !picking()) return;
      const d = parse(b.dataset.date);
      if (!same(d, hover)) { hover = d; render(false); }
    });
    monthsEl.addEventListener("mouseleave", () => { if (hover) { hover = null; render(false); } });
    monthsEl.addEventListener("keydown", (e) => {
      const b = e.target.closest(".cal-day");
      if (!b) return;
      const d = parse(b.dataset.date);
      const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
      let next = null;
      if (e.key in moves) next = addDays(d, moves[e.key]);
      else if (e.key === "Home") next = addDays(d, -d.getDay());
      else if (e.key === "End") next = addDays(d, 6 - d.getDay());
      else if (e.key === "PageUp") next = new Date(d.getFullYear(), d.getMonth() - 1, Math.min(d.getDate(), 28));
      else if (e.key === "PageDown") next = new Date(d.getFullYear(), d.getMonth() + 1, Math.min(d.getDate(), 28));
      else return;
      e.preventDefault();
      if (next < min) next = min;
      if (next > max) next = max;
      focusDay = next;
      if (picking()) hover = next;
      showMonthOf(next);
      render(true);
    });
    [prevBtn, nextBtn].forEach((btn) => btn.addEventListener("click", () => {
      view = new Date(view.getFullYear(), view.getMonth() + Number(btn.dataset.step), 1);
      const first = view < min ? min : view;
      focusDay = first;
      render(false);
    }));
    clearBtn.addEventListener("click", () => {
      start = end = hover = null;
      focusDay = min;
      render(false);
      monthsEl.querySelector('[tabindex="0"]')?.focus();
    });
    render(false);
  });

  /* ---------------- Guest list ticket */
  const form = document.querySelector("[data-guest-form]");
  if (form) {
    const ticket = form.closest(".ticket");
    const errorBox = form.querySelector(".form-error");
    const button = form.querySelector('button[type="submit"]');
    const label = button.querySelector("span") || button;
    const showError = (msg) => { errorBox.textContent = msg; errorBox.hidden = false; };
    const detailsText = (data) => {
      const lines = [];
      for (const [k, v] of data.entries()) {
        if (k.startsWith("_") || k === "form-name" || !String(v).trim()) continue;
        lines.push(k.replace(/_/g, " ") + ": " + v);
      }
      return "Please add me to the Gator Haven House guest list.\n\n" + lines.join("\n");
    };
    const showSuccess = (name) => {
      const first = (name || "").trim().split(/\s+/)[0].replace(/[<>&"]/g, "");
      ticket?.classList.add("is-torn");
      form.innerHTML =
        '<div class="form-success" role="status" tabindex="-1">' +
        "<h3>You're on the list" + (first ? ", " + first : "") + ".</h3>" +
        "<p>Keep your stub. We'll write when dates open and when there's progress to show, from " + HOST_EMAILS.join(" or ") + ".</p>" +
        '<p><a class="link" href="photos.html">See the photos while you wait</a></p></div>';
      form.querySelector(".form-success").focus();
    };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorBox.hidden = true;
      const name = form.querySelector("#gl-name");
      const email = form.querySelector("#gl-email");
      name.removeAttribute("aria-invalid");
      email.removeAttribute("aria-invalid");
      if (!name.value.trim()) { name.setAttribute("aria-invalid", "true"); name.focus(); return showError("Add your name so we know who to write back to."); }
      if (!email.validity.valid || !email.value.trim()) { email.setAttribute("aria-invalid", "true"); email.focus(); return showError("Add an email address like name@example.com so we can send you dates."); }
      const data = new FormData(form);
      if (data.get("_gotcha")) return;
      button.disabled = true;
      label.textContent = "Joining...";
      try {
        let res;
        if (FORM_ENDPOINT === "netlify") {
          res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() });
        } else if (FORM_ENDPOINT) {
          res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
        }
        if (!res || !res.ok) throw new Error("Form service unavailable");
        showSuccess(data.get("name"));
      } catch (err) {
        button.disabled = false;
        label.textContent = "Join the guest list";
        const text = detailsText(data);
        const subject = encodeURIComponent("Guest list: " + (data.get("name") || ""));
        const href = "mailto:" + HOST_EMAILS.join(",") + "?subject=" + subject + "&body=" + encodeURIComponent(text);
        errorBox.innerHTML = "The form couldn't send just now. Email your details to " +
          HOST_EMAILS.map((m) => '<a href="mailto:' + m + '">' + m + "</a>").join(" or ") +
          ' and you\'re on the list. <a href="' + href + '">Open a pre-filled email</a> or ' +
          '<button type="button" class="copy-btn" data-copy-details>Copy my details</button>';
        errorBox.hidden = false;
        errorBox.querySelector("[data-copy-details]").addEventListener("click", (ev) => copyText(ev.target, text));
      }
    });
  }
})();
