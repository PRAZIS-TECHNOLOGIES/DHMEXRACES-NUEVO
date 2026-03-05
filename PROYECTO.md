# DHMEX SKELETON - Documentacion del Proyecto

## Que es este proyecto

DHMEX SKELETON es la fusion de dos temas Shopify de DHMEXRACES:

- **DHMEX PRO** (`C:\Users\gibra\PRAZIS DEV\DHMEX PRO`) — Tema con UI/UX premium nueva (design system, GSAP, tipografia mono, dark theme)
- **DHMEXRACES Custom** (`C:\Users\gibra\PRAZIS DEV\DHMEXRACES-theme\dhmexraces-custom`) — Tema live actual con todo el backend funcional (carrito, Google Sheets, webhooks, rankings, descuentos)

La estrategia es: **PRO como base visual, Custom como fuente de logica backend**.

**ESTADO: RE-SKIN COMPLETADO** — Todas las sections re-skineadas al design system PRO. Sin CSS inline. Listo para testing y deploy.

---

## Estructura actual del tema

```
C:\Users\gibra\PRAZIS DEV\DHMEX SKELETON\
|
|-- layout/
|   |-- theme.liquid                    # Layout principal (PRO base + meta-tags Custom)
|   |-- password.liquid                 # Layout para pagina de password
|
|-- assets/
|   |-- base.css                        # Design system completo de PRO (~3235 lineas, incluye inscripcion + auth)
|   |-- theme.js                        # JS modular de PRO
|
|-- config/
|   |-- settings_schema.json            # Settings merge (PRO colores + campeonato + redes)
|
|-- locales/
|   |-- en.default.json                 # Traducciones del Custom
|
|-- snippets/
|   |-- css-variables.liquid            # Variables CSS + brand colors DHMEX
|   |-- meta-tags.liquid                # SEO/OG tags (del Custom)
|   |-- image.liquid                    # Helper de imagen responsive
|   |-- product-card.liquid             # Card de producto (PRO)
|
|-- sections/
|   |-- header.liquid                   # Header con nav numerado, logo texto, mobile menu
|   |-- footer.liquid                   # Footer 4 columnas, social, copyright
|   |-- hero.liquid                     # Hero con YouTube/MP4/imagen, countdown, CTA
|   |-- hero-video.liquid               # Hero video alternativo (re-skinned)
|   |-- about-event.liquid              # Seccion "Sobre el campeonato" con stats CountUp
|   |-- horizontal-stats.liquid         # Scroll horizontal GSAP con sedes
|   |-- race-dates.liquid               # Cards de sedes con status open/closed/upcoming
|   |-- tickets.liquid                  # Inscripciones tipo ticket card con form
|   |-- gallery.liquid                  # Galeria asimetrica con reveal
|   |-- sponsors.liquid                 # Grid de sponsors con logo/texto
|   |-- sponsor-contributions.liquid    # Contribuciones de patrocinadores (re-skinned)
|   |-- kit-rider.liquid                # Kit items con iconos SVG + premios
|   |-- merch-oficial.liquid            # Productos merch con handle lookup
|   |-- featured-collection.liquid      # Coleccion destacada con product-card
|   |-- ranking.liquid                  # Ranking por sede con filtros de categoria
|   |-- ranking-overall.liquid          # Overall dinamico (fetch + calculo JS)
|   |-- ranking-2025.liquid             # Ranking temporada 2025 (re-skinned)
|   |-- ranking-overall-2025.liquid     # Overall 2025 (re-skinned)
|   |-- bases-sorteo.liquid             # Sorteo FOX 40 con bases legales
|   |-- registration-form.liquid        # Formulario multi-step con validacion
|   |-- product-inscripcion.liquid      # Producto inscripcion completo (re-skinned, ~1137 lineas)
|   |-- product-inscripcion-original.liquid # Backup del producto inscripcion original
|   |-- race-registration.liquid        # Registro base con variantes como cards (re-skinned)
|   |-- race-registration-guanajuato.liquid # SEDE 1 - Guanajuato (re-skinned)
|   |-- race-registration-puebla.liquid     # SEDE 2 - Puebla (re-skinned)
|   |-- race-registration-guadalajara.liquid # SEDE 3 - Guadalajara (re-skinned)
|   |-- race-registration-ixtapan.liquid    # SEDE 4 - Ixtapan de la Sal (creada nueva)
|   |-- race-registration-taxco.liquid      # SEDE 5 - Taxco Final Urbano (creada nueva)
|   |-- rifa-promo-banner.liquid        # Banner promo rifa (re-skinned)
|   |-- brand-showcase.liquid           # Marcas showcase (re-skinned)
|   |-- article.liquid                  # Articulo blog (re-skinned)
|   |-- blog.liquid                     # Listado blog (re-skinned)
|   |-- collection.liquid               # Coleccion (re-skinned)
|   |-- collections.liquid              # Listado colecciones (re-skinned)
|   |-- 404.liquid                      # Pagina 404 (re-skinned)
|   |-- page.liquid                     # Pagina generica (re-skinned)
|   |-- custom-section.liquid           # Seccion custom (re-skinned)
|   |-- patrocinio-shimano.liquid       # Patrocinio Shimano
|   |-- password.liquid                 # Pagina de password
|   |-- search.liquid                   # Pagina de busqueda
|
|-- templates/
|   |-- index.json                      # Homepage
|   |-- cart.liquid                     # Carrito custom (descuentos, jersey sync)
|   |-- product.liquid                  # Producto generico
|   |-- product.inscripcion-guanajuato-2026.json      # Inscripcion SEDE 1
|   |-- product.inscripcion-sede-1-puebla.json        # Inscripcion SEDE 2
|   |-- product.inscripcion-sede-2-guadalajara.json   # Inscripcion SEDE 3
|   |-- product.inscripcion-sede-4-ixtapan-de-la-sal.json # Inscripcion SEDE 4
|   |-- product.inscripcion-sede-5-taxco-final-urbano.json # Inscripcion SEDE 5
|   |-- page.inscripcion-guanajuato.json    # Pagina registro SEDE 1
|   |-- page.inscripcion-puebla.json        # Pagina registro SEDE 2
|   |-- page.inscripcion-guadalajara.json   # Pagina registro SEDE 3
|   |-- page.inscripcion-ixtapan.json       # Pagina registro SEDE 4
|   |-- page.inscripcion-taxco.json         # Pagina registro SEDE 5
|   |-- page.patrocinadores.json        # Pagina patrocinadores
|   |-- page.ranking-2026.json          # Ranking temporada 2026
|   |-- page.ranking-2026-demo.json     # Demo del ranking
|   |-- page.ranking-2025.json          # Ranking temporada 2025
|   |-- page.ranking.json               # Ranking generico
|   |-- page.ranking-overall.json       # Overall general
|   |-- page.ranking-overall-2025.json  # Overall 2025
|   |-- page.kit-rider.json             # Kit del Rider
|   |-- page.kit-rider-demo.json        # Demo Kit del Rider
|   |-- page.merch-oficial.json         # Merch Oficial
|   |-- page.merch-oficial-demo.json    # Demo Merch
|   |-- page.bases-sorteo.json          # Sorteo FOX 40
|   |-- page.bases-sorteo-demo.json     # Demo Sorteo
|   |-- page.registration-form.json     # Formulario de inscripcion
|   |-- customers/login.liquid          # Login (re-skinned con auth__* classes)
|   |-- customers/register.liquid       # Registro (re-skinned con auth__* classes)
|   |-- 404.liquid                      # Pagina 404
|   |-- password.json                   # Template password
|   |-- search.json                     # Template busqueda
```

---

## Sedes del Campeonato 2026

| # | Sede | Producto Shopify | Section Registro | Template Producto | Template Pagina |
|---|------|-----------------|-----------------|-------------------|-----------------|
| 1 | Guanajuato | inscripcion-guanajuato-2026 | race-registration-guanajuato.liquid | product.inscripcion-guanajuato-2026.json | page.inscripcion-guanajuato.json |
| 2 | Puebla | inscripcion-sede-1-puebla | race-registration-puebla.liquid | product.inscripcion-sede-1-puebla.json | page.inscripcion-puebla.json |
| 3 | Guadalajara | inscripcion-sede-2-guadalajara | race-registration-guadalajara.liquid | product.inscripcion-sede-2-guadalajara.json | page.inscripcion-guadalajara.json |
| 4 | Ixtapan de la Sal | inscripcion-sede-4-ixtapan-de-la-sal | race-registration-ixtapan.liquid | product.inscripcion-sede-4-ixtapan-de-la-sal.json | page.inscripcion-ixtapan.json |
| 5 | Taxco (FINAL) | inscripcion-sede-5-taxco-final-urbano | race-registration-taxco.liquid | product.inscripcion-sede-5-taxco-final-urbano.json | page.inscripcion-taxco.json |

---

## Re-skin completado

Todas las sections han sido re-skineadas. El proceso elimino:
- Todos los bloques `{% stylesheet %}` inline
- Todos los bloques `<style>` inline
- Todas las referencias a `data-aos` (reemplazadas por `.reveal`)
- Todas las clases Custom (reemplazadas por clases PRO de base.css)

### CSS agregado a base.css durante el re-skin

| Componente | Lineas aprox | Descripcion |
|-----------|-------------|-------------|
| `.inscripcion__*` | ~348 | Formulario de inscripcion completo (categorias, galeria, carrito, FOMO, timeline, tour) |
| `.auth__*` | ~80 | Login y registro (card, fields, inputs, submit, error, success, benefits) |
| `.loading-spinner` | ~15 | Spinner de carga con keyframes |

---

## Dependencias externas

El tema carga estas librerias desde CDN:

| Libreria | Version | Uso |
|----------|---------|-----|
| Google Fonts (Space Mono + IBM Plex Mono) | latest | Tipografia |
| GSAP | 3.12.7 | Animaciones, ScrollTrigger |
| CountUp.js | 2.8.0 | Animacion de numeros en stats |

El carrito (`templates/cart.liquid`) hace fetch a:
- `https://dhmexraces-webhooks.vercel.app/api/inventory` — Para sincronizar jerseys promo con inventario

---

## Tareas pendientes

| # | Tarea | Prioridad |
|---|-------|-----------|
| 1 | **Testing end-to-end** | ALTA — Probar flujo: sedes -> inscripcion -> carrito -> registro -> checkout |
| 2 | **Evaluar section groups** | MEDIA — Decidir si usar `{% sections 'header-group' %}` para banners desde admin |
| 3 | **Deploy a Shopify** | CUANDO LISTO — Usar `shopify theme push` para subir como tema de desarrollo |

---

## Rutas de los proyectos

| Proyecto | Ruta |
|----------|------|
| DHMEX SKELETON (este proyecto) | `C:\Users\gibra\PRAZIS DEV\DHMEX SKELETON` |
| DHMEX PRO (UI fuente) | `C:\Users\gibra\PRAZIS DEV\DHMEX PRO` |
| DHMEXRACES Custom (tema live, backend fuente) | `C:\Users\gibra\PRAZIS DEV\DHMEXRACES-theme\dhmexraces-custom` |
| DHMEXRACES Webhooks (API Vercel) | `C:\Users\gibra\PRAZIS DEV\DHMEXRACES-theme\dhmexraces-webhooks` |
