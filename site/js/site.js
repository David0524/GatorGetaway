/* Gator Haven House: header, menu, motion, drafting table, before/after slider, map, history
   chapters, photo viewer, guest-list ticket and copy buttons. Every effect is an enhancement:
   without JavaScript, or with reduced motion turned on, the pages are complete as plain HTML. */

/* Where guest-list sign-ups go.
   "netlify"  works with no setup when the site is hosted on Netlify (Netlify Forms).
   A URL      posts to any form service instead, e.g. "https://formspree.io/f/abcdwxyz".
   If sending fails, the form shows the hosts' email addresses and a copy button instead. */
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

  /* Smooth scrolling on desktop (touch keeps native scrolling) */
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1 });
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

    /* Drafting table: callouts draw on, then the photograph develops through the drawing */
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
          trigger: draft, start: "top top", end: "+=340%", pin: true, scrub: 0.7, anticipatePin: 1,
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

    /* Game day: the day slides sideways as you scroll (desktop); phones swipe natively */
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

    /* Hero: the playbill sets line by line, the cabinet card drops onto the table, the seal stamps down */
    const playIntro = root.classList.contains("motion");
    window.__heroReady = true;
    gsap.set(".hero [data-hero-in]", { autoAlpha: 1 });
    if (playIntro) {
      gsap.from(".playbill > span", { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12, delay: 0.1 });
      gsap.from(".hero .pb-rule, .hero-copy > *", { y: 20, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, delay: 0.55 });
      gsap.from(".cabinet .cab", { y: 30, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.3 });
      gsap.from(".cabinet .seal", { rotate: -90, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.7 });
      gsap.from(".hist-title > *", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.1 });
      gsap.from(".hist-card", { y: 30, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.3 });
      gsap.from(".page-title > *", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.1 });
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
        if (k === "form-name" || k === "bot-field" || !String(v).trim()) continue;
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
      if (data.get("bot-field")) return;
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
