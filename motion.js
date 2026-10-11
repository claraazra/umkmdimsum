(() => {
  const root = document.documentElement;
  const curtain = document.querySelector(".splash");
  const skip = document.querySelector(".skip-intro");
  const replay = document.querySelector(".replay-intro");
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let running = [], generation = 0;
  const entrance = ".header, .title-letter, .hero-piece, .hero-sticker-left, .hero-sticker-right, .hero-bottom, .spark, .scroll-hint, .replay-intro";
  const move = (element, frames, delay, duration, easing = "cubic-bezier(.22,1,.36,1)") => {
    const animation = element.animate(frames, { delay, duration, easing, fill: "both" });
    running.push(animation);
    return animation;
  };
  const heroVideo = document.getElementById("hero-video");
  const heroFallback = document.querySelector(".hero-fallback");
  const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent);
  function useStill() {
    if (heroVideo) {
      heroVideo.hidden = true;
      heroVideo.classList.remove("hero-piece", "hero-whole");
    }
    if (heroFallback) {
      heroFallback.hidden = false;
      heroFallback.classList.add("hero-piece", "hero-whole");
    }
  }
  if (!heroVideo || isSafari) useStill();
  else heroVideo.addEventListener("error", useStill, true);
  const endFrame = () => {
    if (heroVideo && heroVideo.duration) heroVideo.currentTime = Math.max(0, heroVideo.duration - 0.05);
  };
  function startHeroVideo(delay, token) {
    if (!heroVideo || heroVideo.hidden) return;
    heroVideo.pause();
    try {
      heroVideo.currentTime = 0;
    } catch (e) {
    }
    setTimeout(() => {
      if (token === generation) heroVideo.play().catch(endFrame);
    }, delay);
  }
  if (heroVideo) {
    heroVideo.addEventListener("loadedmetadata", () => {
      if (preference.matches) endFrame();
    });
    let hidden = false;
    new IntersectionObserver(([entry]) => {
      if (document.body.classList.contains("opening") || preference.matches || heroVideo.hidden) return;
      if (!entry.isIntersecting) {
        hidden = true;
        return;
      }
      if (hidden && entry.intersectionRatio > 0.5 && heroVideo.ended) {
        hidden = false;
        heroVideo.currentTime = 0;
        heroVideo.play().catch(() => {
        });
      }
    }, { threshold: [0, 0.5] }).observe(document.getElementById("home"));
  }
  const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "End", "Home", " "];
  function skipOnScroll(event) {
    if (event.type === "keydown" && !scrollKeys.includes(event.key)) return;
    finish();
    playHeroNow();
  }
  const interrupts = ["wheel", "touchmove", "keydown"];

  function finish() {
    interrupts.forEach((type) => removeEventListener(type, skipOnScroll));
    generation++;
    running.forEach((animation) => animation.cancel());
    running = [];
    clearTimeout(window.motionFallback);
    root.classList.remove("motion-pending");
    document.body.classList.remove("opening");
    document.querySelector("main").inert = false;
    document.querySelector(".header").inert = false;
    curtain.hidden = true;
    if (wipe) wipe.hidden = true;
    skip.hidden = true;
    document.querySelector(".food-float").style.animationPlayState = "running";
  }
  // Waktu minimum supaya animasi loading terasa utuh, dan batas tunggu terlama bila koneksi lambat.
  const MIN_LOAD = 1900, MAX_LOAD = 7500;
  // Jeda antara 100% dan tirai terangkat. Semua animasi pembuka dijadwalkan relatif ke momen 100%.
  const lag = 350 - 1800;
  const splashParts = {
    icon: curtain.querySelector(".app-icon"),
    tile: curtain.querySelector(".icon-tile"),
    percent: curtain.querySelector(".splash-percent"),
    status: curtain.querySelector(".splash-status"),
    steps: curtain.querySelector(".splash-steps"),
    foot: curtain.querySelector(".splash-foot")
  };
  const ring = curtain.querySelector(".ring-fill");
  const wipe = document.querySelector(".splash-wipe");
  const percentText = splashParts.percent.querySelector("b");
  const stepItems = [...splashParts.steps.children];
  const stages = [
    { from: 0, text: "Menyiapkan adonan..." },
    { from: 34, text: "Meracik isian..." },
    { from: 67, text: "Mengukus dimsum..." },
    { from: 100, text: "Siap bikin nagih!" }
  ];
  // Kurva waktu: cepat di awal, tertahan sebentar di tengah, lalu ngebut ke 100.
  const curve = (t) => {
    const points = [[0, 0], [.25, .38], [.6, .66], [.78, .72], [1, 1]];
    for (let i = 1; i < points.length; i++) {
      if (t <= points[i][0]) {
        const [t0, v0] = points[i - 1], [t1, v1] = points[i];
        return v0 + (v1 - v0) * (t - t0) / (t1 - t0);
      }
    }
    return 1;
  };
  const bar = curtain.querySelector(".splash-bar b");
  function renderProgress(value, stage) {
    ring.style.strokeDashoffset = 100 - value;
    if (bar) bar.style.transform = `scaleX(${value / 100})`;
    percentText.textContent = value;
    stepItems.forEach((item, i) => {
      const done = value >= stages[i + 1].from;
      item.classList.toggle("is-done", done);
      item.classList.toggle("is-active", !done && value >= stages[i].from);
    });
    if (stage !== undefined) {
      splashParts.status.textContent = stages[stage].text;
      splashParts.status.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 260 });
    }
  }
  function resetSplash() {
    curtain.classList.remove("is-ready");
    renderProgress(0, 0);
  }
  // Pelacak pemuatan aset asli: gambar penting + video hero. Nilainya 0..1.
  function trackAssets() {
    const items = [];
    const watchImage = (src, weight) => {
      const item = { weight, value: 0 };
      items.push(item);
      const img = new Image();
      const done = () => { item.value = 1; };
      img.onload = img.onerror = done;
      img.src = src;
      if (img.complete) done();
    };
    ["assets/logo.webp", "assets/menu-2.webp", "assets/dimsum-last.webp", "assets/middle.webp", "assets/store.webp"].forEach((src) => watchImage(src, 1));
    if (heroVideo && !heroVideo.hidden) {
      const item = { weight: 4, value: 0 };
      items.push(item);
      const update = () => {
        if (heroVideo.readyState >= 3) { item.value = 1; return; }
        const d = heroVideo.duration;
        if (d && heroVideo.buffered.length) item.value = Math.max(item.value, Math.min(1, heroVideo.buffered.end(heroVideo.buffered.length - 1) / d));
      };
      ["progress", "loadeddata", "canplay", "canplaythrough", "durationchange"].forEach((type) => heroVideo.addEventListener(type, update));
      ["error", "stalled", "abort"].forEach((type) => heroVideo.addEventListener(type, () => { if (type === "error") item.value = 1; }));
      update();
    }
    const fonts = { weight: 1, value: 0 };
    items.push(fonts);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { fonts.value = 1; });
    return () => {
      const total = items.reduce((sum, item) => sum + item.weight, 0);
      return items.reduce((sum, item) => sum + item.weight * item.value, 0) / total;
    };
  }
  // Menjalankan progres yang mengikuti pemuatan asli. Promise selesai saat 100% tercapai.
  function runProgress(token) {
    const readAssets = trackAssets();
    const start = performance.now();
    let stage = 0, shown = 0;
    return new Promise((resolve) => {
      const frame = (now) => {
        if (token !== generation) return resolve(false);
        const elapsed = now - start;
        const t = Math.min(1, elapsed / MIN_LOAD);
        const real = readAssets();
        const forced = elapsed >= MAX_LOAD;
        // Batas atas: kurva waktu (agar tidak melompat) dan aset asli (agar tidak bohong).
        // Sebelum aset selesai, angka mentok di 94% supaya tidak terlihat macet di 100%.
        const ceiling = forced ? 1 : Math.min(curve(t), real >= 1 ? 1 : Math.min(0.94, real * 0.94 + 0.04));
        const target = Math.round(ceiling * 100);
        shown = shown + Math.max(0, Math.min(target - shown, Math.max(1, (target - shown) * 0.2)));
        const value = Math.min(100, Math.round(shown));
        const next = stages.reduce((found, item, i) => value >= item.from ? i : found, 0);
        renderProgress(value, next !== stage ? next : undefined);
        stage = next;
        if (value < 100) requestAnimationFrame(frame);
        else {
          curtain.classList.add("is-ready");
          resolve(true);
        }
      };
      requestAnimationFrame(frame);
    });
  }
  async function play() {
    finish();
    if (preference.matches) return;
    const current = generation;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.classList.add("opening");
    interrupts.forEach((type) => addEventListener(type, skipOnScroll, { passive: true }));
    document.querySelector("main").inert = true;
    document.querySelector(".header").inert = true;
    root.classList.add("motion-pending");
    curtain.hidden = false;
    skip.hidden = false;
    document.querySelector(".food-float").style.animationPlayState = "paused";
    const failSafe = setTimeout(finish, MAX_LOAD + 7000);
    window.motionFallback = failSafe;
    // Splash tampil duluan; foto hero didecode di belakang layar selama loading berjalan.
    const decodeImage = (img) => img.decode ? img.decode().catch(() => {}) : Promise.resolve();
    document.querySelectorAll(".hero-piece").forEach(decodeImage);
    await Promise.race([decodeImage(document.querySelector(".splash-photo")), new Promise((resolve) => setTimeout(resolve, 600))]);
    if (current !== generation) return;
    root.classList.remove("motion-pending");
    resetSplash();
    const spring = "cubic-bezier(.34,1.45,.5,1)";
    move(splashParts.icon, [{ opacity: 0, transform: "scale(.55) rotate(-10deg)" }, { opacity: 1, transform: "scale(1) rotate(0)" }], 0, 700, spring);
    [splashParts.percent, splashParts.status, splashParts.steps, splashParts.foot].forEach((element, index) => {
      move(element, [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }], 150 + index * 90, 500);
    });
    const loaded = await runProgress(current);
    if (current !== generation || !loaded) return;
    move(splashParts.tile, [{ scale: 1 }, { scale: 1.12 }, { scale: 1 }], 0, 450, spring);
    move(curtain.querySelector(".splash-center"), [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.9) translateY(-14px)" }], 230, 260, "ease-in");
    const lift = "cubic-bezier(.76,0,.24,1)";
    if (wipe) {
      wipe.hidden = false;
      move(wipe, [{ transform: "translateY(0)", borderRadius: "0 0 0 0" }, { transform: "translateY(-118%)", borderRadius: "0 0 50% 50%" }], lag + 1800 + 130, 1000, lift);
    }
    move(curtain, [{ transform: "translateY(0)", borderRadius: "0 0 0 0" }, { transform: "translateY(-115%)", borderRadius: "0 0 50% 50%" }], lag + 1800, 1000, lift);
    move(skip, [{ opacity: 1 }, { opacity: 0 }], lag + 1800, 250);
    move(document.querySelector(".header"), [{ opacity: 0, transform: "translateY(-60px)" }, { opacity: 1, transform: "translateY(0)" }], lag + 2350, 700);
    document.querySelectorAll(".title-letter").forEach((letter, index) => {
      move(letter, [{ opacity: 0, transform: "translateY(115%) rotate(12deg) scale(.6)" }, { opacity: 1, transform: "translateY(-5%) rotate(-2deg) scale(1.04)", offset: 0.78 }, { opacity: 1, transform: "translateY(0) rotate(0) scale(1)" }], lag + 2350 + index * 65, 850);
    });
    move(document.querySelector(".hero-whole"), [{ opacity: 0 }, { opacity: 1 }], lag + 2650, 450, "ease-out");
    startHeroVideo(lag + 2650, current);
    document.querySelectorAll(".hero-sticker-left,.hero-sticker-right,.spark").forEach((element, index) => {
      const end = getComputedStyle(element).transform;
      move(element, [{ opacity: 0, transform: "scale(0) rotate(-35deg)" }, { opacity: 1, transform: "scale(1.18) rotate(5deg)", offset: 0.7 }, { opacity: 1, transform: end === "none" ? "none" : end }], lag + 3600 + index * 100, 650);
    });
    move(document.querySelector(".hero-bottom"), [{ opacity: 0, transform: "translateY(120px)" }, { opacity: 1, transform: "translateY(0)" }], lag + 3850, 800);
    document.querySelectorAll(".scroll-hint,.replay-intro").forEach((element) => move(element, [{ opacity: 0 }, { opacity: 1 }], lag + 4200, 400));
    await Promise.allSettled(running.map((animation) => animation.finished));
    if (current === generation) finish();
  }
  const playHeroNow = () => {
    if (heroVideo && !heroVideo.hidden && !preference.matches) {
      try {
        heroVideo.currentTime = 0;
      } catch (e) {
      }
      heroVideo.play().catch(endFrame);
    }
  };
  skip.addEventListener("click", () => {
    finish();
    playHeroNow();
    replay.focus();
  });
  replay.addEventListener("click", () => {
    play();
    skip.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("opening")) {
      finish();
      playHeroNow();
      replay.focus();
    }
  });
  preference.addEventListener("change", () => {
    if (preference.matches) finish();
  });
  let pending = false;
  function scrollMotion() {
    pending = false;
    if (preference.matches || document.body.classList.contains("opening")) return;
    const distance = Math.min(scrollY, 900);
    document.querySelector(".hero-title-wrap").style.translate = `0 ${distance * 0.16}px`;
    document.querySelector(".hero-sticker-left").style.translate = `${-distance * 0.08}px ${-distance * 0.05}px`;
    document.querySelector(".hero-sticker-right").style.translate = `${distance * 0.08}px ${-distance * 0.05}px`;
    const gallery = document.querySelector(".photo-gallery").getBoundingClientRect();
    if (gallery.top < innerHeight && gallery.bottom > 0) document.querySelectorAll(".photo-card").forEach((card, i) => {
      card.style.translate = `0 ${Math.max(-35, Math.min(35, (gallery.top - innerHeight * 0.45) * (i % 2 ? 0.07 : -0.05)))}px`;
    });
  }
  window.addEventListener("scroll", () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(scrollMotion);
    }
  }, { passive: true });
  play();
})();
