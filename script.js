"use strict";
document.documentElement.classList.add("js");
const PHONE = "62882017580214";
const products = [
  {
    id: "ayam-4",
    name: "Dimsum Premium Ayam Isi 4",
    detail: "Lembut dan gurih. Pilihan original untuk teman ngemil.",
    price: 15000,
    portion: "4 pcs",
    category: "original",
    image: "menu-1",
    tag: "ORIGINAL"
  },
  {
    id: "ayam-mentai-4",
    name: "Dimsum Premium Ayam Isi 4 Mentai",
    detail: "Saus mentai creamy dengan sentuhan panggang.",
    price: 15000,
    portion: "4 pcs",
    category: "mentai",
    image: "menu-2",
    tag: "MELTY MENTAI"
  },
  {
    id: "ayam-mentai-6",
    name: "Dimsum Premium Ayam Mentai Isi 6",
    detail: "Mentai melimpah dalam porsi untuk berbagi.",
    price: 22000,
    portion: "6 pcs",
    category: "mentai",
    image: "menu-3",
    tag: "MELTY MENTAI"
  },
  {
    id: "ayam-6",
    name: "Dimsum Premium Ayam Isi 6",
    detail: "Porsi lebih besar untuk dinikmati bersama.",
    price: 22000,
    portion: "6 pcs",
    category: "original",
    image: "menu-4",
    tag: "ORIGINAL"
  },
  {
    id: "udang",
    name: "Udang Premium Isi 3",
    detail: "Pilihan udang premium dengan rasa gurih.",
    price: 15000,
    portion: "3 pcs",
    category: "original",
    image: "menu-5",
    tag: "ORIGINAL"
  },
  {
    id: "udang-mentai",
    name: "Udang Premium Mentai Isi 3",
    detail: "Udang premium bertemu saus mentai panggang.",
    price: 15000,
    portion: "3 pcs",
    category: "mentai",
    image: "menu-6",
    tag: "MELTY MENTAI"
  },
  {
    id: "laut",
    name: "Dimsum Rumput Laut Isi 3",
    detail: "Gurih dimsum dengan balutan rumput laut.",
    price: 15000,
    portion: "3 pcs",
    category: "original",
    image: "menu-7",
    tag: "ORIGINAL"
  },
  {
    id: "laut-mentai",
    name: "Dimsum Rumput Laut Mentai Isi 3",
    detail: "Rumput laut dan mentai dalam satu gigitan.",
    price: 15000,
    portion: "3 pcs",
    category: "mentai",
    image: "menu-8",
    tag: "MELTY MENTAI"
  },
  {
    id: "ultah-17",
    name: "Dimsum Ultah Isi 17",
    detail: "Rayakan hari spesial dengan dimsum untuk berbagi.",
    price: null,
    portion: "17 pcs",
    category: "celebration",
    image: "menu-9",
    tag: "MOMEN SPESIAL"
  },
  {
    id: "bouquet-15",
    name: "Golden Birthday Dim Sum Mentai Bouquet Isi 15",
    detail: "Buket mentai untuk kejutan ulang tahun yang berkesan.",
    price: null,
    portion: "15 pcs",
    category: "celebration",
    image: "menu-10",
    tag: "MOMEN SPESIAL"
  },
  {
    id: "ultah-7",
    name: "Dimsum Ulang Tahun Isi 7",
    detail: "Hadiah kecil untuk momen yang berarti.",
    price: null,
    portion: "7 pcs",
    category: "celebration",
    image: "menu-11",
    tag: "MOMEN SPESIAL"
  }
];
const drinks = [
  {
    id: "mangga-kocok",
    name: "Mangga Kocok",
    detail: "Potongan mangga manis dikocok creamy, lalu disiram saus mangga dan topping mangga segar.",
    parts: ["Mangga", "Susu creamy", "Saus mangga"],
    price: 6000,
    portion: "1 gelas",
    image: "drink-mangga-kocok",
    thumb: "drink-mangga-kocok-s",
    w: 664,
    h: 1000,
    theme: { bg: "#ff9a1f", fg: "#35261e", btnBg: "#35261e", btnFg: "#fff6e8", halo: "rgba(255,255,255,.26)" }
  },
  {
    id: "durian-kocok",
    name: "Durian Kocok",
    detail: "Daging durian yang lembut, dingin, dan creamy. Disiram saus manis kuning di atasnya.",
    parts: ["Durian", "Susu creamy", "Saus manis"],
    price: 6000,
    portion: "1 gelas",
    image: "drink-durian-kocok",
    thumb: "drink-durian-kocok-s",
    w: 880,
    h: 1000,
    theme: { bg: "#ffd23f", fg: "#35261e", btnBg: "#35261e", btnFg: "#fff6e8", halo: "rgba(255,255,255,.34)" }
  },
  {
    id: "alpukat-kocok",
    name: "Alpukat Kocok",
    detail: "Alpukat creamy dengan lelehan saus cokelat, whipped cream, dan taburan kacang renyah.",
    parts: ["Alpukat", "Saus cokelat", "Topping kacang"],
    price: 6000,
    portion: "1 gelas",
    image: "drink-alpukat-kocok",
    thumb: "drink-alpukat-kocok-s",
    w: 670,
    h: 1000,
    theme: { bg: "#5a3321", fg: "#fff1de", btnBg: "#fff1de", btnFg: "#35261e", halo: "rgba(255,255,255,.12)" }
  },
  {
    id: "es-teller",
    name: "Es Teller",
    detail: "Alpukat, nangka, dan kelapa dalam kuah susu yang dingin, ditutup es krim dan susu kental manis.",
    parts: ["Alpukat", "Nangka", "Kelapa", "Es krim"],
    price: 6000,
    portion: "1 gelas",
    image: "drink-es-teller",
    thumb: "drink-es-teller-s",
    w: 682,
    h: 1000,
    theme: { bg: "#1d7a58", fg: "#fff4e2", btnBg: "#fff4e2", btnFg: "#35261e", halo: "rgba(255,255,255,.13)" }
  },
  {
    id: "es-teh",
    name: "Es Teh",
    detail: "Teh dingin ukuran jumbo dengan es batu dan irisan lemon. Pelepas dahaga paling pas setelah dimsum hangat.",
    parts: ["Jumbo", "Teh", "Es batu", "Lemon"],
    price: 3000,
    portion: "1 gelas jumbo",
    image: "drink-es-teh",
    thumb: "drink-es-teh-s",
    w: 676,
    h: 1000,
    theme: { bg: "#d92a12", fg: "#fff4e2", btnBg: "#fff4e2", btnFg: "#35261e", halo: "rgba(255,255,255,.14)" }
  }
];
// Kunci scroll dipegang per "alasan", jadi menutup satu panel
// tidak ikut membuka kunci panel lain yang masih terbuka.
const scrollLocks = new Set();
function setScrollLock(reason, locked) {
  if (locked) scrollLocks.add(reason);
  else scrollLocks.delete(reason);
  document.body.classList.toggle("locked", scrollLocks.size > 0);
}
addEventListener("pageshow", (event) => {
  if (event.persisted) {
    scrollLocks.clear();
    document.body.classList.remove("locked");
  }
});

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(hover:hover) and (pointer:fine)");
const plusIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
products.forEach((p) => {
  p.filling = p.id.startsWith("ayam") ? "ayam" : p.id.startsWith("udang") ? "udang" : p.id.startsWith("laut") ? "laut" : null;
});
const byId = new Map([...products, ...drinks].map((p) => [p.id, p]));
const state = { category: "all", filling: "all" };
const grid = $("#product-grid");
const cart = /* @__PURE__ */ new Map();
try {
  const saved = JSON.parse(localStorage.getItem("pojok-raja-cart") || "[]");
  if (Array.isArray(saved)) saved.forEach(([id, qty]) => {
    const p = byId.get(id);
    if (p && p.price !== null && Number.isInteger(qty) && qty > 0 && qty <= 99) cart.set(id, qty);
  });
} catch {
}
function buyControl(p) {
  if (p.price === null) {
    const inquiry = `https://wa.me/${PHONE}?text=${encodeURIComponent("Halo Pojok Raja Dimsum, saya ingin tanya harga dan pemesanan " + p.name + ".")}`;
    return `<a class="inquiry-button" href="${inquiry}" target="_blank" rel="noopener" aria-label="Tanya harga ${p.name}">Chat \u2197</a>`;
  }
  const qty = cart.get(p.id) || 0;
  if (!qty) return `<button type="button" class="add-button" data-add="${p.id}" aria-label="Tambah ${p.name}"><span>Tambah</span>${plusIcon}</button>`;
  return `<div class="stepper" role="group" aria-label="Jumlah ${p.name}"><button type="button" data-step="-1" data-id="${p.id}" aria-label="Kurangi ${p.name}">\u2212</button><output aria-live="polite">${qty}</output><button type="button" data-step="1" data-id="${p.id}" aria-label="Tambah ${p.name}">+</button></div>`;
}
function cardHTML(p, index) {
  const priceBlock = p.price === null ? `<span class="price price-inquiry">Tanya harga<small>Sesuai pesanan</small></span>` : `<span class="price">${money(p.price)}<small>per porsi \xB7 ${p.portion}</small></span>`;
  return `<article class="product product-${p.category}" data-id="${p.id}" style="--i:${Math.min(index, 5)}"><div class="product-art"><span class="product-tag">${p.tag}</span><span class="portion-badge">${p.portion}</span><img src="assets/${p.image}.webp" alt="${p.name}" width="850" height="850" loading="lazy"></div><div class="product-info"><h3>${p.name}</h3><p>${p.detail}</p><div class="product-bottom">${priceBlock}<div class="buy" data-buy="${p.id}">${buyControl(p)}</div></div></div></article>`;
}
const cardObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add("in");
    cardObserver.unobserve(entry.target);
  }
}), { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
function visibleProducts() {
  return products.filter((p) => {
    if (state.category !== "all" && p.category !== state.category) return false;
    if (state.filling !== "all" && state.category !== "celebration" && p.filling !== state.filling) return false;
    return true;
  });
}
function renderProducts() {
  const shown = visibleProducts();
  grid.innerHTML = shown.length ? shown.map(cardHTML).join("") : `<div class="menu-empty"><p>Belum ada menu untuk kombinasi ini.</p><button type="button" class="button small" data-reset-filters>Tampilkan semua</button></div>`;
  $$(".product", grid).forEach((card) => cardObserver.observe(card));
  const label = state.category === "all" ? "pilihan" : { mentai: "menu mentai", original: "menu original", celebration: "paket ulang tahun" }[state.category];
  $("#menu-count").textContent = `${shown.length} ${label} untuk kamu`;
  syncFilterUI();
}
function swapProducts() {
  if (reducedMotion.matches) {
    renderProducts();
    return;
  }
  grid.classList.add("is-swapping");
  setTimeout(() => {
    renderProducts();
    requestAnimationFrame(() => grid.classList.remove("is-swapping"));
  }, 170);
}
function syncFilterUI() {
  $$("[data-filter]").forEach((b) => {
    const on = b.dataset.filter === state.category;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", String(on));
  });
  $$("[data-filling]").forEach((b) => {
    const on = b.dataset.filling === state.filling;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", String(on));
  });
  $(".filling-filter").classList.toggle("is-off", state.category === "celebration");
  moveSegThumb();
}
function moveSegThumb() {
  const seg = $(".filters.seg"), active = $("[data-filter].active", seg), thumb = $(".seg-thumb", seg);
  if (!active) return;
  thumb.style.setProperty("--x", active.offsetLeft + "px");
  thumb.style.setProperty("--w", active.offsetWidth + "px");
  thumb.classList.add("ready");
}
function fillCounts() {
  const counts = { all: products.length };
  products.forEach((p) => counts[p.category] = (counts[p.category] || 0) + 1);
  $$("[data-count]").forEach((el) => el.textContent = counts[el.dataset.count] || 0);
}
$$("[data-filter]").forEach((button) => button.addEventListener("click", () => {
  if (state.category === button.dataset.filter) return;
  state.category = button.dataset.filter;
  swapProducts();
  syncFilterUI();
}));
$$("[data-filling]").forEach((button) => button.addEventListener("click", () => {
  if (state.filling === button.dataset.filling) return;
  state.filling = button.dataset.filling;
  if (state.category === "celebration") state.category = "all";
  swapProducts();
  syncFilterUI();
}));
grid.addEventListener("click", (event) => {
  if (event.target.closest("[data-reset-filters]")) {
    state.category = "all";
    state.filling = "all";
    swapProducts();
  }
});
$$("[data-jump-filling]").forEach((button) => button.addEventListener("click", () => {
  state.category = "all";
  state.filling = button.dataset.jumpFilling;
  renderProducts();
  $("#menu").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
}));
addEventListener("resize", moveSegThumb);
document.fonts?.ready.then(moveSegThumb);
grid.addEventListener("pointermove", (event) => {
  if (!finePointer.matches || reducedMotion.matches) return;
  const art = event.target.closest(".product-art");
  if (!art) return;
  const r = art.getBoundingClientRect();
  art.style.setProperty("--px", ((event.clientX - r.left) / r.width * 2 - 1).toFixed(3));
  art.style.setProperty("--py", ((event.clientY - r.top) / r.height * 2 - 1).toFixed(3));
});
grid.addEventListener("pointerout", (event) => {
  const art = event.target.closest(".product-art");
  if (art && !art.contains(event.relatedTarget)) {
    art.style.setProperty("--px", 0);
    art.style.setProperty("--py", 0);
  }
});
const dialog = $("#cart-dialog"), fab = $(".cart-fab"), toast = $(".toast"), navCart = $(".nav-cart");
let toastTimer;
function announce(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function bump(element) {
  if (!element) return;
  element.classList.remove("bump");
  void element.offsetWidth;
  element.classList.add("bump");
}
function cartTotals() {
  let count = 0, total = 0;
  cart.forEach((qty, id) => {
    count += qty;
    total += byId.get(id).price * qty;
  });
  return { count, total };
}
function checkoutLink() {
  const { total } = cartTotals();
  const lines = ["Halo Pojok Raja Dimsum, saya mau pesan:", ...Array.from(cart, ([id, qty]) => {
    const p = byId.get(id);
    return `\u2022 ${p.name} (${p.portion}) x${qty} \u2014 ${money(p.price * qty)}`;
  })];
  lines.push("", `Subtotal: ${money(total)}`);
  const name = $("#order-name").value.trim(), notes = $("#order-notes").value.trim();
  if (name) lines.push(`Nama: ${name}`);
  if (notes) lines.push(`Catatan: ${notes}`);
  lines.push("Mohon konfirmasi ketersediaan, ongkir, dan totalnya. Terima kasih!");
  $("#checkout").href = `https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join("\n"))}`;
}
function updateCart() {
  const { count, total } = cartTotals();
  $("#cart-items").innerHTML = count ? Array.from(cart, ([id, qty]) => {
    const p = byId.get(id);
    return `<div class="cart-row"><img class="cart-thumb" src="assets/${p.thumb || p.image}.webp" alt="" width="64" height="64"><div class="cart-meta"><strong>${p.name}</strong><small>${p.portion} \xB7 ${money(p.price * qty)}</small></div><div class="quantity"><button type="button" data-change="${id}" data-step="-1" aria-label="Kurangi ${p.name}">\u2212</button><span>${qty}</span><button type="button" data-change="${id}" data-step="1" aria-label="Tambah ${p.name}">+</button></div></div>`;
  }).join("") : `<div class="cart-empty"><p>Pesananmu masih kosong.</p><p>Pilih menu favoritmu dulu, nanti kami susunkan pesannya.</p><a class="button small" href="#menu" data-close-cart>Lihat menu</a></div>`;
  $("#cart-count").textContent = count;
  $("#nav-cart-count").textContent = count;
  $("#fab-total").textContent = money(total);
  $("#cart-total").textContent = money(total);
  navCart.classList.toggle("has-items", count > 0);
  fab.hidden = !count;
  $("#checkout").hidden = !count;
  $("#checkout").style.display = count ? "" : "none";
  $(".clear-cart").hidden = !count;
  try {
    localStorage.setItem("pojok-raja-cart", JSON.stringify(Array.from(cart)));
  } catch {
  }
  checkoutLink();
}
function syncBuy(id) {
  const holder = $(`[data-buy="${id}"]`);
  if (!holder) return;
  const hadFocus = holder.contains(document.activeElement);
  const step = hadFocus ? document.activeElement.dataset.step : null;
  holder.innerHTML = buyControl(byId.get(id));
  if (hadFocus) (holder.querySelector(step ? `[data-step="${step}"]` : "[data-add]") || holder.querySelector("button"))?.focus({ preventScroll: true });
}
function flyToCart(source) {
  if (reducedMotion.matches || !source) return;
  const header = $(".header");
  const target = header.classList.contains("is-hidden") && !fab.hidden ? fab : navCart;
  const a = source.getBoundingClientRect(), t = target.getBoundingClientRect();
  if (!a.width || !t.width) return;
  const ghost = source.cloneNode();
  ghost.removeAttribute("loading");
  ghost.className = "fly-ghost";
  Object.assign(ghost.style, { left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px" });
  document.body.append(ghost);
  const dx = t.left + t.width / 2 - (a.left + a.width / 2), dy = t.top + t.height / 2 - (a.top + a.height / 2);
  const flight = ghost.animate([
    { transform: "translate(0,0) scale(1) rotate(0)", opacity: 1 },
    { transform: `translate(${dx * 0.35}px, ${dy * 0.35 - 70}px) scale(.6) rotate(-14deg)`, opacity: 1, offset: 0.45 },
    { transform: `translate(${dx}px, ${dy}px) scale(.1) rotate(24deg)`, opacity: 0.25 }
  ], { duration: 720, easing: "cubic-bezier(.55,0,.25,1)" });
  flight.finished.then(() => {
    ghost.remove();
    bump(target);
    bump(target === navCart ? null : navCart);
  }).catch(() => ghost.remove());
}
function changeQty(id, delta, source) {
  const next = (cart.get(id) || 0) + delta;
  if (next > 99) {
    announce("Maksimal 99 porsi per menu. Pesanan besar bisa ditanyakan via WhatsApp.");
    return;
  }
  if (next <= 0) cart.delete(id);
  else cart.set(id, next);
  updateCart();
  syncBuy(id);
  if (delta > 0) {
    flyToCart(source);
    announce(`${byId.get(id).name} masuk ke pesananmu`);
  }
}
grid.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add]");
  if (add) {
    changeQty(add.dataset.add, 1, add.closest(".product").querySelector(".product-art img"));
    return;
  }
  const step = event.target.closest("[data-step]");
  if (step) changeQty(step.dataset.id, Number(step.dataset.step), step.closest(".product").querySelector(".product-art img"));
});
function openCart() {
  if (!dialog.open) {
    dialog.showModal();
    setScrollLock("cart", true);
  }
}
$$("[data-open-cart]").forEach((button) => button.addEventListener("click", openCart));
dialog.addEventListener("click", (event) => {
  const button = event.target.closest("[data-change]");
  if (button) changeQty(button.dataset.change, Number(button.dataset.step));
  if (event.target.closest("[data-close-cart]")) dialog.close();
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  }
});
$(".clear-cart").addEventListener("click", () => {
  const ids = [...cart.keys()];
  cart.clear();
  updateCart();
  ids.forEach(syncBuy);
  announce("Pesanan dikosongkan");
});
$(".close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => setScrollLock("cart", false));
$("#order-name").addEventListener("input", checkoutLink);
$("#order-notes").addEventListener("input", checkoutLink);
const drinkGrid = $("#drink-grid");
function drinkCardHTML(d, index) {
  const t = d.theme;
  const tag = d.id.includes("kocok") ? "Kocok" : "Es segar";
  const priceBlock = d.price === null ? `<span class="price price-inquiry">Tanya harga<small>Dikonfirmasi lewat WhatsApp</small></span>` : `<span class="price">${money(d.price)}<small>per gelas</small></span>`;
  const chips = d.parts.map((x) => `<li>${x}</li>`).join("");
  return `<article class="product product-drink" data-id="${d.id}" style="--i:${Math.min(index, 5)};--halo:${t.halo}"><div class="product-art" style="background:${t.bg}"><span class="product-tag">${tag}</span><span class="portion-badge">${d.portion}</span><img src="assets/${d.image}.webp" alt="${d.name} dalam gelas Pojok Raja Dimsum" width="${d.w}" height="${d.h}" loading="lazy" decoding="async"></div><div class="product-info"><h3>${d.name}</h3><p>${d.detail}</p><ul class="drink-chips" aria-label="Isi minuman">${chips}</ul><div class="product-bottom">${priceBlock}<div class="buy" data-buy="${d.id}">${buyControl(d)}</div></div></div></article>`;
}
drinkGrid.innerHTML = drinks.map(drinkCardHTML).join("");
$$(".product", drinkGrid).forEach((card) => cardObserver.observe(card));
drinkGrid.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add]");
  if (add) {
    changeQty(add.dataset.add, 1, add.closest(".product").querySelector(".product-art img"));
    return;
  }
  const step = event.target.closest("[data-step]");
  if (step) changeQty(step.dataset.id, Number(step.dataset.step), step.closest(".product").querySelector(".product-art img"));
});
const seedReviews = [
  { name: "Rina S.", rating: 5, item: "Dimsum Premium Ayam Mentai Isi 6", date: "Sep 2026", text: "Mentainya creamy banget dan dimsumnya masih hangat pas sampai. Porsi 6 pcs cukup buat berdua." },
  { name: "Budi A.", rating: 5, item: "Udang Premium Mentai Isi 3", date: "Sep 2026", text: "Isian udangnya terasa, bukan cuma tepung. Saus mentai dibakar sedikit jadi wangi. Pasti pesan lagi." },
  { name: "Maya P.", rating: 4, item: "Mangga Kocok", date: "Agu 2026", text: "Mangga kocoknya segar dan tidak terlalu manis. Harganya juga ramah di kantong." },
  { name: "Dedi K.", rating: 5, item: "Dimsum Rumput Laut Isi 3", date: "Agu 2026", text: "Suka sama balutan rumput lautnya, gurih. Cocok buat yang bosan dimsum biasa." },
  { name: "Sari W.", rating: 5, item: "Golden Birthday Dim Sum Mentai Bouquet", date: "Agu 2026", text: "Pesan buat kejutan ulang tahun teman, tampilannya cantik dan semua orang kaget. Adminnya juga ramah." },
  { name: "Fadli R.", rating: 4, item: "Es Teh", date: "Jul 2026", text: "Es teh jumbonya pas banget buat teman dimsum. Seger dan lemonnya kerasa." }
];
const REV_KEY = "pojok-raja-reviews", REV_FIRST = 6;
let userReviews = [];
try {
  const saved = JSON.parse(localStorage.getItem(REV_KEY) || "[]");
  if (Array.isArray(saved)) userReviews = saved.filter((r) => r && Number.isInteger(r.rating) && r.rating >= 1 && r.rating <= 5 && typeof r.text === "string" && typeof r.name === "string" && typeof r.id === "string").slice(0, 50);
} catch {
}
const revGrid = $("#rev-grid"), revSummary = $("#rev-summary"), revMore = $("#rev-more"), revForm = $("#rev-form");
const revStarsInput = $("#rev-stars-input"), revText = $("#rev-text"), revCount = $("#rev-count"), revError = $("#rev-error");
let revRating = 0, revExpanded = false;
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const starPath = "M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9z";
const star = (on) => `<svg viewBox="0 0 24 24" class="${on ? "on" : "off"}" aria-hidden="true"><path d="${starPath}"/></svg>`;
const starsHTML = (n) => `<span class="rev-stars" role="img" aria-label="${n} dari 5 bintang">${[1, 2, 3, 4, 5].map((i) => star(i <= Math.round(n))).join("")}</span>`;
const avatarColors = ["#fa3419", "#ffa900", "#1d7a58", "#5a3321", "#d9541b", "#137779"];
function allReviews() {
  return [...userReviews.map((r) => ({ ...r, mine: true })), ...seedReviews];
}
function renderSummary() {
  const list = allReviews(), total = list.length;
  const avg = list.reduce((a, r) => a + r.rating, 0) / total;
  const bars = [5, 4, 3, 2, 1].map((n) => {
    const c = list.filter((r) => r.rating === n).length;
    return `<li><span>${n}</span>${star(true)}<i class="rev-bar"><b style="width:${Math.round(c / total * 100)}%"></b></i><em>${c}</em></li>`;
  }).join("");
  revSummary.innerHTML = `<div class="rev-score"><strong>${avg.toFixed(1).replace(".", ",")}</strong>${starsHTML(avg)}<span>dari ${total} ulasan</span></div><ul class="rev-dist" aria-label="Sebaran rating">${bars}</ul>`;
}
function renderReviews() {
  const list = allReviews(), shown = revExpanded ? list : list.slice(0, REV_FIRST);
  revGrid.innerHTML = shown.map((r, i) => {
    const initial = esc((r.name.trim()[0] || "P").toUpperCase());
    return `<article class="rev-card"><header><span class="rev-avatar" style="background:${avatarColors[(r.name.length + i) % avatarColors.length]}" aria-hidden="true">${initial}</span><div><b>${esc(r.name)}</b><small>${esc(r.date || "")}${r.mine ? " \xB7 ulasanmu" : ""}</small></div>${starsHTML(r.rating)}</header><p>${esc(r.text)}</p>${r.item ? `<span class="rev-item">${esc(r.item)}</span>` : ""}${r.mine ? `<button type="button" class="rev-del" data-del="${esc(r.id)}">Hapus</button>` : ""}</article>`;
  }).join("");
  revMore.hidden = list.length <= REV_FIRST;
  revMore.textContent = revExpanded ? "Tampilkan lebih sedikit" : `Lihat semua ulasan (${list.length})`;
  revMore.setAttribute("aria-expanded", String(revExpanded));
}
function renderRevAll() {
  renderSummary();
  renderReviews();
}
revStarsInput.innerHTML = [1, 2, 3, 4, 5].map((i) => `<button type="button" role="radio" aria-checked="false" aria-label="${i} bintang" data-r="${i}" tabindex="${i === 1 ? 0 : -1}">${star(false)}</button>`).join("");
const revStarBtns = $$("button", revStarsInput);
function setRevRating(n, focus) {
  revRating = n;
  revStarBtns.forEach((b, i) => {
    const on = i < n;
    b.classList.toggle("lit", on);
    b.setAttribute("aria-checked", String(i + 1 === n));
    b.tabIndex = (n ? i + 1 === n : i === 0) ? 0 : -1;
    $("svg", b).setAttribute("class", on ? "on" : "off");
  });
  if (focus && n) revStarBtns[n - 1].focus();
}
revStarsInput.addEventListener("click", (e) => {
  const b = e.target.closest("[data-r]");
  if (b) setRevRating(Number(b.dataset.r));
});
revStarsInput.addEventListener("keydown", (e) => {
  const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
  if (!k) return;
  e.preventDefault();
  setRevRating(Math.min(5, Math.max(1, (revRating || (k > 0 ? 0 : 6)) + k)), true);
});
const revItem = $("#rev-item");
revItem.insertAdjacentHTML("beforeend", [...products, ...drinks].map((p) => `<option value="${esc(p.name)}">${esc(p.name)}</option>`).join(""));
revText.addEventListener("input", () => {
  revCount.textContent = `${revText.value.length}/300`;
});
revForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = revText.value.trim().replace(/\s+/g, " ");
  const fail = (msg) => {
    revError.textContent = msg;
    revError.hidden = false;
  };
  if (!revRating) return fail("Pilih jumlah bintang dulu ya.");
  if (text.length < 10) return fail("Komentar minimal 10 huruf supaya ceritanya jelas.");
  revError.hidden = true;
  const date = new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric" }).format(/* @__PURE__ */ new Date());
  userReviews.unshift({ id: Date.now().toString(36), name: $("#rev-name").value.trim() || "Pelanggan", rating: revRating, item: revItem.value, date, text });
  userReviews = userReviews.slice(0, 50);
  try {
    localStorage.setItem(REV_KEY, JSON.stringify(userReviews));
  } catch {
  }
  revForm.reset();
  setRevRating(0);
  revCount.textContent = "0/300";
  renderRevAll();
  announce("Terima kasih! Ulasanmu sudah tampil.");
});
revGrid.addEventListener("click", (e) => {
  const del = e.target.closest("[data-del]");
  if (!del) return;
  userReviews = userReviews.filter((r) => r.id !== del.dataset.del);
  try {
    localStorage.setItem(REV_KEY, JSON.stringify(userReviews));
  } catch {
  }
  renderRevAll();
  announce("Ulasanmu dihapus.");
});
revMore.addEventListener("click", () => {
  revExpanded = !revExpanded;
  renderReviews();
  if (!revExpanded) $("#rev-grid").scrollIntoView({ block: "start", behavior: reducedMotion.matches ? "auto" : "smooth" });
});
renderRevAll();
const lightbox = $("#lightbox"), lightboxImg = $("img", lightbox);
$$("[data-lightbox]").forEach((button) => button.addEventListener("click", () => {
  lightboxImg.src = button.dataset.lightbox;
  lightboxImg.alt = $("img", button).alt;
  lightbox.showModal();
  setScrollLock("lightbox", true);
}));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.closest(".lb-close")) lightbox.close();
});
lightbox.addEventListener("close", () => setScrollLock("lightbox", false));
const galleryVideos = [
  { src: "assets/video-1.mp4", poster: "assets/video-1-poster.webp", title: "Dimsum ulang tahun mentai", desc: "Dimsum mentai dengan topper Happy Birthday", dur: "0:12" },
  { src: "assets/video-2.mp4", poster: "assets/video-2-poster.webp", title: "Gerobak dan promo dimsum", desc: "Gerobak Pojok Raja Dimsum dengan banner promo", dur: "0:21" },
  { src: "assets/video-3.mp4", poster: "assets/video-3-poster.webp", title: "Merangkai buket dimsum", desc: "Proses membuat buket dimsum untuk hadiah", dur: "1:04" }
];
const vMain = $("#vmain"), vList = $("#vlist"), vFrame = $("#vframe"), vFail = $("#vfail"), vNow = $("#vnow");
let vIndex = 0;
vList.innerHTML = galleryVideos.map((v, i) => `<button type="button" class="vitem${i === 0 ? " active" : ""}" data-v="${i}" aria-pressed="${i === 0}"><span class="vthumb"><img src="${v.poster}" alt="" width="180" height="320" loading="lazy"><i class="vplay" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></i><em>${v.dur}</em></span><span class="vmeta"><b>${v.title}</b><small>${v.desc}</small><span class="vstate">Sedang ditampilkan</span></span></button>`).join("");
const vItems = $$(".vitem", vList);
function setVideo(i, { play = false } = {}) {
  const v = galleryVideos[i];
  vIndex = i;
  vFail.hidden = true;
  vMain.pause();
  vMain.poster = v.poster;
  vMain.src = v.src;
  vMain.setAttribute("aria-label", v.desc);
  vMain.load();
  vItems.forEach((el, n) => {
    el.classList.toggle("active", n === i);
    el.setAttribute("aria-pressed", String(n === i));
  });
  vNow.textContent = `${i + 1} dari ${galleryVideos.length} \xB7 ${v.title}`;
  if (play) vMain.play().catch(() => {
  });
}
vList.addEventListener("click", (e) => {
  const b = e.target.closest("[data-v]");
  if (b) setVideo(Number(b.dataset.v), { play: true });
});
vMain.addEventListener("ended", () => {
  if (vIndex < galleryVideos.length - 1) setVideo(vIndex + 1, { play: true });
});
vMain.addEventListener("error", () => {
  vFail.hidden = false;
});
vMain.addEventListener("play", () => vFrame.classList.add("playing"));
vMain.addEventListener("pause", () => vFrame.classList.remove("playing"));
setVideo(0);
new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting && !vMain.paused) vMain.pause();
}), { threshold: 0.1 }).observe($("#video-panel"));
fillCounts();
renderProducts();
updateCart();
$("#year").textContent = (/* @__PURE__ */ new Date()).getFullYear();

// Judul "THE DIMSUM" dikecilkan hanya kalau lebarnya melebihi layar
// (misalnya di HP yang tidak punya font Impact).
function fitHeroTitle() {
  const title = $("#hero-title");
  const letters = title && title.querySelectorAll(".title-letter");
  if (!letters || !letters.length) return;
  title.style.fontSize = "";
  const first = letters[0], last = letters[letters.length - 1];
  const textWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft;
  const stroke = parseFloat(getComputedStyle(title).webkitTextStrokeWidth) || 0;
  const room = title.parentElement.clientWidth - stroke;
  if (textWidth > room) {
    title.style.fontSize = (parseFloat(getComputedStyle(title).fontSize) * room / textWidth).toFixed(1) + "px";
  }
}
fitHeroTitle();
document.fonts && document.fonts.ready.then(fitHeroTitle);
addEventListener("resize", () => requestAnimationFrame(fitHeroTitle));

// Tulisan besar di footer ikut mengecil bila font cadangan lebih lebar dari layar.
function fitFooterMark() {
  const mark = $(".footer-mark");
  if (!mark) return;
  mark.style.fontSize = "";
  if (mark.scrollWidth > mark.clientWidth) {
    mark.style.fontSize = (parseFloat(getComputedStyle(mark).fontSize) * mark.clientWidth / mark.scrollWidth * .98).toFixed(1) + "px";
  }
}
fitFooterMark();
document.fonts && document.fonts.ready.then(fitFooterMark);
addEventListener("resize", () => requestAnimationFrame(fitFooterMark));
