(function () {
  "use strict";

  var STORE_LANG = "cv.lang";
  var STORE_THEME = "cv.theme";
  var root = document.documentElement;

  /* ── helpers ───────────────────────────────────────── */

  function get(obj, path) {
    return path.split(".").reduce(function (acc, k) {
      return acc == null ? undefined : acc[k];
    }, obj);
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /** Markdown-lite: only **bold** — content is ours, but escape first anyway. */
  function md(s) {
    return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* ── language ──────────────────────────────────────── */

  function detectLang() {
    var forced = new URLSearchParams(location.search).get("lang");
    if (forced === "es" || forced === "en") return forced;

    var saved = null;
    try { saved = localStorage.getItem(STORE_LANG); } catch (e) {}
    if (saved === "es" || saved === "en") return saved;
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : "en";
  }

  function renderExperience(t) {
    var host = document.getElementById("experience");
    host.textContent = "";

    t.exp.items.forEach(function (job) {
      var card = el("article", "card job");

      var head = el("header", "job__head");
      var title = el("h3", "card__title");
      title.appendChild(el("span", "job__company", escapeHtml(job.company)));
      title.appendChild(el("span", "dot", "·"));
      title.appendChild(el("span", "job__role", escapeHtml(job.role)));
      head.appendChild(title);

      var meta = el("p", "card__meta");
      meta.appendChild(el("span", "when", escapeHtml(job.when)));
      if (job.where) {
        meta.appendChild(el("span", "dot", "·"));
        meta.appendChild(el("span", null, escapeHtml(job.where)));
      }
      if (job.current) meta.appendChild(el("span", "chip chip--live", "● live"));
      head.appendChild(meta);

      card.appendChild(head);

      var ul = el("ul", "bullets");
      job.bullets.forEach(function (b) {
        ul.appendChild(el("li", null, md(b)));
      });
      card.appendChild(ul);

      host.appendChild(card);
    });
  }

  function renderSkills(t) {
    var host = document.getElementById("skills");
    host.textContent = "";

    t.skills.groups.forEach(function (g) {
      var box = el("div", "skillgroup");
      box.appendChild(el("h3", "skillgroup__name", escapeHtml(g.name)));
      var tags = el("ul", "tags");
      g.items.forEach(function (i) {
        tags.appendChild(el("li", "tag", escapeHtml(i)));
      });
      box.appendChild(tags);
      host.appendChild(box);
    });
  }

  /* Newest four of window.CERTS (tools/build-certs.py fills it from the
     LinkedIn export). The section stays hidden while the list is empty. */
  var CERTS_SHOWN = 4;
  var LINKEDIN_CERTS = "https://www.linkedin.com/in/rguerrero00/details/certifications/";

  function certDate(iso, lang) {
    var m = /^(\d{4})-(\d{2})/.exec(iso || "");
    if (!m) return "";
    return new Date(Date.UTC(+m[1], +m[2] - 1, 1)).toLocaleDateString(lang, {
      month: "short", year: "numeric", timeZone: "UTC"
    });
  }

  function metaRow(cls, text) {
    var p = el("p", cls, text ? escapeHtml(text) : "&nbsp;");
    if (text) p.title = text;
    return p;
  }

  function extLink(cls, text, href) {
    var a = el("a", cls, escapeHtml(text) + " ↗");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  function renderCerts(t, lang) {
    var section = document.getElementById("certs-section");
    var host = document.getElementById("certs");
    var all = (window.CERTS || []).slice().sort(function (a, b) {
      return (b.issued || "").localeCompare(a.issued || "");
    });

    host.textContent = "";
    section.hidden = !all.length;
    if (!all.length) return;

    all.slice(0, CERTS_SHOWN).forEach(function (c) {
      var card = el("article", "card cert");
      var head = el("div", "cert__head");
      if (c.logo) {
        var img = el("img", "cert__logo");
        img.src = c.logo;
        img.alt = "";
        img.width = img.height = 40;
        img.loading = "lazy";
        head.appendChild(img);
      }
      var who = el("div", "cert__who");
      var name = el("h3", "card__title cert__name", escapeHtml(c.name));
      name.title = c.name;
      who.appendChild(name);
      if (c.issuer) {
        var issuer = el("p", "cert__issuer", escapeHtml(c.issuer));
        issuer.title = c.issuer;
        who.appendChild(issuer);
      }
      head.appendChild(who);
      card.appendChild(head);

      /* both rows always exist (nbsp when empty) so cards line up */
      var when = [];
      if (c.issued) when.push(t.certs.issued + " " + certDate(c.issued, lang));
      if (c.expires) when.push(t.certs.expires + " " + certDate(c.expires, lang));
      card.appendChild(metaRow("cert__dates", when.join(" · ")));
      card.appendChild(metaRow("cert__id", c.id ? "ID " + c.id : ""));

      if (/^https?:\/\//i.test(c.url || "")) {
        card.appendChild(extLink("cert__link", t.certs.credential, c.url));
      }

      var li = el("li");
      li.appendChild(card);
      host.appendChild(li);
    });

    var more = el("div", "card cert cert--more");
    more.appendChild(extLink(null, t.certs.more, LINKEDIN_CERTS));
    var last = el("li");
    last.appendChild(more);
    host.appendChild(last);
  }

  function applyLang(lang) {
    var t = window.CV[lang];
    if (!t) return;

    root.setAttribute("lang", lang);
    try { localStorage.setItem(STORE_LANG, lang); } catch (e) {}

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var v = get(t, node.getAttribute("data-i18n"));
      if (typeof v === "string") node.textContent = v;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      var v = get(t, node.getAttribute("data-i18n-aria"));
      if (typeof v === "string") node.setAttribute("aria-label", v);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (node) {
      var v = get(t, node.getAttribute("data-i18n-title"));
      if (typeof v === "string") node.title = v;
    });

    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });

    document.title = "René Guerrero Pérez — " + t.hero.role;

    var pdf = document.getElementById("pdfBtn");
    var file = "Rene-Guerrero-CV-" + lang.toUpperCase() + ".pdf";
    pdf.setAttribute("href", "assets/pdf/" + file);
    pdf.setAttribute("download", file);

    renderExperience(t);
    renderSkills(t);
    renderCerts(t, lang);
    resetConsole(t);
  }

  /* ── phone number ──────────────────────────────────
     Kept out of the published source on purpose: hiding it with CSS
     would still leave it in the HTML for crawlers and scrapers. The
     private PDF build passes it in through ?tel= (see
     tools/build-pdf.ps1), and it is printed but never shown on screen. */

  function injectPhone() {
    var tel = new URLSearchParams(location.search).get("tel");
    if (!tel) return;

    var li = el("li", "print-only");
    li.appendChild(el("span", "key", "tel"));
    var a = el("a", null, escapeHtml(tel));
    a.setAttribute("href", "tel:" + tel.replace(/[^+\d]/g, ""));
    li.appendChild(a);

    var list = document.querySelector(".contact");
    list.insertBefore(li, list.firstChild);
  }

  injectPhone();

  /* ── theme ─────────────────────────────────────────── */

  function detectTheme() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_THEME); } catch (e) {}
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORE_THEME, theme); } catch (e) {}
    var btn = document.getElementById("themeToggle");
    btn.setAttribute("aria-pressed", String(theme === "light"));
    btn.querySelector(".theme-icon").textContent = theme === "dark" ? "☾" : "☀";
  }

  /* ── boot ──────────────────────────────────────────── */

  applyTheme(detectTheme());
  applyLang(detectLang());

  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  document.getElementById("themeToggle").addEventListener("click", function () {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ── typing effect ─────────────────────────────────
     Each shell command types itself out the first time its block
     scrolls into view. The text lives in the HTML, so with JS off
     (or with reduced motion) it is simply there.                  */

  var SPEED = 45;         // ms per character
  var START_DELAY = 420;  // let the page settle before the first line
  var LINE_PAUSE = 320;   // beat between one command and the next

  function typeInto(node, done) {
    var text = node.getAttribute("data-text");
    var caret = el("span", "caret caret--typing");
    caret.setAttribute("aria-hidden", "true");
    node.textContent = "";
    node.after(caret);

    var i = 0;
    (function step() {
      node.textContent = text.slice(0, ++i);
      if (i < text.length) {
        setTimeout(step, SPEED + Math.random() * 22);
      } else {
        caret.remove();
        if (done) done();
      }
    })();
  }

  function initTyping() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(".typed"));
    if (!nodes.length) return;

    /* Deliberately NOT gated on prefers-reduced-motion: the effect is the
       point of the page. It is short, non-looping and text-only. */
    if (!("IntersectionObserver" in window)) return;

    nodes.forEach(function (n) {
      n.setAttribute("data-text", n.textContent);
      n.textContent = "";
      n.classList.add("is-pending");
    });

    var queue = [];
    var running = false;

    function pump() {
      if (running) return;
      var next = queue.shift();
      if (!next) return;
      running = true;
      next.classList.remove("is-pending");
      typeInto(next, function () {
        running = false;
        setTimeout(pump, LINE_PAUSE);
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        queue.push(e.target);
        pump();
      });
    }, { rootMargin: "0px 0px -15% 0px" });

    nodes.forEach(function (n) { io.observe(n); });

    /* the first prompt should not wait for a scroll */
    setTimeout(function () {
      if (nodes[0].classList.contains("is-pending") && queue.indexOf(nodes[0]) === -1) {
        io.unobserve(nodes[0]);
        queue.unshift(nodes[0]);
        pump();
      }
    }, START_DELAY);
  }

  /* ── interactive console ───────────────────────────
     A real prompt: the commands below drive the page itself. */

  var out   = document.getElementById("consoleOut");
  var form  = document.getElementById("consoleForm");
  var input = document.getElementById("consoleInput");

  var history = [];
  var histPos = -1;
  var MAX_LINES = 200;

  var LINKS = {
    linkedin: "https://www.linkedin.com/in/rguerrero00/",
    github: "https://github.com/rene-guerrero",
    telegram: "https://t.me/reneguerrero",
    mail: "mailto:renegue1256@gmail.com"
  };

  function t() { return window.CV[root.getAttribute("lang")] || window.CV.en; }

  function fmt(tpl, a) { return String(tpl).replace("{0}", a); }

  function write(text, cls) {
    var line = el("div", "console__line" + (cls ? " " + cls : ""));
    line.textContent = text;
    out.appendChild(line);
    while (out.children.length > MAX_LINES) out.removeChild(out.firstChild);
    out.scrollTop = out.scrollHeight;
    return line;
  }

  function echo(cmd) {
    var line = el("div", "console__line console__line--echo");
    line.innerHTML =
      '<span class="prompt">rene@cv</span><span class="sep">:</span>' +
      '<span class="path">~</span><span class="sigil">$</span> ';
    line.appendChild(document.createTextNode(cmd));
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  }

  function jump(id, label) {
    var target = document.getElementById(id);
    if (!target) return;
    write(fmt(t().console.jumped, label));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetConsole(tr) {
    if (!out) return;
    out.textContent = "";
    write(tr.console.welcome, "console__line--dim");
  }

  var COMMANDS = {
    help: function () {
      var c = t().console;
      write(c.helpHeader, "console__line--dim");
      Object.keys(c.cmds).forEach(function (name) {
        var line = el("div", "console__line");
        line.appendChild(el("span", "console__cmdname", escapeHtml(name)));
        line.appendChild(document.createTextNode("  " + c.cmds[name]));
        out.appendChild(line);
      });
      out.scrollTop = out.scrollHeight;
    },

    whoami: function () {
      var tr = t();
      write("René Guerrero Pérez — " + tr.hero.role);
      write(tr.hero.location + "  ·  " + tr.hero.available, "console__line--dim");
    },

    about: function () { jump("about", "about.md"); },
    experience: function () { jump("experience-section", "experience/"); },
    education: function () { jump("education-section", "education.txt"); },
    certs: function () { jump("certs-section", "certifications/"); },

    skills: function (args) {
      var tr = t();
      var q = (args[0] || "").toLowerCase();
      var found = 0;

      tr.skills.groups.forEach(function (g) {
        var items = q
          ? g.items.filter(function (i) { return i.toLowerCase().indexOf(q) !== -1; })
          : g.items;
        if (!items.length) return;
        found += items.length;
        var line = el("div", "console__line");
        line.appendChild(el("span", "console__cmdname", escapeHtml(g.name)));
        line.appendChild(document.createTextNode("  " + items.join(", ")));
        out.appendChild(line);
      });

      if (!found) write(fmt(tr.console.noMatch, q), "console__line--warn");
      out.scrollTop = out.scrollHeight;
    },

    contact: function () {
      write("mail      renegue1256@gmail.com");
      write("linkedin  " + LINKS.linkedin);
      write("github    " + LINKS.github);
      write("telegram  " + LINKS.telegram);
    },

    open: function (args) {
      var key = (args[0] || "").toLowerCase();
      if (!LINKS[key]) {
        write(fmt(t().console.usage, "open linkedin|github|telegram|mail"), "console__line--warn");
        return;
      }
      write(fmt(t().console.opening, key));
      window.open(LINKS[key], "_blank", "noopener");
    },

    pdf: function () {
      var a = document.getElementById("pdfBtn");
      write(fmt(t().console.pdfMsg, a.getAttribute("download")));
      a.click();          // the click handler records the download
    },

    theme: function (args) {
      var want = (args[0] || "").toLowerCase();
      var next = (want === "dark" || want === "light")
        ? want
        : (root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      applyTheme(next);
      write(fmt(t().console.themeSet, next));
    },

    lang: function (args) {
      var want = (args[0] || "").toLowerCase();
      var next = (want === "es" || want === "en")
        ? want
        : (root.getAttribute("lang") === "es" ? "en" : "es");
      applyLang(next);                       // this also resets the console
      write(fmt(t().console.langSet, next));
    },

    clear: function () { out.textContent = ""; },

    sudo: function () { write(t().console.sudoMsg, "console__line--warn"); },
    exit: function () { write(t().console.exitMsg, "console__line--dim"); }
  };

  function run(raw) {
    var line = raw.trim();
    if (!line) return;

    echo(line);
    history.unshift(line);
    histPos = -1;

    var parts = line.split(/\s+/);
    var name = parts[0].toLowerCase();
    var fn = COMMANDS[name];

    if (!fn) {
      write(fmt(t().console.notFound, parts[0]), "console__line--warn");
      write(t().console.notFoundHint, "console__line--dim");
      return;
    }
    fn(parts.slice(1));
  }

  function initConsole() {
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      run(input.value);
      input.value = "";
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") {
        if (histPos + 1 < history.length) input.value = history[++histPos];
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (histPos > 0) input.value = history[--histPos];
        else { histPos = -1; input.value = ""; }
        e.preventDefault();
      } else if (e.key === "Tab") {
        var partial = input.value.trim().toLowerCase();
        if (!partial) return;
        var hit = Object.keys(COMMANDS).filter(function (c) {
          return c.indexOf(partial) === 0;
        });
        if (hit.length === 1) input.value = hit[0] + " ";
        else if (hit.length > 1) write(hit.join("  "), "console__line--dim");
        e.preventDefault();
      }
    });

    /* clicking anywhere in the console puts the caret in the prompt,
       unless the visitor is selecting text to copy */
    document.getElementById("console").addEventListener("click", function () {
      if (window.getSelection().toString()) return;
      input.focus();
    });

    /* applyLang() runs at boot, before the vars in this module are
       assigned, so its resetConsole() call is a no-op. Seed it here. */
    resetConsole(t());
  }

  initConsole();

  /* ── favicon: a prompt with a blinking caret ───────── */

  function initFavicon() {
    var canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var link = document.querySelector("link[rel='icon']");
    var on = true;

    function paint() {
      var light = root.getAttribute("data-theme") === "light";
      ctx.clearRect(0, 0, 64, 64);
      ctx.fillStyle = light ? "#eef1f5" : "#0b0f14";
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = light ? "#128a4a" : "#4ade80";
      ctx.font = "bold 40px ui-monospace, monospace";
      ctx.textBaseline = "middle";
      ctx.fillText(">", 8, 30);
      if (on) ctx.fillRect(34, 40, 22, 6);
      link.setAttribute("href", canvas.toDataURL("image/png"));
      on = !on;
    }

    paint();
    setInterval(function () {
      if (!document.hidden) paint();
    }, 600);
  }

  initFavicon();

  /* ── analytics ─────────────────────────────────────
     GoatCounter, loaded from script rather than a tag in the HTML so it
     can be skipped off the live host. The PDF and card builds render the
     page from 127.0.0.1, and local work runs on localhost; neither should
     show up as a visit. No cookies, so no consent banner is needed. */

  var GC_HOST = "rene-guerrero.github.io";
  var GC_ENDPOINT = "https://rene.goatcounter.com/count";

  function initAnalytics() {
    if (location.hostname !== GC_HOST) return;

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", GC_ENDPOINT);
    document.head.appendChild(s);
  }

  /* Pageviews say who looked. This says who actually took the CV away,
     which is the number that matters. Silently does nothing when the
     script is blocked, which ad blockers routinely do. */
  function countDownload(file) {
    if (!window.goatcounter || !window.goatcounter.count) return;
    window.goatcounter.count({
      path: "pdf-download/" + file,
      title: "PDF download",
      event: true
    });
  }

  initAnalytics();

  document.getElementById("pdfBtn").addEventListener("click", function () {
    countDownload(this.getAttribute("download"));
  });

  /* ── the title types a line while the tab is in the background ── */

  function initTitle() {
    var timer = null;

    document.addEventListener("visibilitychange", function () {
      var tr = t();
      if (timer) { clearTimeout(timer); timer = null; }

      if (!document.hidden) {
        document.title = "René Guerrero Pérez — " + tr.hero.role;
        return;
      }

      var msg = "rene@cv:~$ " + (root.getAttribute("lang") === "es" ? "vuelve" : "come back");
      var i = 0;
      (function step() {
        document.title = msg.slice(0, ++i) + "_";
        if (i < msg.length) timer = setTimeout(step, 90);
      })();
    });
  }

  initTitle();

  initTyping();
})();
