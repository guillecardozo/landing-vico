/**
 * Genera todas las variantes de imagen del sitio.
 *
 *   npm run img
 *
 * Se corre a mano cuando cambia una imagen fuente. Las variantes generadas
 * se commitean al repo: GitHub Pages sirve archivos estáticos, no hay build.
 *
 * Fuentes:
 *   img/logo.svg                  800x850, trazado automático (2037 paths, 1.79 MB)
 *   img/foto_victoria_puig.webp   1066x1600
 */
import sharp from "sharp";
import { statSync } from "node:fs";

const kb = (p) => (statSync(p).size / 1024).toFixed(1) + " KB";
const log = (p) => console.log(`  ${p.padEnd(44)} ${kb(p)}`);

// --- Logo -------------------------------------------------------------------
// Se renderiza a ~38px de alto, así que el vector no aporta nada. Rasterizamos.
// density alto = sharp rasteriza el SVG a buena resolución antes de reducir.
console.log("Logo:");
await sharp("img/logo.svg", { density: 600 })
  .resize({ width: 160 })
  .webp({ quality: 92 })
  .toFile("img/logo-160.webp");
log("img/logo-160.webp");

// El footer reusa el mismo archivo con `filter: brightness-0 invert` (silueta blanca).

// PNG para el campo `logo` del schema (Google prefiere PNG/JPG, no WebP).
await sharp("img/logo.svg", { density: 600 })
  .resize({ width: 320 })
  .png({ compressionLevel: 9 })
  .toFile("img/logo-320.png");
log("img/logo-320.png");

// --- Foto del hero ----------------------------------------------------------
// El contenedor nunca supera los 448 CSS px, así que 1066w cubre 2x DPR.
console.log("Hero:");
for (const w of [400, 600, 800, 1066]) {
  await sharp("img/foto_victoria_puig.webp")
    .resize({ width: w })
    .webp({ quality: 78 })
    .toFile(`img/foto_victoria_puig-${w}.webp`);
  log(`img/foto_victoria_puig-${w}.webp`);
}

// --- Imagen Open Graph ------------------------------------------------------
// La foto es retrato 1066x1600; OG necesita 1200x630 horizontal.
// `attention` recorta priorizando la zona de mayor interés (el rostro).
console.log("Open Graph:");
const og = () =>
  sharp("img/foto_victoria_puig.webp").resize({
    width: 1200,
    height: 630,
    fit: "cover",
    position: sharp.strategy.attention,
  });

await og().webp({ quality: 82 }).toFile("img/og-victoria-puig-1200x630.webp");
log("img/og-victoria-puig-1200x630.webp");

// JPG de respaldo: algunas versiones de WhatsApp no previsualizan WebP.
await og().jpeg({ quality: 84, mozjpeg: true }).toFile("img/og-victoria-puig-1200x630.jpg");
log("img/og-victoria-puig-1200x630.jpg");

console.log("\nListo.");
