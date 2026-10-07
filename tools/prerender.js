/*
  Bakes the CV content into static HTML so it exists before any JavaScript
  runs. Crawlers, link unfurlers and ATS scrapers that do not execute JS
  see the real CV, in the right language.

      node tools/prerender.js

  Writes:
    index.html      English  (https://rene-guerrero.github.io/cv/)
    es/index.html   Spanish  (https://rene-guerrero.github.io/cv/es/)

  index.html is both the template and the English output: re-running is
  idempotent. The Spanish page is derived from it. Run this after editing
  assets/js/data.js. The markup mirrors the render functions in
  assets/js/main.js - keep the two in step.
*/
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const SITE = "https://rene-guerrero.github.io/cv/";

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/js/data.js"), "utf8"), ctx);
const CV = ctx.window.CV;

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? undefined : a[k]), o);

/* Page-level metadata that is not part of data.js. */
const META = {
  en: {
    title: "René Guerrero Pérez — Senior Full Stack Software Engineer",
    desc: "Senior Full Stack Software Engineer building insurance platforms with C# / .NET, Angular, Azure and SQL Server. 8+ years of experience. Remote.",
    ogDesc: "Insurance software · C# / .NET · Angular · Azure · SQL Server. 8+ years of experience.",
    ldDesc: "Senior Full Stack Engineer with 8+ years of experience, the last six building a multi-tenant insurance platform with C#, .NET, Angular, SQL Server and Microsoft Azure.",
    locale: "en_US", altLocale: "es_ES"
  },
  es: {
    title: "René Guerrero Pérez — Ingeniero de Software Full Stack Senior",
    desc: "Ingeniero de Software Full Stack Senior que construye plataformas de seguros con C# / .NET, Angular, Azure y SQL Server. 8+ años de experiencia. Remoto.",
    ogDesc: "Software para seguros · C# / .NET · Angular · Azure · SQL Server. 8+ años de experiencia.",
    ldDesc: "Ingeniero Full Stack Senior con más de 8 años de experiencia, los últimos seis construyendo una plataforma multi-tenant para seguros con C#, .NET, Angular, SQL Server y Microsoft Azure.",
    locale: "es_ES", altLocale: "en_US"
  }
};

function experience(t) {
  return t.exp.items.map((j) =>
    `<article class="card job"><header class="job__head">` +
    `<h3 class="card__title"><span class="job__company">${esc(j.company)}</span><span class="dot">·</span><span class="job__role">${esc(j.role)}</span></h3>` +
    `<p class="card__meta"><span class="when">${esc(j.when)}</span>` +
    (j.where ? `<span class="dot">·</span><span>${esc(j.where)}</span>` : "") +
    (j.current ? `<span class="chip chip--live">● live</span>` : "") +
    `</p></header><ul class="bullets">${j.bullets.map((b) => `<li>${md(b)}</li>`).join("")}</ul></article>`
  ).join("");
}

function results(t) {
  return t.about.results.map((r) =>
    `<li class="result"><span class="result__n">${esc(r.n)}</span><span class="result__l">${esc(r.l)}</span></li>`
  ).join("");
}

function skills(t) {
  return t.skills.groups.map((g) =>
    `<div class="skillgroup"><h3 class="skillgroup__name">${esc(g.name)}</h3><ul class="tags">` +
    g.items.map((i) => `<li class="${t.skills.core.includes(i) ? "tag tag--core" : "tag"}">${esc(i)}</li>`).join("") + `</ul></div>`
  ).join("");
}

/* Fill the i18n text nodes and the experience / skills regions of `html`. */
function fill(html, lang) {
  const t = CV[lang];
  const region = (name, body) => {
    const re = new RegExp(`(<!--pre:${name}-->)[\\s\\S]*?(<!--/pre:${name}-->)`);
    if (!re.test(html)) throw new Error(`marker pre:${name} not found`);
    html = html.replace(re, (_, a, b) => a + body + b);
  };
  region("experience", experience(t));
  region("skills", skills(t));
  region("results", results(t));

  // plain-text i18n nodes: <x data-i18n="key">text</x>
  html = html.replace(/(data-i18n="([^"]+)"[^>]*>)([^<]*)(<\/)/g, (m, open, key, _old, close) => {
    const v = get(t, key);
    return typeof v === "string" ? open + esc(v).replace(/&#39;/g, "'") + close : m;
  });

  return html;
}

const file = path.join(root, "index.html");

/* ── English: index.html in place ───────────────────────────── */
const en = fill(fs.readFileSync(file, "utf8"), "en");
fs.writeFileSync(file, en);

/* ── Spanish: es/index.html derived from it ─────────────────── */
let es = fill(en, "es");
const m = META.es;

const swap = (re, to) => {
  if (!re.test(es)) throw new Error("pattern not found: " + re);
  es = es.replace(re, to);
};

swap(/<html lang="en" data-theme="dark" data-base="">/, '<html lang="es" data-theme="dark" data-base="../">');
swap(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`);
swap(/(<meta name="description" content=")[^"]*(")/, `$1${esc(m.desc)}$2`);
swap(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE}es/$2`);
swap(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(m.title)}$2`);
swap(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(m.ogDesc)}$2`);
swap(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE}es/$2`);
swap(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${esc(m.title)}$2`);
swap(/(<meta property="og:locale" content=")[^"]*(")/, `$1${m.locale}$2`);
swap(/(<meta property="og:locale:alternate" content=")[^"]*(")/, `$1${m.altLocale}$2`);
swap(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(m.title)}$2`);
swap(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(m.ogDesc)}$2`);
swap(/("jobTitle": ")[^"]*(")/, `$1${CV.es.hero.role}$2`);
swap(/("description": ")[^"]*(",\s*\n\s*"url")/, `$1${m.ldDesc}$2`);
// language switch: from /es/ the targets flip
swap(/href="es\/"/, 'href="./"');
swap(/href="\.\/" aria-label="English"/, 'href="../" aria-label="English"');

// every relative asset reference moves one directory up
es = es.replace(/(src|href)="assets\//g, '$1="../assets/');

fs.mkdirSync(path.join(root, "es"), { recursive: true });
fs.writeFileSync(path.join(root, "es", "index.html"), es);

console.log("prerendered: index.html (en), es/index.html (es)");
