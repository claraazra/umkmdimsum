"use strict";
/* Pojok Raja Dimsum - polish.js
   Animasi tambahan: scroll halus, kursor, tombol ke atas, partikel hero,
   konfeti, kartu bergantian, cahaya kursor, dan roll-text di navbar. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover:hover) and (pointer:fine)");
  const root = document.documentElement;
  const opening = () => document.body.classList.contains("opening");
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* ---------- 1. Teks navbar berputar saat hover ---------- */
  $$(".desktop-nav a").forEach((a) => {
    const label = a.textContent.trim();
    a.textContent = "";
    const roll = document.createElement("span");
    roll.className = "roll";
    const one = document.createElement("span");
    const two = document.createElement("span");
    one.textContent = two.textContent = label;
    two.setAttribute("aria-hidden", "true");
    roll.append(one, two);
    a.append(roll);
  });
  // ukuran link berubah sedikit setelah dibungkus: minta navigation.js menghitung ulang
  requestAnimationFrame(() => dispatchEvent(new Event("resize")));

  /* ---------- 2. Scroll anchor yang halus dan bisa dibatalkan ---------- */
  let scrollRun = 0;
  function scrollToY(target, duration) {
    const from = scrollY, dist = target - from;
    if (Math.abs(dist) < 2) return;
    const run = ++scrollRun;
    const start = performance.now();
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const cancel = () => { scrollRun++; };
    ["wheel", "touchstart", "keydown"].forEach((t) => addEventListener(t, cancel, { once: true, passive: true }));
    const step = (now) => {
      if (run !== scrollRun) { root.style.scrollBehavior = prev; return; }
      const t = Math.min(1, (now - start) / duration);
      scrollTo(0, from + dist * easeInOut(t));
      if (t < 1) requestAnimationFrame(step);
      else root.style.scrollBehavior = prev;
    };
    requestAnimationFrame(step);
  }
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.closest("dialog") || reduce.matches) return;
    const id = a.getAttribute("href").slice(1);
    const el = id ? document.getElementById(id) : document.body;
    if (!el) return;
    e.preventDefault();
    const offset = id === "home" || !id ? 0 : parseFloat(getComputedStyle(root).scrollPaddingTop) || 100;
    const y = id === "home" || !id ? 0 : el.getBoundingClientRect().top + scrollY - offset + 2;
    const max = root.scrollHeight - innerHeight;
    const target = Math.max(0, Math.min(max, y));
    scrollToY(target, Math.min(1500, Math.max(650, Math.abs(target - scrollY) * 0.32)));
    try { history.pushState(null, "", id ? "#" + id : location.pathname); } catch (err) { /* abaikan */ }
  });

  /* ---------- 3. Bar progres bacaan + tombol ke atas ---------- */
  const pageBar = document.createElement("i");
  pageBar.className = "page-progress";
  pageBar.setAttribute("aria-hidden", "true");
  document.body.append(pageBar);

  const toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Kembali ke atas");
  toTop.innerHTML = '<svg class="tt-ring" viewBox="0 0 56 56" aria-hidden="true"><circle class="tt-bg" cx="28" cy="28" r="26"/><circle class="tt-fg" cx="28" cy="28" r="26" pathLength="100"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.append(toTop);
  const ttFg = $(".tt-fg", toTop);
  toTop.addEventListener("click", () => {
    if (reduce.matches) scrollTo(0, 0);
    else scrollToY(0, Math.min(1500, Math.max(700, scrollY * 0.25)));
  });
  let barPending = false;
  function updateBars() {
    barPending = false;
    const max = Math.max(1, root.scrollHeight - innerHeight);
    const p = Math.min(1, scrollY / max);
    pageBar.style.setProperty("--pp", p.toFixed(4));
    ttFg.style.strokeDashoffset = (100 - p * 100).toFixed(2);
    toTop.classList.toggle("show", scrollY > 700 && !opening());
  }
  addEventListener("scroll", () => {
    if (!barPending) { barPending = true; requestAnimationFrame(updateBars); }
  }, { passive: true });
  addEventListener("resize", updateBars);
  updateBars();

  /* ---------- 4. Partikel melayang di hero ---------- */
  const hero = $("#home");
  if (hero && !reduce.matches) {
    const bits = document.createElement("div");
    bits.className = "hero-bits";
    bits.setAttribute("aria-hidden", "true");
    const glyphs = ["✳", "●", "✳", "✦"];
    const colors = ["#fa341936", "#ffa90055", "#ffdb4c99", "#35261e1f"];
    const count = innerWidth < 700 ? 9 : 16;
    for (let i = 0; i < count; i++) {
      const b = document.createElement("i");
      b.textContent = glyphs[i % glyphs.length];
      b.style.left = (Math.random() * 100).toFixed(1) + "%";
      b.style.setProperty("--s", (12 + Math.random() * 26).toFixed(0) + "px");
      b.style.setProperty("--d", (9 + Math.random() * 9).toFixed(1) + "s");
      b.style.setProperty("--delay", (-Math.random() * 14).toFixed(1) + "s");
      b.style.setProperty("--x", ((Math.random() - 0.5) * 120).toFixed(0) + "px");
      b.style.setProperty("--c", colors[i % colors.length]);
      bits.append(b);
    }
    hero.prepend(bits);
    // jeda animasi saat hero keluar layar supaya hemat baterai
    new IntersectionObserver(([en]) => bits.style.setProperty("--play", en.isIntersecting ? "running" : "paused")).observe(hero);
  }

  /* ---------- 5. Konfeti saat menekan tombol Tambah ---------- */
  function burst(x, y) {
    if (reduce.matches) return;
    const colors = ["#fa3419", "#ffdb4c", "#ffa900", "#35261e", "#fff6e8"];
    for (let i = 0; i < 14; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      c.style.left = x + "px";
      c.style.top = y + "px";
      c.style.background = colors[i % colors.length];
      if (i % 3 === 0) c.style.borderRadius = "50%";
      document.body.append(c);
      const ang = (Math.PI * 2 * i) / 14 + Math.random() * 0.5;
      const dist = 36 + Math.random() * 56;
      const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 20;
      c.animate([
        { transform: "translate(-50%,-50%) scale(1) rotate(0)", opacity: 1 },
        { transform: `translate(${dx}px,${dy}px) scale(.9) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.6 },
        { transform: `translate(${dx * 1.1}px,${dy + 34}px) scale(.3) rotate(${Math.random() * 540}deg)`, opacity: 0 }
      ], { duration: 650 + Math.random() * 250, easing: "cubic-bezier(.2,.7,.3,1)" }).finished.then(() => c.remove()).catch(() => c.remove());
    }
  }
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (!add) return;
    const r = add.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
  }, true);

  /* ---------- 6. Kartu menu, minuman, ulasan masuk bergantian ---------- */
  const popObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      popObserver.unobserve(en.target);
      en.target.classList.add("pop-in");
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
  function prepCards(container) {
    if (reduce.matches) return;
    const fresh = $$(".product:not(.pop-ready)", container);
    fresh.forEach((card, i) => {
      card.style.setProperty("--stagger", i % 4);
      card.classList.add("pop-ready");
      popObserver.observe(card);
    });
  }
  ["#product-grid", "#drink-grid"].forEach((sel) => {
    const grid = $(sel);
    if (!grid) return;
    prepCards(grid);
    new MutationObserver(() => prepCards(grid)).observe(grid, { childList: true });
  });

  /* ---------- 7. Foto "Kedai" terbuka seperti tirai ---------- */
  const wipeObserver = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); wipeObserver.unobserve(en.target); }
  }), { threshold: 0.2 });
  $$(".photo-card").forEach((el) => wipeObserver.observe(el));

  /* ---------- 8. Cahaya mengikuti kursor di kartu ---------- */
  if (fine.matches && !reduce.matches) {
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest?.(".product, .rev-card, .how-steps li");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left).toFixed(0) + "px");
      el.style.setProperty("--my", (e.clientY - r.top).toFixed(0) + "px");
    }, { passive: true });
  }

  /* ---------- 9. Kursor kustom (khusus mouse) ---------- */
  if (fine.matches && !reduce.matches) {
    const ring = document.createElement("div");
    const dot = document.createElement("div");
    ring.className = "cursor";
    dot.className = "cursor-dot";
    ring.setAttribute("aria-hidden", "true");
    dot.setAttribute("aria-hidden", "true");
    document.body.append(ring, dot);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, shown = false, raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0)`;
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; rx = mx; ry = my; ring.classList.add("on"); dot.classList.add("on"); }
      const t = e.target.closest?.("a, button, summary, input, select, textarea, label, [data-lightbox], .product-art, video");
      ring.classList.toggle("hot", !!t);
      const lb = e.target.closest?.("[data-lightbox]");
      const vid = e.target.closest?.(".vitem");
      ring.dataset.label = lb ? "LIHAT" : vid ? "PUTAR" : "";
      ring.classList.toggle("label", !!(lb || vid));
      dot.style.opacity = lb || vid ? 0 : "";
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener("pointerdown", () => ring.classList.add("down"));
    document.addEventListener("pointerup", () => ring.classList.remove("down"));
    document.documentElement.addEventListener("pointerleave", () => { shown = false; ring.classList.remove("on"); dot.classList.remove("on"); });
  }

  /* ---------- 10. Bump jumlah keranjang di navbar ---------- */
  const count = $("#nav-cart-count");
  if (count) {
    let last = count.textContent;
    new MutationObserver(() => {
      if (count.textContent === last) return;
      last = count.textContent;
      if (!reduce.matches) count.animate([{ transform: "scale(1)" }, { transform: "scale(1.6)" }, { transform: "scale(1)" }], { duration: 420, easing: "cubic-bezier(.34,1.45,.5,1)" });
    }).observe(count, { childList: true, characterData: true, subtree: true });
  }
})();
