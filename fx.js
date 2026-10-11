"use strict";
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover:hover) and (pointer:fine)");
  const small = matchMedia("(max-width:760px)");
  function splitWords(node, counter) {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.append(" ");
            return;
          }
          const outer = document.createElement("span"), inner = document.createElement("i");
          outer.className = "w";
          outer.setAttribute("aria-hidden", "true");
          inner.textContent = part;
          inner.style.setProperty("--wi", counter.n++);
          outer.append(inner);
          frag.append(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.tagName !== "BR") splitWords(child, counter);
    });
  }
  const headings = $$("main h2");
  if (!reduce.matches) headings.forEach((h) => {
    h.setAttribute("aria-label", h.textContent.replace(/\s+/g, " ").trim());
    splitWords(h, { n: 0 });
    h.classList.add("split");
  });
  const revealer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealer.unobserve(entry.target);
    }
  }), { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal, h2.split").forEach((el) => revealer.observe(el));
  const heroFood = $(".hero-food"), layerWhole = $(".layer-whole"), layerSection = $(".layers-section");
  const notes = $$(".layer-notes>div"), photoImg = $(".photo-break>img"), expFood = $(".experience-food");
  let pending = false;
  function frame() {
    pending = false;
    if (reduce.matches) return;
    const y = scrollY;
    if (heroFood && !document.body.classList.contains("opening")) {
      heroFood.style.transform = `translateX(-50%) translateY(${Math.min(y * 0.13, 110)}px) rotate(${Math.min(y * 9e-3, 6)}deg)`;
    }
    if (layerSection && layerWhole) {
      const r = layerSection.getBoundingClientRect(), range = Math.max(1, layerSection.offsetHeight - innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / range)), mobile = innerWidth <= 600;
      layerWhole.style.transform = `translateY(${-p * (mobile ? 18 : 34)}px) rotate(${-4 + p * 8}deg) scale(${0.93 + p * 0.1})`;
      notes.forEach((n, i) => n.classList.toggle("on", small.matches || p > 0.04 + i * 0.24));
    }
    if (photoImg) {
      const r = photoImg.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) photoImg.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -0.1}px) scale(1.04)`;
    }
    if (expFood) {
      const r = expFood.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) expFood.style.translate = `${Math.sin(r.top / 180) * 14}px ${(r.top - innerHeight / 2) * -0.07}px`;
    }
  }
  addEventListener("scroll", () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(frame);
    }
  }, { passive: true });
  addEventListener("resize", frame);
  frame();
  const hero = $("#home"), assembly = $(".hero-assembly");
  if (hero && assembly && fine.matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      assembly.style.translate = `${(cx * 22).toFixed(2)}px ${(cy * 14).toFixed(2)}px`;
      assembly.style.rotate = `${(cx * 1.6).toFixed(2)}deg`;
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 2e-3) requestAnimationFrame(loop);
      else running = false;
    };
    hero.addEventListener("pointermove", (e) => {
      if (reduce.matches || document.body.classList.contains("opening")) return;
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width * 2 - 1;
      ty = (e.clientY - r.top) / r.height * 2 - 1;
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    });
    hero.addEventListener("pointerleave", () => {
      tx = 0;
      ty = 0;
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    });
  }
  if (fine.matches && !reduce.matches) {
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest?.(".button, .nav-cart, .cart-fab");
      $$(".magnet-on").forEach((m) => {
        if (m !== el) {
          m.style.translate = "";
          m.classList.remove("magnet-on");
        }
      });
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.classList.add("magnet-on");
      el.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`;
    }, { passive: true });
  }
  const rows = $$(".ticker-row");
  if (rows.length && !reduce.matches) {
    const items = rows.map((row) => ({ track: $(".ticker-track", row), dir: Number(row.dataset.dir) || -1, x: 0, half: 0 }));
    const measure = () => items.forEach((it) => {
      it.half = it.track.scrollWidth / 2;
      if (it.dir > 0) it.x = -it.half;
    });
    measure();
    addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    let last = scrollY, boost = 0, running = true, prev = performance.now();
    const tick = (now) => {
      const dt = Math.min(48, now - prev);
      prev = now;
      const vy = scrollY - last;
      last = scrollY;
      boost += (Math.min(Math.abs(vy), 80) * 0.09 - boost) * 0.12;
      items.forEach((it) => {
        if (!it.half) return;
        it.x += it.dir * (0.05 + boost * 0.28) * dt * 1;
        if (it.dir < 0 && it.x <= -it.half) it.x += it.half;
        if (it.dir > 0 && it.x >= 0) it.x -= it.half;
        it.track.style.transform = `translate3d(${it.x.toFixed(1)}px,0,0)`;
      });
      if (running) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    new IntersectionObserver(([en]) => {
      const was = running;
      running = en.isIntersecting;
      if (running && !was) {
        prev = performance.now();
        requestAnimationFrame(tick);
      }
    }).observe($(".ticker"));
  }
  const faq = $$(".faq-list details");
  faq.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) faq.forEach((o) => {
      if (o !== d) o.open = false;
    });
  }));
})();
