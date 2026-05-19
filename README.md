SEO & IA Quick Actions

1) Revisar y enviar sitemap
- Abre Google Search Console y agrega la propiedad `https://www.victoriapuig.com`.
- Sube/verifica usando un método (etiqueta HTML, DNS, o Google Analytics).
- En Search Console > Sitemaps pega `https://www.victoriapuig.com/sitemap.xml` y envía.

2) Verificar indexación
- En Search Console usa "Inspeccionar URL" sobre la home y solicita indexación si es necesario.

3) Google Analytics (GA4)
- Reemplaza `MEASUREMENT_ID` en el head de `index.html` con tu ID de GA4 (formato `G-XXXXXXXXXX`).
- Si no tenés GA4 creado: https://analytics.google.com → Crear propiedad → Obtener Measurement ID.

4) Optimizar imágenes (sugerencias)
- Generar variantes `webp`/`avif` en múltiples anchos (e.g., 400, 800, 1200 px).
- Usar `srcset` y `sizes` en imágenes críticas. Ejemplo en `index.html`:

  <img src="img/foto_victoria_puig-800.webp" srcset="img/foto_victoria_puig-400.webp 400w, img/foto_victoria_puig-800.webp 800w, img/foto_victoria_puig-1200.webp 1200w" sizes="(max-width: 768px) 80vw, 40vw" alt="..." loading="lazy">

- Herramientas recomendadas:
  - Squoosh (GUI) o `@squoosh/cli` (Node) para compresión.
  - `imagemin-cli` + plugins: `npm i -D imagemin-cli imagemin-webp imagemin-mozjpeg`

5) Reseñas y Rich Snippets
- Si tenés reseñas reales, considera agregar `aggregateRating` JSON-LD con valores verificados.

6) Checklist final y pruebas
- En Search Console revisá cobertura e índice.
- Ejecutá PageSpeed Insights y Lighthouse para Core Web Vitals.
- Comprobá que `robots.txt` y `sitemap.xml` estén accesibles: `https://www.victoriapuig.com/robots.txt` y `/sitemap.xml`.

Si querés, puedo:
- Generar las variantes `webp` (necesito que subas las fuentes en `img/` con nombres indicados), o
- Preparar un `srcset` exacto si me confirmás los archivos disponibles, o
- Guiarte paso a paso para verificar el sitio en Google Search Console y añadir la propiedad.
