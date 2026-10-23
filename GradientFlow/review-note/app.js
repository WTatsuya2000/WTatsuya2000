/* ══════════════════════════════════════════════════════════════════
   Research Note — lecture-note engine (Quarto-style book layout)

   BOOK が唯一の目次定義。sidebar・前後ナビ・検索対象・章番号は
   すべてここから生成される。ページ側は <body data-page="ファイル名">
   を書くだけでよい。
   ══════════════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  /* ── 目次定義（ここだけ編集する） ──────────────────────────── */
  const BOOK = {
    title: "グラディエントフロー入門",
    parts: [
      {
        title: null,
        items: [
          { file: "index.html", num: "1", label: "はじめに" }
        ]
      },
      {
        title: "本文",
        items: [
          { file: "02-definition.html", num: "2", label: "フローの定義と摂動論" },
          { file: "03-renormalization.html", num: "3", label: "繰り込み性と基準スケール" },
          { file: "04-lattice.html", num: "4", label: "格子上のフローと GF 結合定数" },
          { file: "05-topology.html", num: "5", label: "トポロジカルチャージ" },
          { file: "06-emt.html", num: "6", label: "小フロー時間展開と EMT" },
          { file: "07-quarks.html", num: "7", label: "クォークのフローと発展的話題" }
        ]
      },
      {
        title: "付録",
        items: [
          { file: "E-exercises.html", num: "E", label: "演習問題と解答例" },
          { file: "C-code.html", num: "C", label: "数値演習コード" }
        ]
      }
    ]
  };

  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];
  const flat = BOOK.parts.flatMap((p) => p.items);

  const pageFile = () => {
    if (document.body.dataset.page) return document.body.dataset.page;
    const name = location.pathname.split("/").pop();
    return name || "index.html";
  };
  const currentItem = () => flat.find((i) => i.file === pageFile()) || flat[0];
  const chapterNumber = () =>
    document.body.dataset.chapter || currentItem()?.num || "1";

  const slugify = (text) =>
    text.trim().toLowerCase()
      .replace(/[§#]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}\-_]/gu, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section";

  function uniqueId(base) {
    let id = base, i = 2;
    while (document.getElementById(id)) id = `${base}-${i++}`;
    return id;
  }

  /* ── 本文の測り幅（狭 / 標準 / 広・設定は保存） ─────────────── */
  const WIDTH_KEY = "research-note-width";
  const WIDTHS = ["narrow", "regular", "wide"];
  const WIDTH_LABELS = { narrow: "狭", regular: "標準", wide: "広" };

  const currentWidth = () => {
    const stored = localStorage.getItem(WIDTH_KEY);
    return WIDTHS.includes(stored) ? stored : "regular";
  };

  function setWidth(width) {
    document.documentElement.setAttribute("data-width", width);
    localStorage.setItem(WIDTH_KEY, width);
    const button = qs("#width-toggle");
    if (button) {
      button.textContent = `幅 ${WIDTH_LABELS[width]}`;
      button.setAttribute("aria-label", `本文の横幅: ${WIDTH_LABELS[width]}`);
    }
  }

  function initWidth() {
    setWidth(currentWidth());
    qs("#width-toggle")?.addEventListener("click", () => {
      setWidth(WIDTHS[(WIDTHS.indexOf(currentWidth()) + 1) % WIDTHS.length]);
    });
  }

  /* ── 左の目次（章立て）の開閉（設定は保存） ────────────────── */
  const NAV_KEY = "research-note-nav";

  const navCollapsed = () => document.documentElement.dataset.nav === "collapsed";

  function setNav(collapsed) {
    if (collapsed) document.documentElement.dataset.nav = "collapsed";
    else delete document.documentElement.dataset.nav;
    try { localStorage.setItem(NAV_KEY, collapsed ? "collapsed" : "open"); } catch (e) { /* 保存できなくても動く */ }
    const button = qs("#nav-toggle");
    if (button) {
      button.setAttribute("aria-expanded", String(!collapsed));
      button.setAttribute("aria-label", collapsed ? "目次を開く" : "目次を閉じる");
      button.title = `${collapsed ? "目次を開く" : "目次を閉じる"}（[）`;
    }
  }

  function initNavToggle() {
    const bar = qs(".topbar");
    if (!bar || !qs(".sidebar")) return;
    const button = document.createElement("button");
    button.id = "nav-toggle";
    button.type = "button";
    button.className = "utility-button";
    button.setAttribute("aria-controls", "book-nav");
    button.innerHTML = '<span class="nav-toggle-icon" aria-hidden="true">☰</span>目次';
    bar.prepend(button);
    let stored = null;
    try { stored = localStorage.getItem(NAV_KEY); } catch (e) { /* 既定は開 */ }
    setNav(stored === "collapsed");
    button.addEventListener("click", () => setNav(!navCollapsed()));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "[" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest?.("input, textarea, [contenteditable]")) return;
      setNav(!navCollapsed());
    });
  }

  /* ── KaTeX ─────────────────────────────────────────────────────── */
  const MACROS = {
    "\\dd": "\\mathrm{d}",
    "\\ii": "\\mathrm{i}",
    "\\ee": "\\mathrm{e}",
    "\\Re": "\\operatorname{Re}",
    "\\Im": "\\operatorname{Im}",
    "\\sgn": "\\operatorname{sgn}",
    "\\diag": "\\operatorname{diag}",
    "\\eps": "\\varepsilon",
    "\\abs": "\\left\\lvert #1 \\right\\rvert",
    "\\norm": "\\left\\lVert #1 \\right\\rVert",
    "\\set": "\\left\\{ #1 \\right\\}",
    "\\Order": "\\mathcal{O}\\!\\left( #1 \\right)",
    "\\unit": "\\,\\mathrm{#1}",
    "\\pd": "\\frac{\\partial #1}{\\partial #2}",
    "\\dv": "\\frac{\\dd #1}{\\dd #2}",
    "\\pdd": "\\frac{\\partial^2 #1}{\\partial #2^2}",
    "\\grad": "\\boldsymbol{\\nabla}",
    "\\lap": "\\nabla^2",
    "\\vb": "\\boldsymbol{#1}",
    "\\uv": "\\hat{\\boldsymbol{#1}}",
    "\\tens": "\\mathsf{#1}",
    "\\ket": "\\left| #1 \\right\\rangle",
    "\\bra": "\\left\\langle #1 \\right|",
    "\\braket": "\\left\\langle #1 \\middle| #2 \\right\\rangle",
    "\\melem": "\\left\\langle #1 \\middle| #2 \\middle| #3 \\right\\rangle",
    "\\op": "\\hat{#1}",
    "\\hc": "\\mathrm{h.c.}",
    "\\dag": "^{\\dagger}",
    "\\com": "\\left[ #1, #2 \\right]",
    "\\acom": "\\left\\{ #1, #2 \\right\\}",
    "\\expval": "\\left\\langle #1 \\right\\rangle",
    "\\tr": "\\operatorname{tr}",
    "\\Tr": "\\operatorname{Tr}",
    "\\slashed": "\\not\\mathrel{\\mkern-3mu} #1",
    "\\Dslash": "\\not\\mathrel{\\mkern-3mu} D",
    "\\pslash": "\\not\\mathrel{\\mkern-3mu} p",
    "\\gam": "\\gamma^{#1}",
    "\\Lag": "\\mathcal{L}",
    "\\Ham": "\\mathcal{H}",
    "\\Dmu": "D_{\\mu}",
    "\\Fmunu": "F_{\\mu\\nu}",
    "\\dslashint": "\\!\\int\\!\\frac{\\dd^4 k}{(2\\pi)^4}\\,",
    "\\kB": "k_{\\mathrm{B}}",
    "\\Zpart": "\\mathcal{Z}",
    "\\avg": "\\left\\langle #1 \\right\\rangle",
    "\\Free": "\\mathcal{F}",
    "\\BZ": "\\mathrm{BZ}",
    "\\Exp": "\\mathbb{E}",
    "\\Var": "\\operatorname{Var}",
    "\\argmin": "\\operatorname*{arg\\,min}",
    "\\argmax": "\\operatorname*{arg\\,max}"
  };

  function renderMath(root = document.body) {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(root, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "$$", right: "$$", display: true }
      ],
      macros: MACROS,
      throwOnError: false,
      strict: false
    });
  }

  /* ── sidebar（章立て）・前後ナビ ────────────────────────────── */
  function buildSidebar() {
    const host = qs("#book-nav");
    if (!host) return;
    const here = pageFile();
    const frag = document.createDocumentFragment();

    BOOK.parts.forEach((part) => {
      if (part.title) {
        const heading = document.createElement("p");
        heading.className = "nav-part";
        heading.textContent = part.title;
        frag.appendChild(heading);
      }
      const ul = document.createElement("ul");
      ul.className = "book-nav-list";
      part.items.forEach((item) => {
        const li = document.createElement("li");
        const exists = item.file === here || !item.missing;
        const a = document.createElement("a");
        a.href = item.file;
        a.dataset.file = item.file;
        a.innerHTML = "";
        const num = document.createElement("span");
        num.className = "nav-num";
        num.textContent = item.num;
        const label = document.createElement("span");
        label.textContent = item.label;
        a.append(num, label);
        if (item.file === here) {
          a.classList.add("current");
          a.setAttribute("aria-current", "page");
        }
        if (!exists) a.classList.add("pending");
        li.appendChild(a);
        ul.appendChild(li);
      });
      frag.appendChild(ul);
    });
    host.replaceChildren(frag);
  }

  function buildChapterNav() {
    const host = qs("#chapter-nav");
    if (!host) return;
    const index = flat.findIndex((i) => i.file === pageFile());
    const prev = index > 0 ? flat[index - 1] : null;
    const next = index >= 0 && index < flat.length - 1 ? flat[index + 1] : null;

    const side = (item, dir) => {
      const el = document.createElement(item ? "a" : "span");
      el.className = `chapter-nav-link ${dir}`;
      if (item) el.href = item.file;
      const kicker = document.createElement("span");
      kicker.className = "chapter-nav-kicker";
      kicker.textContent = dir === "prev" ? "前へ" : "次へ";
      const label = document.createElement("span");
      label.className = "chapter-nav-label";
      label.textContent = item ? `${item.num}　${item.label}` : "—";
      el.append(kicker, label);
      return el;
    };
    host.replaceChildren(side(prev, "prev"), side(next, "next"));
  }

  function buildPageFooter() {
    const host = qs("#page-footer");
    if (!host) return;
    const stamp = document.createElement("p");
    stamp.className = "footer-stamp";
    stamp.textContent = BOOK.title;
    host.replaceChildren(stamp);
  }

  /* ── 見出し：自動採番・permalink・ページ内目次 ──────────────── */
  function makePermalink(id) {
    const link = document.createElement("a");
    link.className = "permalink";
    link.href = `#${id}`;
    link.title = "この位置へのリンク";
    link.setAttribute("aria-label", "この位置へのリンク");
    link.textContent = "#";
    return link;
  }

  function prepareHeadings() {
    const chapter = chapterNumber();
    let h2 = 0, h3 = 0;

    const h1 = qs("main.article h1 .chapter-title, main.article h1");
    const h1num = qs("main.article h1 .chapter-number");
    if (h1num) h1num.textContent = chapter;

    qsa("main.article h2, main.article h3").forEach((heading) => {
      const original = heading.dataset.title || heading.textContent.trim();
      heading.dataset.title = original;
      if (!heading.id) heading.id = uniqueId(slugify(original));

      let number;
      if (heading.tagName === "H2") { h2 += 1; h3 = 0; number = `${chapter}.${h2}`; }
      else { h3 += 1; number = `${chapter}.${h2}.${h3}`; }
      heading.dataset.sectionNumber = number;

      heading.textContent = "";
      const num = document.createElement("span");
      num.className = "section-number";
      num.textContent = number;
      const title = document.createElement("span");
      title.className = "section-title";
      title.textContent = original;
      heading.append(num, title, makePermalink(heading.id));
    });
    void h1;
  }

  function buildTocLists() {
    const targets = [qs("#page-toc"), qs("#mobile-toc")].filter(Boolean);
    if (!targets.length) return;
    const headings = qsa("main.article h2, main.article h3");
    if (!headings.length) {
      targets.forEach((t) => t.replaceChildren());
      return;
    }

    targets.forEach((target) => {
      const ul = document.createElement("ul");
      ul.className = "generated-toc";
      headings.forEach((heading) => {
        const li = document.createElement("li");
        li.className = heading.tagName === "H3" ? "toc-level-3" : "toc-level-2";
        const a = document.createElement("a");
        a.href = `#${heading.id}`;
        a.dataset.target = heading.id;
        const num = document.createElement("span");
        num.className = "toc-num";
        num.textContent = heading.dataset.sectionNumber;
        const label = document.createElement("span");
        label.textContent = heading.dataset.title;
        a.append(num, label);
        li.appendChild(a);
        ul.appendChild(li);
      });
      target.replaceChildren(ul);
    });
  }

  function initScrollSpy() {
    const links = qsa(".generated-toc a[data-target]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    let activeId = null;
    const setActive = (id) => {
      if (!id || id === activeId) return;
      activeId = id;
      links.forEach((link) => link.classList.toggle("active", link.dataset.target === id));
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-12% 0px -70% 0px", threshold: [0, 1] });
    qsa("main.article h2, main.article h3").forEach((h) => observer.observe(h));
  }

  /* ── 式・callout・図の採番 ──────────────────────────────────── */
  function numberEquations() {
    const chapter = chapterNumber();
    let count = 0;
    qsa(".equation").forEach((equation) => {
      if (equation.dataset.unnumbered !== undefined) return;
      count += 1;
      const number = `${chapter}.${count}`;
      equation.dataset.equationNumber = number;
      if (!equation.id) equation.id = uniqueId(`eq-${chapter}-${count}`);

      let link = qs(":scope > .equation-number", equation);
      if (!link) {
        link = document.createElement("a");
        link.className = "equation-number";
        link.href = `#${equation.id}`;
        link.title = "この式へのリンク";
        equation.appendChild(link);
      }
      link.textContent = `(${number})`;
    });
  }

  function numberBoxes() {
    const chapter = chapterNumber();
    const counters = new Map();
    qsa(".numbered-box").forEach((box) => {
      const kind = box.dataset.kind || "box";
      const label = box.dataset.label || "項目";
      const count = (counters.get(kind) || 0) + 1;
      counters.set(kind, count);
      const number = `${chapter}.${count}`;
      box.dataset.boxNumber = number;
      box.dataset.boxLabel = label;
      if (!box.id) box.id = uniqueId(`${kind}-${chapter}-${count}`);

      const title = qs(":scope > .callout-head > .box-title", box) || qs(":scope > .box-title", box);
      if (!title) return;
      const suffix = title.dataset.title ? `　${title.dataset.title}` : "";
      title.textContent = `${label} ${number}${suffix}`;
      title.appendChild(makePermalink(box.id));
    });
  }

  function numberFigures() {
    const chapter = chapterNumber();
    qsa("figure.figure").forEach((figure, index) => {
      const number = `${chapter}.${index + 1}`;
      figure.dataset.figureNumber = number;
      if (!figure.id) figure.id = uniqueId(`fig-${chapter}-${index + 1}`);

      const caption = qs(":scope > figcaption", figure);
      if (!caption) return;
      if (!caption.dataset.caption) caption.dataset.caption = caption.textContent.trim();
      caption.textContent = "";
      const num = document.createElement("span");
      num.className = "figure-number";
      num.textContent = `図 ${number}: `;
      caption.append(num, document.createTextNode(caption.dataset.caption));
    });
  }

  /* ── 導出ステップ ──────────────────────────────────────────── */
  function prepareDerivations() {
    qsa("ol.derivation, ul.derivation").forEach((list) => {
      qsa(":scope > li", list).forEach((step, index) => {
        if (qs(":scope > .step-index", step)) return;
        const marker = document.createElement("span");
        marker.className = "step-index";
        marker.textContent = String(index + 1).padStart(2, "0");
        step.prepend(marker);
      });
    });

    qsa(".steps-toggle").forEach((button) => {
      const list = document.getElementById(button.dataset.controls || "");
      if (!list) return;
      const sync = () => {
        const all = qsa("details.step-why", list);
        const open = all.filter((d) => d.open).length;
        button.dataset.state = open === all.length && all.length ? "open" : "closed";
        button.textContent = button.dataset.state === "open" ? "理由をすべて閉じる" : "理由をすべて開く";
      };
      button.addEventListener("click", () => {
        const shouldOpen = button.dataset.state !== "open";
        qsa("details.step-why", list).forEach((d) => { d.open = shouldOpen; });
        sync();
      });
      list.addEventListener("toggle", sync, true);
      sync();
    });
  }

  /* ── 相互参照（節・式・図・callout）と著者年引用 ─────────────── */
  function resolveReferences() {
    qsa("a.sec-ref[href^='#']").forEach((ref) => {
      const target = qs(ref.getAttribute("href"));
      const number = target?.dataset.sectionNumber;
      if (number) {
        ref.textContent = `${number} 節`;
        ref.title = target.dataset.title || "";
      }
    });
    qsa("a.eq-ref[href^='#']").forEach((ref) => {
      const target = qs(ref.getAttribute("href"));
      const number = target?.dataset.equationNumber;
      if (number) ref.textContent = `式 (${number})`;
    });
    qsa("a.fig-ref[href^='#']").forEach((ref) => {
      const target = qs(ref.getAttribute("href"));
      const number = target?.dataset.figureNumber;
      if (number) ref.textContent = `図 ${number}`;
    });
    qsa("a.box-ref[href^='#']").forEach((ref) => {
      const target = qs(ref.getAttribute("href"));
      if (target?.dataset.boxNumber) {
        ref.textContent = `${target.dataset.boxLabel} ${target.dataset.boxNumber}`;
      }
    });
  }

  /* 著者年引用: <a class="cite" href="#ref-wilson1974"></a>
     参照先 <li id="ref-wilson1974" data-cite="Wilson 1974"> から本文表示を作る */
  function resolveCitations() {
    qsa("a.cite[href^='#']").forEach((ref) => {
      const target = qs(ref.getAttribute("href"));
      const key = target?.dataset.cite;
      if (!key) return;
      const bare = ref.classList.contains("cite-bare");
      if (!ref.textContent.trim()) ref.textContent = bare ? key : `(${key})`;
      target.classList.add("is-cited");
    });
  }

  /* ── 全文検索（章立て + 現在ページの見出し・本文） ───────────── */
  function initSearch() {
    const input = qs("#search-input");
    const results = qs("#search-results");
    if (!input || !results) return;

    const entries = flat.map((item) => ({
      kind: "章",
      title: `${item.num}　${item.label}`,
      context: "",
      href: item.file
    }));

    qsa("main.article h2, main.article h3").forEach((h) => {
      entries.push({
        kind: "節",
        title: `${h.dataset.sectionNumber}　${h.dataset.title}`,
        context: "",
        href: `#${h.id}`
      });
    });

    qsa("main.article p, main.article li, main.article figcaption, main.article .box-title")
      .forEach((el) => {
        if (el.closest(".sidebar, .page-toc, #search-results, nav")) return;
        const text = el.textContent.replace(/\s+/g, " ").trim();
        if (text.length < 12) return;
        const heading = el.closest("section")?.querySelector("h2, h3");
        const anchor = heading?.id ? `#${heading.id}` : "";
        entries.push({
          kind: "本文",
          title: heading?.dataset.title || "本文",
          context: text,
          href: anchor
        });
      });

    const render = (list, query) => {
      if (!list.length) {
        results.innerHTML = `<p class="search-empty">「${query}」に一致する項目はありません</p>`;
        results.hidden = false;
        return;
      }
      const ul = document.createElement("ul");
      list.slice(0, 12).forEach((entry) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = entry.href || "#";
        const kind = document.createElement("span");
        kind.className = "search-kind";
        kind.textContent = entry.kind;
        const title = document.createElement("span");
        title.className = "search-title";
        title.textContent = entry.title;
        a.append(kind, title);
        if (entry.context) {
          const ctx = document.createElement("span");
          ctx.className = "search-context";
          const at = entry.context.toLowerCase().indexOf(query.toLowerCase());
          const from = Math.max(0, at - 24);
          ctx.textContent = `${from > 0 ? "…" : ""}${entry.context.slice(from, from + 90)}…`;
          a.appendChild(ctx);
        }
        li.appendChild(a);
        ul.appendChild(li);
      });
      results.replaceChildren(ul);
      results.hidden = false;
    };

    const run = () => {
      const query = input.value.trim();
      if (query.length < 2) { results.hidden = true; return; }
      const needle = query.toLowerCase();
      const hits = entries.filter((e) =>
        e.title.toLowerCase().includes(needle) || e.context.toLowerCase().includes(needle));
      render(hits, query);
    };

    input.addEventListener("input", run);
    input.addEventListener("focus", run);
    results.addEventListener("click", (e) => {
      if (e.target.closest("a")) { results.hidden = true; input.value = ""; }
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search")) results.hidden = true;
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== input) { e.preventDefault(); input.focus(); }
      if (e.key === "Escape") { results.hidden = true; input.blur(); }
    });
  }

  function initPermalinkCopy() {
    document.addEventListener("click", async (event) => {
      const link = event.target.closest(".permalink");
      if (!link || !navigator.clipboard) return;
      try {
        await navigator.clipboard.writeText(`${location.href.split("#")[0]}${link.getAttribute("href")}`);
        link.classList.add("copied");
        setTimeout(() => link.classList.remove("copied"), 900);
      } catch (_) { /* the anchor still works */ }
    });
  }

  /* ── 印刷時は折りたたみを全て開き、印刷後に戻す ─────────────── */
  function initPrintPreparation() {
    let reopened = [];
    const expand = () => {
      reopened = qsa("details:not([open])");
      reopened.forEach((d) => { d.open = true; });
    };
    const restore = () => {
      reopened.forEach((d) => { d.open = false; });
      reopened = [];
    };
    window.addEventListener("beforeprint", expand);
    window.addEventListener("afterprint", restore);
    if (window.matchMedia) {
      const mq = window.matchMedia("print");
      mq.addEventListener?.("change", (e) => (e.matches ? expand() : restore()));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWidth();
    initNavToggle();
    buildSidebar();
    buildChapterNav();
    buildPageFooter();
    prepareHeadings();
    buildTocLists();
    numberBoxes();
    numberFigures();
    prepareDerivations();
    numberEquations();
    resolveReferences();
    resolveCitations();
    renderMath();
    initScrollSpy();
    initSearch();
    initPermalinkCopy();
    initPrintPreparation();
  });
})();
