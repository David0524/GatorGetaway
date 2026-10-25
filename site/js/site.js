/* Gator Haven House: header, menu, motion, before/after slider, map, chapters, photo viewer,
   guest list form and copy buttons. Every effect is an enhancement: without JavaScript, or with
   reduced motion turned on, the pages are complete and readable as plain HTML. */

/* Where guest-list sign-ups go.
   "netlify"  works with no setup when the site is hosted on Netlify (Netlify Forms).
   A URL      posts to any form service instead, e.g. "https://formspree.io/f/abcdwxyz".
   If sending fails, the form opens an email to Craig and Jenn with the details filled in. */
const FORM_ENDPOINT = "netlify";
const HOST_EMAILS = ["craig@gatorhavenhouse.com", "jenn@gatorhavenhouse.com"];

(function () {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const motion = hasGsap && !reduceMotion;
  if (!motion) root.classList.remove("motion");
  let lenis = null;

  /* Smooth scrolling (desktop feel; touch keeps native scrolling) */
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add((t) => lenis.raf(t * 1000));
    window.gsap.ticker.lagSmoothing(0);
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

  /* Header: transparent over the hero photo, solid after it, tucks away while scrolling down */
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const threshold = hero ? hero.offsetHeight - (header ? header.offsetHeight : 0) : 10;
    header?.classList.toggle("is-solid", y > threshold);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 480) header?.classList.add("is-hidden");
    if (goingUp || y < 200) header?.classList.remove("is-hidden");
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Full-screen menu */
  const menu = document.getElementById("menu");
  const menuBtn = document.querySelector(".menu-btn");
  const behindMenu = [".skip", ".site-header", "main", ".site-footer"].map((sel) => document.querySelector(sel)).filter(Boolean);
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
    box.addEventListener("pointerdown", (e) => {
      dragging = true;
      box.setPointerCapture(e.pointerId);
      fromEvent(e);
      range.focus({ preventScroll: true });
    });
    box.addEventListener("pointermove", (e) => { if (dragging) fromEvent(e); });
    box.addEventListener("pointerup", () => { dragging = false; });
    box.addEventListener("pointercancel", () => { dragging = false; });
    range.addEventListener("input", () => set(Number(range.value)));

    /* One sweep the first time it comes into view, so people see that it moves */
    if (motion) {
      const state = { v: 50 };
      window.gsap.timeline({ scrollTrigger: { trigger: box, start: "top 65%", once: true }, delay: 0.3 })
        .to(state, { v: 18, duration: 1.1, ease: "power2.inOut", onUpdate: () => !dragging && set(state.v) })
        .to(state, { v: 78, duration: 1.3, ease: "power2.inOut", onUpdate: () => !dragging && set(state.v) })
        .to(state, { v: 50, duration: 0.9, ease: "power2.out", onUpdate: () => !dragging && set(state.v) });
    }
  });

  /* History chapters: swap the sticky picture as each chapter reaches the middle of the screen */
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

  /* Motion (GSAP). Skipped entirely for reduced motion or if the library didn't load. */
  if (motion) {
    const { gsap, ScrollTrigger } = window;
    const hasSplit = !!window.SplitText;
    gsap.registerPlugin(ScrollTrigger);
    if (hasSplit) gsap.registerPlugin(window.SplitText);

    /* Then and now: 1899 wipes away to today while the year counts up */
    const mm = gsap.matchMedia();
    const tw = document.querySelector(".timewarp");
    if (tw) mm.add("(min-height: 520px)", () => {
      tw.classList.add("is-live");
      const yearEl = tw.querySelector(".timewarp-year b");
      const yearNote = tw.querySelector(".timewarp-year small");
      const from = Number(tw.dataset.from || 1899);
      const to = Number(tw.dataset.to || 2026);
      const counter = { y: from };
      gsap.timeline({
        scrollTrigger: { trigger: tw, start: "top top", end: "+=160%", pin: true, scrub: 0.6, anticipatePin: 1 },
      })
        .to({}, { duration: 0.15 })
        .fromTo(tw.querySelector(".tw-then"), { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", ease: "power2.inOut", duration: 1 }, ">")
        .fromTo(tw.querySelector(".tw-now img"), { scale: 1.18 }, { scale: 1, ease: "power2.out", duration: 1 }, "<")
        .to(counter, {
          y: to, ease: "power2.inOut", duration: 1,
          onUpdate: () => {
            const v = Math.round(counter.y);
            if (yearEl) yearEl.textContent = v;
            if (yearNote) yearNote.textContent = v < to ? yearNote.dataset.then : yearNote.dataset.now;
          },
        }, "<")
        .to({}, { duration: 0.2 });
      return () => { tw.classList.remove("is-live"); if (yearEl) yearEl.textContent = from; };
    });

    /* Game day: the cards slide sideways as you scroll (desktop); phones swipe natively */
    mm.add("(min-width: 1000px) and (min-height: 640px)", () => {
      const sec = document.querySelector(".gameday");
      const track = sec && sec.querySelector(".track");
      if (!sec || !track) return;
      sec.classList.add("is-live");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);
      const tween = gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: { trigger: sec, start: "top top", end: () => "+=" + distance(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); sec.classList.remove("is-live"); gsap.set(track, { clearProps: "x" }); };
    });

    /* Hero: the photograph settles, the headline rises line by line */
    const heroImg = document.querySelector(".hero-media img");
    const heroIn = document.querySelectorAll(".hero [data-hero-in]");
    const heroTitle = document.querySelector(".hero h1");
    const playIntro = root.classList.contains("motion");
    window.__heroReady = true;
    gsap.set(heroIn, { autoAlpha: 1 });
    if (heroImg) {
      if (playIntro) gsap.fromTo(heroImg, { scale: 1.14 }, { scale: 1, duration: 2.6, ease: "expo.out" });
      gsap.to(heroImg, { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }
    if (playIntro && heroTitle && hasSplit) {
      window.SplitText.create(heroTitle, {
        type: "lines", mask: "lines", autoSplit: true, aria: "hidden",
        onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.09, delay: 0.25 }),
      });
    }
    const heroRest = Array.from(heroIn).filter((el) => el !== heroTitle);
    if (playIntro) gsap.from(heroRest, { y: 24, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.55 });

    /* Statement: words fill in as you read down */
    document.querySelectorAll("[data-scrub-words]").forEach((el) => {
      if (!hasSplit) return;
      window.SplitText.create(el, {
        type: "words", autoSplit: true, aria: "hidden",
        onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.24 }, {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        }),
      });
    });

    /* Headings rise gently into place (they stay readable before they move) */
    document.querySelectorAll("[data-split]").forEach((el) => {
      if (!hasSplit) return;
      window.SplitText.create(el, {
        type: "lines", autoSplit: true, aria: "hidden",
        onSplit: (self) => gsap.from(self.lines, {
          yPercent: 45, opacity: 0.2, duration: 1.1, ease: "expo.out", stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
      });
    });

    /* Photographs: a slow drift inside their frames, and frames that open as they arrive */
    document.querySelectorAll("[data-parallax] img").forEach((img) => {
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: "none",
        scrollTrigger: { trigger: img.closest("[data-parallax]"), start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(9% 9% 9% 9% round 4px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 4px)", ease: "none",
        scrollTrigger: { trigger: el, start: "top 95%", end: "top 40%", scrub: true },
      });
    });

    /* Map: the walking route draws itself to the stadium */
    const route = document.querySelector(".map-route");
    if (route && route.getTotalLength) {
      const len = route.getTotalLength();
      gsap.fromTo(route, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0, ease: "none",
        scrollTrigger: { trigger: ".map", start: "top 80%", end: "center 40%", scrub: true },
      });
      gsap.from(".map .pin", {
        y: 10, opacity: 0.3, duration: 0.8, ease: "expo.out", stagger: 0.06,
        scrollTrigger: { trigger: ".map", start: "top 75%", once: true },
      });
    }

    /* Primary buttons lean toward the pointer */
    if (finePointer) {
      document.querySelectorAll(".btn-primary").forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
        btn.addEventListener("pointermove", (e) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.18);
          yTo((e.clientY - r.top - r.height / 2) * 0.28);
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

  /* Photo viewer */
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
      const fig = a.closest("figure");
      const fc = fig && fig.querySelector("figcaption");
      cap.textContent = fc ? fc.textContent.trim() : "";
    };
    const single = links.length < 2;
    dlg.querySelector(".lightbox-prev").hidden = single;
    dlg.querySelector(".lightbox-next").hidden = single;
    links.forEach((a, i) => a.addEventListener("click", (e) => {
      e.preventDefault();
      show(i);
      lenis?.stop();
      dlg.showModal();
    }));
    dlg.addEventListener("close", () => lenis?.start());
    dlg.querySelector(".lightbox-close").addEventListener("click", () => dlg.close());
    dlg.querySelector(".lightbox-prev").addEventListener("click", () => show(index - 1));
    dlg.querySelector(".lightbox-next").addEventListener("click", () => show(index + 1));
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.classList.contains("lightbox-inner")) dlg.close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  /* Copy email buttons */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied";
      } catch (err) {
        const link = btn.parentElement.querySelector("a");
        if (link) {
          const sel = window.getSelection();
          const r = document.createRange();
          r.selectNodeContents(link);
          sel.removeAllRanges();
          sel.addRange(r);
        }
        btn.textContent = "Selected";
      }
      setTimeout(() => { btn.textContent = "Copy"; }, 2000);
    });
  });

  /* Guest list form */
  const form = document.querySelector("[data-guest-form]");
  if (form) {
    const errorBox = form.querySelector(".form-error");
    const button = form.querySelector('button[type="submit"]');
    const label = button.querySelector("span") || button;
    const showError = (msg) => { errorBox.textContent = msg; errorBox.hidden = false; };

    const detailsText = (data) => {
      const lines = [];
      for (const [k, v] of data.entries()) {
        if (k === "form-name" || k === "bot-field" || !String(v).trim()) continue;
        lines.push(k.replace(/_/g, " ") + ": " + v);
      }
      return "Please add me to the Gator Haven House guest list.\n\n" + lines.join("\n");
    };
    const showSuccess = (name) => {
      const first = (name || "").trim().split(/\s+/)[0].replace(/[<>&"]/g, "");
      form.innerHTML =
        '<div class="form-success" role="status" tabindex="-1">' +
        "<h3>You're on the list" + (first ? ", " + first : "") + ".</h3>" +
        '<p class="lede">We\'ll email you when dates open and when there\'s progress to show. Watch for a note from ' +
        HOST_EMAILS.join(" or ") + ".</p>" +
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
      if (!name.value.trim()) {
        name.setAttribute("aria-invalid", "true");
        name.focus();
        return showError("Add your name so we know who to write back to.");
      }
      if (!email.validity.valid || !email.value.trim()) {
        email.setAttribute("aria-invalid", "true");
        email.focus();
        return showError("Add an email address like name@example.com so we can send you dates.");
      }

      const data = new FormData(form);
      if (data.get("bot-field")) return;
      button.disabled = true;
      label.textContent = "Joining...";

      try {
        let res;
        if (FORM_ENDPOINT === "netlify") {
          res = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data).toString(),
          });
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
        errorBox.querySelector("[data-copy-details]").addEventListener("click", async (ev) => {
          try { await navigator.clipboard.writeText(text); ev.target.textContent = "Copied"; }
          catch (err2) { ev.target.textContent = "Copy didn't work, please type them in an email"; }
        });
      }
    });
  }
})();
