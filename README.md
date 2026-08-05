# victoriapuig.com

Sitio de la Lic. Victoria Puig — Psicóloga. Una sola página estática, servida
por GitHub Pages desde la raíz del repo (rama `main`).

**No hay build en producción.** Todo lo que se sirve está commiteado. Los pasos
de abajo se corren en local y su resultado (`styles.css`, imágenes) se commitea.

---

## Estructura

```
index.html         La página entera (marcado, JSON-LD, JS embebido)
404.html           Página de error
styles.css         ← GENERADO. No editar a mano. Sale de src/input.css
src/input.css      Fuente del CSS: @font-face + directivas de Tailwind + estilos propios
tailwind.config.js Config de Tailwind (fijada en la v3.4.17)
tools/images.mjs   Script que genera las variantes de imagen
fonts/             Fuentes autohospedadas (Inter y Playfair Display, variables)
img/               Imágenes. Las que tienen sufijo de ancho son generadas
robots.txt         Incluye permisos explícitos para crawlers de IA
sitemap.xml        Una sola URL (la home)
llms.txt           Datos duros de la práctica, para asistentes de IA
CNAME              victoriapuig.com — GitHub Pages sirve el apex
.nojekyll          Evita que GitHub Pages procese el sitio con Jekyll
```

---

## Cómo trabajar

```bash
npm install        # una sola vez
npm run serve      # levanta el sitio en local
```

### ⚠️ Si tocás clases de Tailwind en el HTML

`styles.css` está **compilado**. Tailwind escanea el HTML y genera solo las
clases que encuentra. Si agregás una clase nueva (por ejemplo `bg-teal-500`) y
no recompilás, **la clase no existe en el CSS y no hace nada**.

```bash
npm run css        # recompila styles.css — correlo antes de commitear
npm run css:watch  # o dejalo corriendo mientras editás
```

Hay que commitear el `styles.css` resultante.

### Si cambiás una imagen

```bash
npm run img        # regenera logo, variantes del hero y la imagen de Open Graph
```

Fuentes: `img/logo.svg` y `img/foto_victoria_puig.webp`. El resto de los
archivos de `img/` son generados por ese script.

---

## Decisiones que conviene no romper

- **Tailwind está fijado en la 3.4.17.** Es la versión que servía el CDN.
  La v4 cambia el color por defecto de `border` (de `gray-200` a
  `currentColor`) y el sitio usa `border` pelado en varios lugares: migrar sin
  revisar el diseño rompe los bordes.
- **El dominio canónico es el apex `https://victoriapuig.com/`** (con barra
  final). `www` hace 301 al apex. Canonical, `og:url`, sitemap, robots.txt y el
  JSON-LD tienen que apuntar todos ahí.
- **`#AD4E3B` es el color de texto y de los botones** (contraste 5.34:1 sobre blanco, cumple
  WCAG AA). `#E88D7D` quedó solo para elementos decorativos: sobre blanco da
  2.46:1 y no se puede usar para texto.
- **El logo es un raster.** `img/logo.svg` pesa 1.79 MB (es un trazado
  automático de 2037 paths) y se renderiza a 38 px de alto. Se usa
  `img/logo-160.webp` (7.7 KB). El SVG queda como fuente para `npm run img`.
- **Nada de `aggregateRating` ni testimonios inventados.** Google ignora las
  reseñas auto-declaradas en `LocalBusiness` desde 2019, y publicar valoraciones
  falsas viola sus políticas. Las reseñas reales van en el Perfil de Empresa de
  Google.

---

## Analítica

GA4, ID `G-PVJCEH60ED`, cargado en el `<head>`. Los eventos de conversión se
disparan desde un listener delegado al final de `index.html`:

| Evento | Cuándo |
|---|---|
| `contacto_whatsapp` | clic en cualquier enlace `wa.me` |
| `click_telefono` | clic en cualquier enlace `tel:` |
| `click_instagram` | clic a Instagram |
| `click_maps` | clic a Google Maps (con dimensión `sede`) |
| `generate_lead` | WhatsApp, teléfono o formulario enviado con éxito |
| `form_submit_success` / `form_submit_error` | resultado del formulario |

En GA4 → Administrar → Eventos hay que marcar **`generate_lead` como evento
clave** para que aparezca en los informes de conversiones.

El formulario postea a Formspree (`https://formspree.io/f/mdakjdyv`).

---

## Verificación

- Search Console: verificado por archivo HTML (`googlebb16881efbb0a6eb.html`)
  y por meta tag de respaldo en el `<head>`.
- Datos estructurados: https://validator.schema.org
- Rendimiento: `npm run serve` y correr Lighthouse en modo móvil.
