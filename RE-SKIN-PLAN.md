# Plan de Re-Skin — DHMEX SKELETON

## Resumen

Todas las sections portadas del Custom tienen CSS inline ({% stylesheet %} o <style>).
El re-skin consiste en reemplazar ese CSS por las clases del design system PRO en base.css.
La logica Liquid y JS se mantiene INTACTA.

**Documentacion de referencia:** `DESIGN-SYSTEM.md` en este mismo folder.

---

## Orden de ejecucion (por prioridad)

### FASE 1 — Criticos (flujo de inscripcion)

| Task | Section | Archivo | Complejidad |
|------|---------|---------|-------------|
| #39 | Producto Inscripcion | sections/product-inscripcion.liquid | ALTA (2835 lineas) |
| #20 | Race Registration base | sections/race-registration.liquid | MEDIA |
| #21 | 5 Sedes | sections/race-registration-{sede}.liquid | MEDIA (crear 2 faltantes) |

### FASE 2 — Rankings y contenido importante

| Task | Section | Archivo | Complejidad |
|------|---------|---------|-------------|
| #22 | Ranking 2025 | sections/ranking-2025.liquid | MEDIA |
| #23 | Ranking Overall 2025 | sections/ranking-overall-2025.liquid | MEDIA |
| #27 | Sponsor Contributions | sections/sponsor-contributions.liquid | MEDIA |
| #28 | Hero Video | sections/hero-video.liquid | MEDIA |

### FASE 3 — Sections secundarias

| Task | Section | Archivo | Complejidad |
|------|---------|---------|-------------|
| #25 | Rifa Promo Banner | sections/rifa-promo-banner.liquid | BAJA |
| #26 | Brand Showcase | sections/brand-showcase.liquid | BAJA |
| #29 | Article | sections/article.liquid | BAJA |
| #30 | Blog | sections/blog.liquid | BAJA |
| #31 | Collection (section) | sections/collection.liquid | BAJA |
| #32 | Collections | sections/collections.liquid | BAJA |
| #33 | 404 | sections/404.liquid | BAJA |
| #34 | Page | sections/page.liquid | BAJA |
| #35 | Custom Section | sections/custom-section.liquid | BAJA |

### FASE 4 — Templates y admin

| Task | Section | Archivo | Complejidad |
|------|---------|---------|-------------|
| #36 | Customer Login/Register | templates/customers/login.liquid, register.liquid | MEDIA |
| #37 | Templates JSON faltantes | templates/*.json | MEDIA |
| #38 | Actualizar PROYECTO.md | PROYECTO.md | BAJA |

---

## Proceso por section

```
PARA CADA SECTION:

1. LEER archivos:
   - Custom: dhmexraces-custom/sections/{nombre}.liquid (fuente de verdad logica)
   - SKELETON: DHMEX SKELETON/sections/{nombre}.liquid (estado actual)
   - DESIGN-SYSTEM.md (referencia de clases y patrones)

2. COMPARAR Custom vs SKELETON:
   - Si SKELETON tiene logica diferente al Custom → tomar logica del Custom
   - Si SKELETON ya tiene logica correcta → solo cambiar CSS

3. IDENTIFICAR que cambiar:
   - HTML: reemplazar clases custom por clases PRO (ver mapping en cada task)
   - CSS: eliminar {% stylesheet %} o <style> inline completo
   - Animaciones: data-aos="fade-up" → class="reveal"
   - Si es pagina standalone: agregar padding-top: calc(var(--header-height) + var(--space-lg))

4. QUE NO CAMBIAR:
   - {% form %} tags
   - {% for %} loops
   - <script> blocks
   - {% schema %} blocks
   - Liquid variables y assigns
   - JS functions (onclick, fetch, etc)
   - Hidden inputs
   - Data attributes (data-variant-id, data-block-id, etc)
   - API URLs
   - Metafield references

5. VERIFICAR:
   - Todas las clases CSS usadas existen en base.css
   - Si falta alguna clase → agregarla a base.css
   - Schema settings siguen funcionando
   - Grid responsive funciona (1→2→3 columnas)

6. MARCAR TAREA como completada
```

---

## 5 Sedes del Campeonato 2026

| # | Sede | Producto Shopify | Section | Estado |
|---|------|-----------------|---------|--------|
| 1 | Guanajuato | inscripcion-guanajuato-2026 | race-registration-guanajuato.liquid | EXISTE |
| 2 | Puebla | inscripcion-sede-1-puebla | race-registration-puebla.liquid | EXISTE |
| 3 | Guadalajara | inscripcion-sede-2-guadalajara | race-registration-guadalajara.liquid | EXISTE |
| 4 | Ixtapan de la Sal | inscripcion-sede-4-ixtapan-de-la-sal | race-registration-ixtapan.liquid | FALTA CREAR |
| 5 | Taxco (FINAL) | inscripcion-sede-5-taxco-final-urbano | race-registration-taxco.liquid | FALTA CREAR |

---

## Mapping de clases: Custom → PRO

### Patrones generales

| Custom | PRO |
|--------|-----|
| `.registration` | `.section` + `.container` |
| `.registration__title` | `.heading-lg` |
| `.registration__subtitle` | `.body-text--lg` + color `--text-secondary` |
| `.registration-card` | `.ticket-card` |
| `.registration-card__button` | `.btn .btn--primary` |
| `.ranking` | `.ranking-section` |
| `.ranking-card` | `.ranking-sede` |
| `.category-filters` | `.ranking-filters` |
| `.category-filter` | `.ranking-filter` |
| `.ranking-card__header` | `.ranking-sede__header` |
| `.contributions__title` | `.heading-lg` |
| `.contributions__stats` | `.stats` grid |
| `.contributions__stat-value` | `.stat__number` |
| `.hero-video` | `.hero` |
| `.hero-video__background` | `.hero__bg` |
| `data-aos="fade-up"` | `class="reveal"` |
| `data-aos-delay="100"` | `class="reveal reveal--delay-1"` |
| `data-aos-delay="200"` | `class="reveal reveal--delay-2"` |

### Para paginas standalone (no homepage)
```html
<!-- Agregar padding-top para compensar header fijo -->
<section style="padding-top: calc(var(--header-height) + var(--space-lg));">
<!-- O usar clase existente como .ranking-section, .kit-section, etc -->
```

---

## Notas importantes

- **base.css tiene 2887 lineas** con clases para TODOS los componentes del tema
- **NO usar AOS** — PRO usa IntersectionObserver nativo con clase .reveal
- **NO agregar librerias CDN** — solo las que ya estan (GSAP, CountUp, Google Fonts)
- **Bordes siempre rgba** semi-transparentes, nunca solidos
- **Fuentes siempre monospace** — Space Mono (headings) + IBM Plex Mono (body)
- **Todas las secciones del Custom usan {% stylesheet %}** — esto se ELIMINA completamente
- **Algunas secciones del Custom usan <style> inline** — esto tambien se elimina
