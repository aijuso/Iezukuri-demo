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
    madori: `<img src="images/icon-madori.png" alt="間取り">`,
    tochi: `<img src="images/icon-tochi.png" alt="土地探し">`,
    yosan: `<img src="images/icon-yosan.png" alt="予算">`,
    house: `<img src="images/nayami-house.png" alt="">`,
    company: `<img src="images/nayami-company.png" alt="">`,
    plan: `<img src="images/nayami-plan.png" alt="">`,
    money: `<img src="images/nayami-money.png" alt="">`,
    bird: `<img src="images/bird.png" alt="">`,
    youtube: `<img src="images/sns-youtube.png" alt="YouTube">`,
    instagram: `<img src="images/sns-instagram.png" alt="Instagram">`,
    line: `<img src="images/sns-line.png" alt="LINE">`,
    x: `<img src="images/sns-x.png" alt="X">`
  };
  const icon = (k) => ICONS[k] || "";

  /* ---------- Header / Logo / Nav ---------- */
  function renderHeader() {
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
      <div class="hero__photo"><img src="images/hero-room.png" alt="リビングの実例"></div>
      ${cards}
      <div class="guide-card">
        <p class="guide-card__title">${esc(h.guide.title)}</p>
        <p class="guide-card__text">${nl2br(h.guide.text)}</p>
        <a class="btn btn--green" href="#nayami">${esc(h.guide.button)} ${icon("arrow")}</a>
        <img class="guide-card__mascot" src="images/mascot.png" alt="">
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
        <a class="logo logo--footer" href="#top" aria-label="${esc(D.brand.name)}">
          <img class="logo__img logo__img--footer" src="images/logo-footer.png" alt="${esc(D.brand.name)}">
        </a>
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
        <img class="footer__mascot" src="images/mascot-footer.png" alt="">
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
