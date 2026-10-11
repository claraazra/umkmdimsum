"use strict";
(() => {
  const header = document.querySelector(".header");
  const nav = document.querySelector("#navigation");
  const toggle = document.querySelector(".nav-toggle");
  const toggleLabel = toggle.querySelector(".toggle-label");
  const desktopNav = document.querySelector(".desktop-nav");
  const thumb = desktopNav.querySelector(".nav-thumb");
  const dock = document.querySelector(".mobile-dock");
  const dockThumb = dock.querySelector(".dock-thumb");
  const links = [...document.querySelectorAll("[data-nav]")];
  const sections = [...document.querySelectorAll("main>section[id]")];
  const GROUP = { cara: "menu", galeri: "kedai", faq: "kontak" };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let active = "home", lastY = scrollY, ticking = false;
  function placeThumb(link) {
    if (!link || !link.offsetWidth) {
      thumb.classList.remove("ready");
      return;
    }
    thumb.style.setProperty("--x", link.offsetLeft + "px");
    thumb.style.setProperty("--w", link.offsetWidth + "px");
    thumb.classList.add("ready");
  }
  const currentDesktop = () => desktopNav.querySelector("[aria-current]");
  desktopNav.addEventListener("pointerover", (e) => {
    const a = e.target.closest("a");
    if (a) placeThumb(a);
  });
  desktopNav.addEventListener("pointerleave", () => placeThumb(currentDesktop()));
  desktopNav.addEventListener("focusin", (e) => {
    const a = e.target.closest("a");
    if (a) placeThumb(a);
  });
  desktopNav.addEventListener("focusout", () => placeThumb(currentDesktop()));
  function placeDock() {
    const a = dock.querySelector("[aria-current]");
    if (!a || !a.offsetWidth) {
      dockThumb.classList.remove("ready");
      return;
    }
    dockThumb.style.setProperty("--x", a.offsetLeft + "px");
    dockThumb.style.setProperty("--w", a.offsetWidth + "px");
    dockThumb.classList.add("ready");
  }
  function update() {
    ticking = false;
    const y = scrollY, max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    header.style.setProperty("--p", Math.min(1, y / max).toFixed(4));
    header.classList.toggle("is-scrolled", y > 40);
    let id = "home";
    for (const section of sections) if (section.getBoundingClientRect().top <= innerHeight * 0.38) id = section.id;
    if (y + innerHeight >= document.documentElement.scrollHeight - 6) id = "kontak";
    id = GROUP[id] || id;
    if (id !== active) {
      active = id;
      for (const link of links) link.dataset.nav === id ? link.setAttribute("aria-current", "location") : link.removeAttribute("aria-current");
      placeThumb(currentDesktop());
      placeDock();
    }
    const dy = y - lastY;
    if (!document.body.classList.contains("opening") && !nav.classList.contains("open")) {
      if (y < 180 || dy < -6 || header.matches(":focus-within")) header.classList.remove("is-hidden");
      else if (dy > 8) header.classList.add("is-hidden");
    }
    if (Math.abs(dy) > 6) lastY = y;
  }
  addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    toggleLabel.textContent = open ? "Tutup" : "Menu";
    nav.classList.toggle("open", open);
    nav.inert = !open;
    header.classList.toggle("menu-open", open);
    setScrollLock("menu", open);
    if (open) {
      header.classList.remove("is-hidden");
      nav.querySelector("a").focus({ preventScroll: true });
    }
  }
  nav.inert = true;
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (!nav.classList.contains("open")) return;
    if (e.key === "Escape") {
      setMenu(false);
      toggle.focus();
      return;
    }
    if (e.key === "Tab") {
      const items = [toggle, ...nav.querySelectorAll("a")], first = items[0], last = items.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  addEventListener("resize", () => {
    if (innerWidth > 760 && nav.classList.contains("open")) setMenu(false);
    placeThumb(currentDesktop());
    placeDock();
    update();
  });
  document.fonts?.ready.then(() => {
    placeThumb(currentDesktop());
    placeDock();
  });
  update();
  requestAnimationFrame(() => {
    placeThumb(currentDesktop());
    placeDock();
  });
})();
