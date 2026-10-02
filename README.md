# CV — René Guerrero Pérez

CV personal en formato web, con estética de consola. Sitio estático: HTML, CSS y JavaScript, sin frameworks ni build.

## Características

- **Tema claro / oscuro** — detecta la preferencia del sistema y recuerda la elección (`localStorage`).
- **Español / Inglés** — todo el contenido vive en [`assets/js/data.js`](assets/js/data.js); el idioma inicial se toma del navegador y también se recuerda.
- **Descarga en PDF** — el botón `PDF` descarga un fichero ya generado (`assets/pdf/`), uno por idioma. Se construyen con [`tools/build-pdf.ps1`](tools/build-pdf.ps1), que imprime `index.html` con la hoja de estilos de impresión usando Chrome headless.
- El **teléfono no está en ninguna parte de este repositorio**. Ocultarlo con CSS
  no habría servido: seguiría en el HTML, legible para buscadores y scrapers — y el
  PDF servido desde aquí es igual de público e indexable. Vive en
  `tools/private.local.json` (ignorado por git); si ese fichero existe, el script
  genera además un PDF con el número en `private/`, también fuera de git. Ese es el
  que se adjunta al aplicar a una empresa; el que se descarga desde la web no lo lleva.
- **Tecleo** de las líneas de prompt: cada comando se escribe solo la primera vez que su bloque entra en pantalla.
- **Consola interactiva** al final de la página: `help`, `whoami`, `skills azure`, `theme light`, `lang en`, `pdf`… con historial (↑/↓) y autocompletado (Tab).
- **Analítica** con GoatCounter (sin cookies, sin banner de consentimiento). El
  script se inyecta desde JavaScript y **solo en el host de producción**: las
  compilaciones de PDF y de imágenes renderizan la página desde `127.0.0.1` y el
  trabajo local corre en `localhost`, así que ninguno cuenta como visita. Además
  de las visitas se registra un evento por cada **descarga del PDF**.
  Panel: `https://rene.goatcounter.com`
- **Portada de LinkedIn** (`assets/img/linkedin-cover.png`, 1584×396): el propio fondo del sitio en modo oscuro, capturado a la medida del banner.
- **Tarjeta social** (`assets/img/og.png`, 1200×630) y **datos estructurados** JSON-LD `Person`, para que el link se vea bien al compartirlo y Google entienda de quién es la página. La tarjeta se regenera con `pwsh tools/build-og.ps1` desde `tools/og/og.html`.
- **Tipografía autoalojada** (JetBrains Mono, ~120 KB): sin petición bloqueante a Google Fonts ni fuga de IPs a terceros. Se regenera con `python tools/fetch-fonts.py`.
- **Certificaciones** — tarjetas con scroll horizontal (las 4 más recientes + enlace a LinkedIn). LinkedIn no tiene API pública ni permite scraping, así que se alimenta de su exportación oficial: pedir *Certifications* en Ajustes → Privacidad de datos → Obtener una copia de tus datos y ejecutar `python tools/build-certs.py Certifications.csv`, que regenera `assets/js/certs.js`. La web ordena por fecha y muestra las nuevas sin tocar código; con la lista vacía la sección se oculta.
- Responsive y navegable por teclado.

### Sobre `prefers-reduced-motion`

La página **no** respeta esta preferencia para sus efectos decorativos (tecleo,
rejilla de fondo, punto de disponibilidad), por decisión explícita: son la
gracia del diseño, no mueven el layout y ninguno parpadea de forma agresiva.
Sí se respeta para el desplazamiento suave y el cursor que parpadea.

Para honrarla por completo, añadir en `style.css`:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

## Estructura

```
index.html
assets/
  css/style.css     estilos + hoja de impresión (@media print)
  js/data.js        contenido del CV en ES y EN
  js/main.js        i18n, tema, render, tecleo, consola y PDF
  fonts/            JetBrains Mono (woff2, OFL)
  img/me-512.jpg    foto (recortada y redimensionada desde input/)
  pdf/              PDFs generados (versionados)
tools/build-pdf.ps1 regenera los PDFs
tools/fetch-fonts.py  reautoaloja las fuentes
tools/build-og.ps1  regenera la tarjeta social y la portada
input/              fuentes originales (ignorado por git)
```

## Editar el contenido

Todo el texto está en `assets/js/data.js`, con la misma forma para `es` y `en`.
Dentro de las viñetas de experiencia se admite `**negrita**`.

> **Importante:** después de editar el contenido hay que regenerar los PDFs,
> o la descarga quedará desfasada respecto a la web:
>
> ```
> pwsh tools/build-pdf.ps1
> ```
>
> El script necesita Chrome o Edge (Brave se cuelga en modo headless) y `python`.
> También acepta `?lang=es` / `?lang=en` en la URL para forzar el idioma.

## Ejecutar localmente

Basta con abrir `index.html` en el navegador. Para servirlo:

```bash
python -m http.server 8000
```

## Publicar en GitHub Pages

> **Antes de publicar:** las etiquetas Open Graph y el JSON-LD llevan la URL
> absoluta `https://rene-guerrero.github.io/cv` escrita a mano en `index.html`
> (los crawlers no resuelven rutas relativas). Si el repositorio se llama de otra
> forma, hay que reemplazarla en todas sus apariciones de ese fichero.

1. Crear el repositorio en GitHub y subir esta carpeta.
2. En **Settings → Pages**, elegir *Deploy from a branch* → rama `main`, carpeta `/ (root)`.
3. El sitio queda en `https://<usuario>.github.io/<repo>/`.
