/* 家づくりラボ — レンダリング & インタラクション */
(function () {
  "use strict";
  const D = SITE_DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const nl2br = (s) => esc(s).replace(/\n/g, "<br>");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- アイコン (インラインSVG) ---------- */
  const ICONS = {
    leaf: `<svg class="ico-leaf" viewBox="0 0 40 32" aria-hidden="true"><path d="M6 28 C6 12 20 4 36 4 C36 20 22 30 8 30" fill="#8bbf6a"/><path d="M30 9 C20 13 12 20 8 29" stroke="#5e9a3e" stroke-width="2" fill="none"/><path d="M2 30 C2 22 6 16 12 12" stroke="#8bbf6a" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arrowCircle: `<svg viewBox="0 0 33 33" aria-hidden="true"><circle cx="16.5" cy="16.5" r="15.5" fill="#fff" stroke="#e4d9c2"/><path d="M13 16.5h7m0 0-3-3m3 3-3 3" stroke="#fc7201" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    star: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.1 20.95l1.1-6.5L2.5 9.35l6.5-.95z" fill="#f4a82c"/></svg>`,
    family: `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="#7c9a5e" stroke-width="2.4" stroke-linecap="round"><circle cx="15" cy="13" r="5"/><circle cx="33" cy="13" r="5"/><path d="M7 38c0-7 3.6-11 8-11s8 4 8 11"/><path d="M25 38c0-7 3.6-11 8-11s8 4 8 11"/></g></svg>`,
    madori: `<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="6" y="8" width="48" height="44" rx="3" fill="#fff" stroke="#7d8a6a" stroke-width="2.4"/><path d="M30 8v44M6 30h24M30 22h24M40 30v22" stroke="#7d8a6a" stroke-width="2.4" fill="none"/></svg>`,
    tochi: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M4 40 28 26l32 12-24 14z" fill="#8bbf6a"/><path d="M4 40 28 26l32 12-24 14z" fill="none" stroke="#6aa24a" stroke-width="2"/><path d="M40 8c-6 0-11 5-11 11 0 8 11 18 11 18s11-10 11-18c0-6-5-11-11-11z" fill="#fc7201"/><circle cx="40" cy="19" r="4" fill="#fff"/></svg>`,
    yosan: `<svg viewBox="0 0 60 64" aria-hidden="true"><rect x="12" y="6" width="36" height="52" rx="5" fill="#fff" stroke="#c98b3a" stroke-width="2.4"/><rect x="18" y="12" width="24" height="10" rx="2" fill="#dfeccb"/><g fill="#c98b3a"><circle cx="22" cy="32" r="3"/><circle cx="30" cy="32" r="3"/><circle cx="38" cy="32" r="3"/><circle cx="22" cy="42" r="3"/><circle cx="30" cy="42" r="3"/></g><circle cx="38" cy="46" r="8" fill="#f4a82c"/><text x="38" y="50" font-size="9" text-anchor="middle" fill="#fff" font-weight="700">¥</text></svg>`,
    house: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="20" y="58" width="80" height="48" rx="4" fill="#f6c98a"/><path d="M14 60 60 26l46 34z" fill="#e88a3c"/><rect x="50" y="74" width="20" height="32" fill="#b9722f"/><rect x="30" y="70" width="14" height="14" fill="#fff8ec"/><rect x="78" y="70" width="14" height="14" fill="#fff8ec"/><circle cx="92" cy="34" r="6" fill="#f4a82c"/><path d="M8 106h104" stroke="#7fae6f" stroke-width="5" stroke-linecap="round"/></svg>`,
    company: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="20" y="34" width="46" height="72" fill="#8fb4cf"/><rect x="62" y="20" width="40" height="86" fill="#b6cfe0"/><g fill="#fff"><rect x="28" y="44" width="10" height="10"/><rect x="46" y="44" width="10" height="10"/><rect x="28" y="62" width="10" height="10"/><rect x="46" y="62" width="10" height="10"/><rect x="28" y="80" width="10" height="10"/><rect x="46" y="80" width="10" height="10"/><rect x="72" y="32" width="9" height="9"/><rect x="86" y="32" width="9" height="9"/><rect x="72" y="48" width="9" height="9"/><rect x="86" y="48" width="9" height="9"/><rect x="72" y="64" width="9" height="9"/><rect x="86" y="64" width="9" height="9"/></g><circle cx="100" cy="20" r="6" fill="#7fae6f"/><path d="M10 106h100" stroke="#7fae6f" stroke-width="5" stroke-linecap="round"/></svg>`,
    plan: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="22" y="20" width="76" height="80" rx="5" fill="#fff" stroke="#7d8a6a" stroke-width="3.4"/><path d="M60 20v80M22 56h38M60 44h38M76 56v44" stroke="#7d8a6a" stroke-width="3.4" fill="none"/><circle cx="92" cy="26" r="6" fill="#f4a82c"/></svg>`,
    money: `<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="58" cy="68" rx="40" ry="30" fill="#f4b6c0"/><circle cx="86" cy="58" r="6" fill="#fff"/><circle cx="86" cy="58" r="2.6" fill="#d77f8e"/><path d="M40 40c2-10 24-10 28 0" fill="#f4b6c0"/><rect x="50" y="34" width="22" height="8" rx="4" fill="#f29bab"/><rect x="44" y="92" width="8" height="14" fill="#e98fa0"/><rect x="70" y="92" width="8" height="14" fill="#e98fa0"/><rect x="52" y="44" width="14" height="4" rx="2" fill="#fff"/><circle cx="60" cy="20" r="9" fill="#f4a82c"/><text x="60" y="24" font-size="11" text-anchor="middle" fill="#fff" font-weight="700">¥</text></svg>`,
    bird: `<svg viewBox="0 0 71 46" aria-hidden="true"><path d="M6 30c14-2 22-12 30-22 2 8 0 14-4 18 8-2 14-6 20-12-2 12-14 24-30 26-8 1-14-4-16-10z" fill="#f4b13c"/><circle cx="20" cy="22" r="2.2" fill="#5a3a14"/></svg>`,
    youtube: `<svg viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="12" fill="#ff4d3d"/><path d="M18 15l13 7-13 7z" fill="#fff"/></svg>`,
    instagram: `<svg viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="12" fill="#d6336c"/><rect x="12" y="12" width="20" height="20" rx="6" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="22" cy="22" r="5" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="29" cy="15" r="1.8" fill="#fff"/></svg>`,
    line: `<svg viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="12" fill="#06c755"/><text x="22" y="28" font-size="14" text-anchor="middle" fill="#fff" font-weight="800">LINE</text></svg>`,
    x: `<svg viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="12" fill="#1a1a1a"/><path d="M14 13l16 18M30 13L14 31" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/></svg>`
  };
  const icon = (k) => ICONS[k] || "";

  /* ---------- Header / Logo / Nav ---------- */
  function renderHeader() {
    $("[data-logo]").innerHTML =
      D.brand.name.replace(D.brand.nameAccent, `<span class="logo__accent">${D.brand.nameAccent}</span>`);
    $("[data-nav]").innerHTML = D.nav.map((n) => `
      <li class="nav__item">
        <a href="${n.href}">${esc(n.label)}${n.dropdown ? '<span class="nav__caret">▾</span>' : ""}</a>
      </li>`).join("");
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    const h = D.hero;
    const title = h.title.map((t) => `<span class="${t.accent ? "accent" : ""}">${esc(t.text)}</span>`).join("");
    $("[data-hero-copy]").innerHTML = `
      <p class="hero__eyebrow"><span class="deco">/</span>${esc(h.eyebrow)}<span class="deco">/</span></p>
      <h1 class="hero__title">${title}</h1>
      <p class="hero__sub">${esc(h.sub)}</p>
      <div class="hero__buttons">
        <a class="btn btn--primary" href="#examples"><span>${icon("arrow")}</span></a>
        <a class="btn btn--ghost" href="#examples">${esc(h.secondaryButton)} ${icon("arrow")}</a>
      </div>`;

    const cards = h.floatingCards.map((c, i) => `
      <div class="float-card float-card--${i}">
        <span class="float-card__label">${esc(c.label)}</span>
        <span class="float-card__icon">${icon(c.icon)}</span>
      </div>`).join("");

    $("[data-hero-visual]").innerHTML = `
      <span class="hero__bird">${icon("bird")}</span>
      <div class="hero__photo"><img src="images/room-living.svg" alt="リビングの実例"></div>
      ${cards}
      <div class="guide-card">
        <p class="guide-card__title">${esc(h.guide.title)}</p>
        <p class="guide-card__text">${nl2br(h.guide.text)}</p>
        <a class="btn btn--green" href="#nayami">${esc(h.guide.button)} ${icon("arrow")}</a>
        <img class="guide-card__mascot" src="images/mascot.svg" alt="">
      </div>`;
  }

  /* ---------- 悩みから探す ---------- */
  function renderNayami() {
    const n = D.nayami;
    $("[data-nayami-head]").innerHTML = `
      <div class="bubble">${esc(n.bubble)}</div>
      <h2 class="title-deco">${esc(n.title)}${icon("leaf")}</h2>
      <p class="lead">${nl2br(n.sub)}</p>`;
    $("[data-nayami-grid]").innerHTML = n.items.map((it) => `
      <a class="nayami-card" href="#examples">
        <span class="nayami-card__no">${esc(it.no)}</span>
        <span class="nayami-card__icon">${icon(it.icon)}</span>
        <span class="nayami-card__main">${esc(it.main)}</span>
        <span class="nayami-card__sub">${nl2br(it.sub)}</span>
        <span class="nayami-card__go">${icon("arrow")}</span>
      </a>`).join("");
  }

  /* ---------- 注目の実例 ---------- */
  function renderExamples() {
    const e = D.examples;
    $("[data-examples-head]").innerHTML = `
      <div class="section-head__text">
        <h2 class="title-deco">${esc(e.title)}${icon("leaf")}</h2>
        <p class="lead">${esc(e.sub)}</p>
      </div>
      <a class="btn btn--pill" href="#examples">${esc(e.moreButton)} ${icon("arrowCircle")}</a>`;

    const f = e.featured;
    $("[data-examples-featured]").innerHTML = `
      <div class="featured__photo">
        <span class="badge badge--orange">${esc(f.badge)}</span>
        <img src="${esc(f.img)}" alt="${esc(f.title.replace(/\n/g, ""))}">
      </div>
      <div class="featured__body">
        <h3 class="featured__title">${nl2br(f.title)}</h3>
        <p class="featured__desc">${nl2br(f.desc)}</p>
        <div class="featured__meta">
          <span class="meta-family">${icon("family")}<span><small>家族構成</small>${esc(f.family)}</span></span>
          <span class="meta-rating">${icon("star")}${esc(f.rating)}</span>
        </div>
        <div class="tags">${f.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>`;

    $("[data-examples-cards]").innerHTML = e.cards.map((c) => `
      <article class="ex-card">
        <div class="ex-card__photo"><img src="${esc(c.img)}" alt="${esc(c.title.replace(/\n/g, ""))}"></div>
        <div class="ex-card__body">
          <h3 class="ex-card__title">${nl2br(c.title)}</h3>
          <p class="ex-card__sub">${esc(c.sub)}</p>
          <div class="ex-card__info">
            <span><b>延床</b> ${esc(c.area)}</span>
            <span><b>家族構成</b> ${esc(c.family)}</span>
          </div>
          <div class="ex-card__foot">
            <span class="meta-rating">${icon("star")}${esc(c.rating)}</span>
            <span class="ex-card__go">${icon("arrowCircle")}</span>
          </div>
        </div>
      </article>`).join("");

    $("[data-examples-dots]").innerHTML = e.cards.map((_, i) =>
      `<button class="dot${i === 0 ? " is-active" : ""}" data-idx="${i}" aria-label="${i + 1}枚目へ"></button>`).join("");

    initCarousel();
  }

  /* ---------- コラム / YouTube ---------- */
  function mediaColumn(data, variant) {
    const f = data.featured;
    return `
      <div class="section-head section-head--sm">
        <h2 class="title-deco">${esc(data.title)}${icon("leaf")}</h2>
      </div>
      <p class="lead lead--sm">${esc(data.sub)}</p>
      <a class="media-feature" href="#">
        <div class="media-feature__photo">
          <span class="badge ${variant === "youtube" ? "badge--pickup" : "badge--new"}">${esc(f.badge)}</span>
          <img src="${esc(f.img)}" alt="${esc(f.title.replace(/\n/g, ""))}">
          ${variant === "youtube" ? '<span class="play">▶</span>' : ""}
        </div>
        <div class="media-feature__body">
          <h3>${nl2br(f.title)}</h3>
          <p>${nl2br(f.desc)}</p>
          <time>${esc(f.date)}</time>
        </div>
      </a>
      <ul class="media-list">
        ${data.items.map((it) => `
          <li><a href="#">
            <span class="media-list__thumb"><img src="${esc(it.img)}" alt="">${variant === "youtube" ? '<span class="play play--sm">▶</span>' : ""}</span>
            <span class="media-list__title">${esc(it.title)}</span>
            <time>${esc(it.date)}</time>
          </a></li>`).join("")}
      </ul>
      <a class="btn btn--outline ${variant === "youtube" ? "btn--outline-orange" : "btn--outline-green"}" href="#">
        ${esc(data.button)} ${icon("arrow")}
      </a>`;
  }
  function renderMedia() {
    $("[data-column]").innerHTML = mediaColumn(D.column, "column");
    $("[data-youtube]").innerHTML = mediaColumn(D.youtube, "youtube");
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const f = D.footer;
    $("[data-footer]").innerHTML = `
      <div class="footer__brand">
        <p class="footer__tagline">${esc(D.brand.tagline)}</p>
        <div class="logo logo--footer">
          <img class="logo__mark" src="images/logo-mark.svg" alt="">
          <span class="logo__text">${D.brand.name.replace(D.brand.nameAccent, `<span class="logo__accent">${D.brand.nameAccent}</span>`)}</span>
        </div>
        <div class="footer__social">
          ${f.social.map((s) => `<a href="#" aria-label="${s}">${icon(s)}</a>`).join("")}
        </div>
      </div>
      <nav class="footer__nav" aria-label="フッターナビ">
        ${f.nav.map((col) => `
          <div class="footer__navcol">
            <h4>${esc(col.title)}</h4>
            <ul>${col.items.map((i) => `<li><a href="#">${esc(i)}</a></li>`).join("")}</ul>
          </div>`).join("")}
      </nav>
      <div class="footer__sign">
        <p class="footer__sign-title">${esc(f.sign.title)}</p>
        <p class="footer__sign-text">${nl2br(f.sign.text)}</p>
        <a class="btn btn--green btn--sm" href="#nayami">${esc(f.sign.button)} ${icon("arrow")}</a>
        <img class="footer__mascot" src="images/mascot.svg" alt="">
      </div>`;
    $("[data-footer-copy]").textContent = f.copyright;
  }

  /* ---------- Carousel ---------- */
  function initCarousel() {
    const viewport = $(".carousel__viewport");
    const track = $(".carousel__track");
    const dots = Array.from(document.querySelectorAll("[data-examples-dots] .dot"));
    if (!viewport || !track) return;

    const step = () => {
      const card = track.querySelector(".ex-card");
      if (!card) return viewport.clientWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return card.getBoundingClientRect().width + gap;
    };
    $(".carousel__arrow--next").addEventListener("click", () => viewport.scrollBy({ left: step(), behavior: "smooth" }));
    $(".carousel__arrow--prev").addEventListener("click", () => viewport.scrollBy({ left: -step(), behavior: "smooth" }));
    dots.forEach((d) => d.addEventListener("click", () => viewport.scrollTo({ left: step() * Number(d.dataset.idx), behavior: "smooth" })));

    let raf;
    viewport.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = Math.round(viewport.scrollLeft / step());
        dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
      });
    });
  }

  /* ---------- Mobile menu & header shadow ---------- */
  function initUI() {
    const burger = $("#hamburger");
    const nav = $("#nav");
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    const header = $("#header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderHero();
    renderNayami();
    renderExamples();
    renderMedia();
    renderFooter();
    initUI();
  });
})();
