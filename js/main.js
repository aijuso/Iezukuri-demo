/* 家づくりラボ — フィグマ HOME フレーム (2166:518) の 1600px 原寸再現 */
(function () {
  "use strict";
  const D = SITE_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const br = (s) => esc(s).replace(/\n/g, "<br>");
  const img = (src, cls, alt) => `<img class="${cls || ""}" src="images/${src}" alt="${alt || ""}">`;

  /* Figmaに実体のあるアイコン (全て書き出し画像) */
  const ICON = {
    house: "nayami-house.png", company: "nayami-company.png", plan: "nayami-plan.png", money: "nayami-money.png",
    madori: "icon-madori.png", tochi: "icon-tochi.png", yosan: "icon-yosan.png",
    youtube: "sns-youtube.png", instagram: "sns-instagram.png", line: "sns-line.png", x: "sns-x.png"
  };
  const arrow = (cls) => img("arrow.svg", cls);
  const arrowCircle = (cls) => img("arrow-circle.svg", cls);
  const star = (cls) => img("star.svg", cls);
  const leaf = (cls) => img("deco-leaf.png", cls);
  const leaf2 = (cls) => img("deco-leaf2.png", cls);

  /* ---------- 背景レイヤー (2176:2173) ---------- */
  function renderBg() {
    $("[data-bg]").innerHTML = `
      <div class="bg-img bg-77"></div>
      <div class="bg-img bg-79"></div>`;
  }

  /* ---------- Header (2166:555) ---------- */
  function renderHeader() {
    const nav = D.nav.map((n) => `
      <a class="nav__item" href="${n.href}">
        <span class="nav__label">${esc(n.label)}</span>
        ${n.dropdown ? img("caret.svg", "nav__caret") : ""}
      </a>`).join("");
    $("[data-header]").innerHTML = `
      <a class="hdr__logo" href="#stage" aria-label="${esc(D.brand.name)}">${img("logo-header.png", "", esc(D.brand.name))}</a>
      <nav class="hdr__nav" aria-label="グローバルナビ">${nav}</nav>`;
  }

  /* ---------- Hero (2166:526) ---------- */
  function renderHero() {
    const h = D.hero;
    const cards = [
      { cls: "fc-madori",  label: "間取り",   icon: "madori" },
      { cls: "fc-yosan",   label: "予算",     icon: "yosan" },
      { cls: "fc-tochi",   label: "土地探し", icon: "tochi" }
    ].map((c) => `
      <div class="fcard ${c.cls}">
        <span class="fcard__label">${esc(c.label)}</span>
        ${img(ICON[c.icon], "fcard__icon")}
      </div>`).join("");

    $("[data-hero]").innerHTML = `
      <div class="hero__logo">
        ${img("hero-title.png", "hero__title", "家づくりで、後悔しない選択を。")}
        <div class="hero__buttons">
          <a class="hbtn hbtn--primary" href="#nayami"><span>${esc(h.primaryButton)}</span>${arrow("hbtn__arrow")}</a>
          <a class="hbtn hbtn--ghost" href="#examples"><span>${esc(h.secondaryButton)}</span>${arrow("hbtn__arrow")}</a>
        </div>
      </div>

      ${img("bird.png", "hero__bird")}

      <div class="hero__map">
        <div class="hero__photo">${img("hero-room.png", "", "リビングの実例")}</div>
        ${cards}
        <div class="guide">
          <p class="guide__eyebrow">${esc(h.guide.title)}</p>
          <p class="guide__text">${br(h.guide.text)}</p>
          <a class="guide__btn" href="#nayami"><span>${esc(h.guide.button)}</span>${arrow("guide__arrow")}</a>
        </div>
        ${img("mascot.png", "hero__mascot")}
      </div>`;
  }

  /* ---------- 悩みから探す (2170:1426) ---------- */
  function renderNayami() {
    const n = D.nayami;
    const cards = n.items.map((it, i) => `
      <a class="ncard ncard--${i}" href="#examples">
        <span class="ncard__no">${esc(it.no)}</span>
        <span class="ncard__illust">${img(ICON[it.icon], "")}</span>
        <span class="ncard__main">${esc(it.main)}</span>
        <span class="ncard__sub">${br(it.sub)}</span>
        ${arrowCircle("ncard__go")}
      </a>`).join("");

    $("[data-nayami]").innerHTML = `
      <div class="ntitle">
        <div class="bubble">${esc(n.bubble)}</div>
        <h2 class="ntitle__head"><span>${esc(n.title)}</span>${leaf("ntitle__leaf")}</h2>
        <p class="ntitle__sub">${br(n.sub)}</p>
      </div>
      <div class="ngrid">${cards}</div>`;
  }

  /* ---------- 注目の実例 (2172:1988) ---------- */
  function renderExamples() {
    const e = D.examples;
    const f = e.featured;
    const tags = f.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const cards = e.cards.map((c) => `
      <article class="excard">
        <div class="excard__photo">${img(c.img.replace("images/", ""), "", esc(c.title.replace(/\n/g, "")))}</div>
        <div class="excard__body">
          <h3 class="excard__title">${br(c.title)}</h3>
          <p class="excard__sub">${esc(c.sub)}</p>
          <div class="excard__meta">
            <span class="kv"><b>延床</b> ${esc(c.area)}</span>
            <span class="kv"><b>家族構成</b> ${esc(c.family)}</span>
          </div>
          <div class="excard__rate">${star("rate__star")}<span>${esc(c.rating)}</span></div>
          ${arrowCircle("excard__go")}
        </div>
      </article>`).join("");
    const dots = e.cards.map((_, i) => `<span class="dot${i === 0 ? " is-active" : ""}"></span>`).join("");

    $("[data-examples]").innerHTML = `
      <div class="extitle">
        <h2 class="extitle__head"><span>${esc(e.title)}</span>${leaf("extitle__leaf")}</h2>
        <p class="extitle__sub">${esc(e.sub)}</p>
      </div>
      <a class="exmore" href="#examples"><span>${esc(e.moreButton)}</span>${arrow("exmore__arrow")}</a>

      <div class="expanel">
        <div class="feat">
          <div class="feat__photo">
            <span class="badge badge--orange">${esc(f.badge)}</span>
            ${img(f.img.replace("images/", ""), "", esc(f.title.replace(/\n/g, "")))}
          </div>
          <div class="feat__body">
            <h3 class="feat__title">${br(f.title)}</h3>
            <p class="feat__desc">${br(f.desc)}</p>
            <div class="feat__info">
              <span class="famcol">${img("family.png", "famcol__icon")}<span class="famcol__txt"><small>家族構成</small>${esc(f.family)}</span></span>
              <span class="ratecol">${star("ratecol__star")}<span>${esc(f.rating)}</span></span>
            </div>
            <div class="tags">${tags}</div>
          </div>
        </div>
        <div class="excards">${cards}</div>
        <div class="exdots">${dots}</div>
        ${arrowCircle("exarrow exarrow--prev")}
        ${arrowCircle("exarrow exarrow--next")}
      </div>`;
  }

  /* ---------- コラム & YouTube (2176:2837) ---------- */
  function mediaCol(data, variant) {
    const f = data.featured;
    const list = data.items.map((it) => `
      <a class="subcol" href="#">
        <span class="subcol__thumb">${img(it.img.replace("images/", ""), "")}${variant === "youtube" ? '<span class="play play--sm"></span>' : ""}</span>
        <span class="subcol__title">${esc(it.title)}</span>
        <time class="subcol__date">${esc(it.date)}</time>
      </a>`).join("");
    return `
      <div class="mcol mcol--${variant}">
        <div class="mtitle">
          <h2 class="mtitle__head"><span>${esc(data.title)}</span>${variant === "youtube" ? leaf2("mtitle__leaf") : leaf2("mtitle__leaf")}</h2>
          <p class="mtitle__sub">${esc(data.sub)}</p>
        </div>
        <a class="mfeat" href="#">
          <span class="mfeat__photo">
            <span class="badge ${variant === "youtube" ? "badge--pickup" : "badge--new"}">${esc(f.badge)}</span>
            ${img(f.img.replace("images/", ""), "")}
            ${variant === "youtube" ? '<span class="play"></span>' : ""}
          </span>
          <span class="mfeat__body">
            <span class="mfeat__title">${br(f.title)}</span>
            <span class="mfeat__desc">${br(f.desc)}</span>
            <time class="mfeat__date">${esc(f.date)}</time>
          </span>
        </a>
        <div class="mlist">${list}</div>
        <a class="mbtn ${variant === "youtube" ? "mbtn--orange" : "mbtn--green"}" href="#"><span>${esc(data.button)}</span>${arrow("mbtn__arrow")}</a>
      </div>`;
  }
  function renderMedia() {
    $("[data-media]").innerHTML = mediaCol(D.column, "column") + mediaCol(D.youtube, "youtube");
  }

  /* ---------- Footer (2176:2838) ---------- */
  function renderFooter() {
    const f = D.footer;
    const social = f.social.map((s) => `<a class="fsoc" href="#" aria-label="${esc(s)}">${img(ICON[s], "")}</a>`).join("");
    const nav = f.nav.map((col) => `
      <div class="fnav__col">
        <h4>${esc(col.title)}</h4>
        <ul>${col.items.map((i) => `<li><a href="#">${esc(i)}</a></li>`).join("")}</ul>
      </div>`).join('<span class="fnav__div"></span>');

    $("[data-footer]").innerHTML = `
      ${img("footer-bg.png", "footer__bg")}

      <div class="sign">
        ${img("signboard.png", "sign__board")}
        <div class="sign__inner">
          <p class="sign__title">${esc(f.sign.title)}</p>
          <p class="sign__text">${br(f.sign.text)}</p>
          <a class="sign__btn" href="#nayami"><span>${esc(f.sign.button)}</span>${arrow("sign__arrow")}</a>
        </div>
      </div>
      ${img("mascot-footer.png", "footer__mascot")}

      <div class="fbrand">
        ${img("logo-footer.png", "fbrand__logo", esc(D.brand.name))}
        <div class="fbrand__social">${social}</div>
      </div>

      <nav class="fnav" aria-label="フッターナビ">${nav}</nav>
      <p class="fcopy">${esc(f.copyright)}</p>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderBg();
    renderHeader();
    renderHero();
    renderNayami();
    renderExamples();
    renderMedia();
    renderFooter();
  });
})();
