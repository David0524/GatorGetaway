/* 1899 Gator Getaway: menu, before/after slider, photo viewer, guest list form, copy buttons. */

/* Where guest-list sign-ups go.
   "netlify"  works with no setup when the site is hosted on Netlify (Netlify Forms).
   A URL      posts to any form service instead, e.g. "https://formspree.io/f/abcdwxyz".
   If sending fails, the form opens an email to Craig and Jenn with the details filled in. */
const FORM_ENDPOINT = "netlify";
const HOST_EMAILS = ["craig@1899gatorgetaway.com", "jenn@1899gatorgetaway.com"];

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile menu */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  /* Before / after slider */
  document.querySelectorAll("[data-compare]").forEach((box) => {
    const range = box.querySelector(".compare-range");
    const set = (pct) => {
      const v = Math.max(0, Math.min(100, pct));
      box.style.setProperty("--pos", v + "%");
      range.value = Math.round(v);
    };
    const fromEvent = (e) => {
      const r = box.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };
    let dragging = false;
    box.addEventListener("pointerdown", (e) => {
      dragging = true;
      box.setPointerCapture(e.pointerId);
      fromEvent(e);
      range.focus({ preventScroll: true });
    });
    box.addEventListener("pointermove", (e) => { if (dragging) fromEvent(e); });
    const stop = () => { dragging = false; };
    box.addEventListener("pointerup", stop);
    box.addEventListener("pointercancel", stop);
    range.addEventListener("input", () => set(Number(range.value)));

    /* One gentle sweep the first time the slider scrolls into view, so people see it moves. */
    if (!reduceMotion && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const frames = [[0, 50], [700, 22], [1500, 72], [2200, 50]];
        const start = performance.now();
        const step = (now) => {
          if (dragging) return;
          const t = now - start;
          let i = 0;
          while (i < frames.length - 2 && t > frames[i + 1][0]) i++;
          const [t0, v0] = frames[i];
          const [t1, v1] = frames[i + 1];
          const p = Math.min(1, (t - t0) / (t1 - t0));
          const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          set(v0 + (v1 - v0) * ease);
          if (t < frames[frames.length - 1][0]) requestAnimationFrame(step);
        };
        setTimeout(() => requestAnimationFrame(step), 400);
      }, { threshold: 0.6 });
      io.observe(box);
    }
  });

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
      dlg.showModal();
    }));
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

    const showError = (msg) => { errorBox.textContent = msg; errorBox.hidden = false; };

    const emailFallback = (data) => {
      const lines = [];
      for (const [k, v] of data.entries()) {
        if (k === "form-name" || k === "bot-field" || !String(v).trim()) continue;
        lines.push(k.replace(/_/g, " ") + ": " + v);
      }
      const subject = encodeURIComponent("Guest list: " + (data.get("name") || ""));
      const body = encodeURIComponent("Please add me to the 1899 Gator Getaway guest list.\n\n" + lines.join("\n"));
      window.location.href = "mailto:" + HOST_EMAILS.join(",") + "?subject=" + subject + "&body=" + body;
    };

    const showSuccess = (name) => {
      const first = (name || "").trim().split(/\s+/)[0];
      form.innerHTML =
        '<div class="form-success" role="status" tabindex="-1">' +
        "<h3>You're on the list" + (first ? ", " + first.replace(/[<>&"]/g, "") : "") + ".</h3>" +
        "<p>We'll email you when dates open and when there's progress to show. Watch for a note from " +
        HOST_EMAILS.join(" or ") + ".</p>" +
        '<p><a href="photos.html">See the photos while you wait</a></p></div>';
      const ok = form.querySelector(".form-success");
      ok.focus();
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
      button.textContent = "Joining...";

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
        button.textContent = "Join the guest list";
        showError("We couldn't send the form from here, so we've opened an email to Craig and Jenn with your details. Press send and you're on the list.");
        emailFallback(data);
      }
    });
  }
})();
