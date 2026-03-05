# DHMEX PRO - Design System Reference

Este documento define el lenguaje visual completo del tema DHMEX PRO.
Toda section re-skineada DEBE seguir estos patrones para mantener consistencia.

---

## 1. Filosofia de Diseno

### Estetica: Dark Editorial Brutalist + Premium Sports

El tema combina tres corrientes:

1. **Brutalismo tipografico** — Fuentes monospace, uppercase agresivo, tracking negativo en headings
2. **Editorial deportiva** — Alto contraste, overlays dramaticos, grids apretados tipo revista
3. **Dark premium UI** — Negros profundos (#0A0A0A), bordes sutiles semi-transparentes, uso estrategico del color accent

### Referencias de diseno (citadas en CSS)
- **Johny Salido** — Navegacion indexada (01, 02, 03...), scroll horizontal, stats numerados
- **Rebellion** — Animaciones hover, accent-driven interactions, easing curves premium
- **Pebble Life** — Video backgrounds, overlays degradados, galeria asimetrica

### Principios clave
- **Monospace everywhere** — Heading y body son monospace. Esto define la identidad
- **Uppercase dominant** — Headings, labels, botones, nav — todo mayusculas
- **Restraint** — El accent se usa solo donde importa: CTAs, precios, posiciones, estados activos
- **Breathing room** — Spacing generoso vertical, gaps minimos horizontal (2px entre cards)
- **Subtle borders** — Nunca solidos, siempre rgba con opacidad baja
- **Purposeful animation** — Cada animacion tiene razon de ser, nunca decorativa

---

## 2. Colores

### Variables CSS principales

```css
--bg-primary      /* Fondo principal: #0A0A0A (casi negro) */
--bg-secondary    /* Fondo cards/alt: #141414 */
--text-primary    /* Texto principal: #FFFFFF */
--text-secondary  /* Texto secundario: #A0A0A0 */
--accent          /* Color acento: #FF4D00 (naranja DHMEX) */
--accent-hover    /* Accent hover: color-mix(in srgb, accent 80%, white) */
```

### Brand colors adicionales (css-variables.liquid)

```css
--color-primary   /* #E42C2C (rojo DHMEX) */
--color-secondary /* #0066B3 (azul) */
--color-gold      /* #FFD700 */
--color-success   /* #10B981 */
--color-error     /* #EF4444 */
--color-border    /* rgba(255, 255, 255, 0.1) */
```

### Cuando usar accent
- Botones primarios (`.btn--primary`)
- Precios (`.ticket-card__price`, `.inscripcion__price`)
- Estados activos (filtros, tabs, seleccion)
- Indices de navegacion (01, 02, 03)
- Medallas primer lugar / posiciones
- Hover underlines en nav
- Top bar de ticket cards

### Cuando NO usar accent
- Texto de cuerpo (usar `--text-primary` o `--text-secondary`)
- Bordes en estado normal (usar rgba)
- Fondos de cards (usar `--bg-secondary`)
- Iconos decorativos (usar `--text-secondary`)

### Bordes semi-transparentes (patron crucial)

| Uso | Valor |
|-----|-------|
| Borde card normal | `rgba(255, 255, 255, 0.06)` a `0.08` |
| Borde card hover | `rgba(255, 255, 255, 0.12)` a `0.15` |
| Divisor de seccion | `rgba(255, 255, 255, 0.06)` |
| Input border | `rgba(255, 255, 255, 0.15)` |
| Input focus | `var(--accent)` |
| Header accent line | `linear-gradient(90deg, var(--accent) 0%, transparent 60%)` |

### Colores de estado

| Estado | Color | Background |
|--------|-------|------------|
| Open (abierto) | `#22C55E` | `rgba(34, 197, 94, 0.1)` |
| Upcoming (proximo) | `var(--accent)` | `rgba(255, 77, 0, 0.1)` |
| Closed (cerrado) | `--text-secondary` | `rgba(255, 255, 255, 0.03)` |

---

## 3. Tipografia

### Fuentes

| Rol | Fuente | Carga |
|-----|--------|-------|
| Headings | `'Space Mono', monospace` | Google Fonts: 400, 700 |
| Body / Labels | `'IBM Plex Mono', monospace` | Google Fonts: 300-700 |

**Toda la tipografia es monospace.** Esto es intencional y no debe cambiarse.

### Escala tipografica

| Clase | Tamano | Peso | Spacing | Font | Uso |
|-------|--------|------|---------|------|-----|
| `.heading-xl` | `clamp(3rem, 8vw, 7rem)` | 700 | -0.05em | Heading | Titulo hero |
| `.heading-lg` | `clamp(2rem, 5vw, 4rem)` | 700 | -0.04em | Heading | Titulo de seccion |
| `.heading-md` | `clamp(1.25rem, 3vw, 2rem)` | 700 | -0.03em | Heading | Titulo de card |
| `.heading-sm` | `clamp(0.875rem, 1.5vw, 1.125rem)` | 400 | -0.02em | Heading | Subtitulos |
| `.label` | 11px | 500 | 0.08em | Body | Labels, categorias |
| `.body-text` | 14px | 400 | 0 | Body | Texto de cuerpo |
| `.body-text--lg` | `clamp(15px, 1.2vw, 18px)` | 400 | 0 | Body | Texto destacado |
| `.accent` | (hereda) | (hereda) | (hereda) | (hereda) | Color accent para texto |

### Patrones tipograficos
- **Headings**: Siempre uppercase, letter-spacing negativo, weight 700
- **Labels**: Siempre uppercase, letter-spacing positivo (0.06-0.10em), weight 500-600, font-size 10-11px
- **Body**: Normal case, 14px, line-height 1.7, color `--text-secondary`
- **Precios**: Font heading, weight 700, color accent, letter-spacing negativo

---

## 4. Spacing

### Sistema de espaciado (base 8px)

```css
--space-xs: 0.5rem   /* 8px */
--space-sm: 1rem     /* 16px */
--space-md: 2rem     /* 32px */
--space-lg: 4rem     /* 64px */
--space-xl: 8rem     /* 128px */
```

### Container

```css
--container-padding: 24px     /* mobile */
/* 48px a 768px+ */
/* 70px a 1024px+ */

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

### Donde usar cada nivel

| Nivel | Uso |
|-------|-----|
| `--space-xs` | Gaps minimos entre elementos inline, padding de badges |
| `--space-sm` | Gap entre items en lista, padding interno de componentes pequenos |
| `--space-md` | Gap entre cards en grid, separacion entre bloques de contenido |
| `--space-lg` | Margin entre secciones secundarias, margin bottom de section headers |
| `--space-xl` | Padding top/bottom de secciones principales |

### Gaps de grid

- **Grids de cards/productos**: `gap: 2px` (crea efecto tipo revista apretado)
- **Grids de ticket cards**: `gap: var(--space-md)` (respira mas, son cards grandes)
- **Grids de race dates**: `gap: var(--space-md)` (necesitan mas espacio por contenido)

---

## 5. Componentes

### 5.1 Sections

```html
<!-- Patron base de section -->
<section class="section">
  <div class="container">
    <div class="section__header">
      <div class="section__header-left">
        <span class="label">Subtitulo</span>
        <h2 class="heading-lg">Titulo de Seccion</h2>
      </div>
      <!-- Opcional: boton a la derecha -->
      <a href="#" class="btn btn--outline">Ver mas</a>
    </div>
    <!-- contenido -->
  </div>
</section>

<!-- Section con fondo alterno -->
<section class="section section--alt">...</section>

<!-- Divisor entre secciones -->
<div class="section__divider"></div>
```

**Patron `.section`**:
- Padding: `var(--space-xl) 0` (128px arriba/abajo)
- Alterno: `.section--alt` con `background: var(--bg-secondary)`
- Header: flex con label + heading a la izquierda, CTA opcional a la derecha

### 5.2 Botones

```html
<a class="btn btn--primary">Inscribirse</a>
<a class="btn btn--outline">Ver Detalles</a>
<a class="btn btn--primary btn--large">Accion Principal</a>
```

| Clase | Estilo |
|-------|--------|
| `.btn` | Base: padding 16px 40px, font 12px, uppercase, tracking 0.06em |
| `.btn--primary` | Fondo accent, texto blanco, hover: accent-hover + scale(0.98) |
| `.btn--outline` | Transparente, borde rgba 0.25, hover: borde accent + texto accent |
| `.btn--large` | Padding 20px 56px, font 14px |

### 5.3 Tags/Badges

```html
<span class="tag">Temporada 2026</span>
<span class="tag tag--accent">Abierto</span>
```

- Font 11px, uppercase, tracking 0.08em, padding 6px 14px
- Normal: borde rgba 0.15, texto secondary
- Accent: borde accent, texto accent

### 5.4 Cards

#### Product Card
```html
<a class="product-card">
  <div class="product-card__image">
    <img src="..." alt="...">
  </div>
  <div class="product-card__info">
    <span class="product-card__vendor">Vendor</span>
    <h3 class="product-card__title">Titulo</h3>
    <span class="product-card__price">$XXX</span>
  </div>
</a>
```

#### Ticket Card
```html
<div class="ticket-card">
  <h3 class="ticket-card__type">Elite</h3>
  <div class="ticket-card__price">$800 <small>MXN</small></div>
  <div class="ticket-card__features">
    <span class="ticket-card__feature">Cronometraje profesional</span>
    <span class="ticket-card__feature">Puntos campeonato</span>
  </div>
  <div class="ticket-card__cta">
    <a class="btn btn--primary">Inscribirse</a>
  </div>
</div>
```
- Borde sutil, padding grande, accent top bar aparece en hover (scaleX animacion)
- Features con `+` prefix en accent

#### Race Card
```html
<div class="race-card">
  <div class="race-card__image">
    <img>
    <div class="race-card__overlay"></div>
  </div>
  <div class="race-card__content">
    <div class="race-card__top">
      <span class="race-card__round">R1</span>
      <span class="race-card__status race-card__status--open">Abierta</span>
    </div>
    <h3 class="race-card__title">Puebla</h3>
    <div class="race-card__meta">
      <span class="race-card__meta-item">21 Mar 2026</span>
    </div>
    <a class="race-card__cta btn btn--outline">Inscribirse</a>
  </div>
</div>
```

### 5.5 Ranking Tables

```html
<div class="ranking-sede">
  <div class="ranking-sede__header">
    <div class="ranking-sede__info">
      <span class="ranking-sede__round">R1</span>
      <h3 class="ranking-sede__title">Puebla</h3>
    </div>
    <button class="ranking-sede__toggle">V</button>
  </div>
  <div class="ranking-sede__body">
    <div class="ranking-filters">
      <button class="ranking-filter is-active">Todos</button>
      <button class="ranking-filter">Elite</button>
    </div>
    <div class="ranking-table-wrap">
      <table class="ranking-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Rider</th>
            <th>Categoria</th>
            <th>Tiempo</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ranking-table__pos">
              <span class="ranking-medal ranking-medal--gold">1</span>
            </td>
            <td>Nombre</td>
            <td>Elite</td>
            <td>2:34.5</td>
            <td class="ranking-table__pts">100</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

### 5.6 Forms / Inputs

```html
<div class="line-property">
  <label class="line-property__label">Nombre del corredor</label>
  <input class="line-property__input" type="text" placeholder="Tu nombre">
</div>
```

- Input: transparent bg, borde rgba 0.15, focus borde accent, outline none
- Label: 11px uppercase, tracking 0.08em, color secondary

### 5.7 Inscripcion (Registration)

El PRO ya tiene un sistema completo de inscripcion con estas clases:
- `.inscripcion` — Layout principal (grid 2 columnas en desktop)
- `.inscripcion__section` — Cada paso del formulario
- `.inscripcion__cat-btn` — Botones de categoria seleccionable
- `.inscripcion__price-card` — Card de precio con badge y timeline
- `.inscripcion__toast` — Notificacion toast (slide from top)
- `.inscripcion__resumen` — Resumen de seleccion

---

## 6. Grids Responsive

### Breakpoints

| Nombre | Media Query | Uso |
|--------|-------------|-----|
| Mobile | Default (no query) | 1 columna |
| Small tablet | `min-width: 640px` | 2 columnas |
| Tablet | `min-width: 768px` | 2 columnas, padding mayor |
| Desktop | `min-width: 900px` | Nav visible, social visible |
| Desktop+ | `min-width: 1024px` | 3-4 columnas, padding 70px |
| Large | `min-width: 1200px` | 3 columnas race cards |

### Patron de grid responsive estandar

```css
.mi-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px; /* o var(--space-md) para cards grandes */
}

@media (min-width: 640px) {
  .mi-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .mi-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 7. Animaciones

### Reveal on Scroll

```html
<div class="reveal">Aparece al hacer scroll</div>
<div class="reveal reveal--delay-1">Con delay 0.1s</div>
<div class="reveal reveal--delay-2">Con delay 0.2s</div>

<div class="stagger-children">
  <div class="reveal">Hijo 1 (0s)</div>
  <div class="reveal">Hijo 2 (0.1s)</div>
  <div class="reveal">Hijo 3 (0.15s)</div>
</div>
```

- Efecto: opacity 0 + translateY(30px) → opacity 1 + translateY(0)
- Duracion: 0.8s con ease-out-quart
- Trigger: IntersectionObserver al 10% de visibilidad

### Easing functions

```css
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)       /* Para reveals, nav */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1)   /* Para transiciones bi-direccionales */
--ease-drawer: cubic-bezier(0.46, 0.01, 0.32, 1)      /* Para mobile menu */
```

### Hover patterns

| Elemento | Efecto | Duracion |
|----------|--------|----------|
| Boton | `scale(0.98)` + cambio de color | 0.3s ease |
| Card image | `scale(1.05)` en la imagen | 0.6s ease-out-quart |
| Card border | Opacidad aumenta (0.08 → 0.15) | 0.3s ease |
| Nav link | Underline width 0 → 100% | 0.4s ease-out-quart |
| Sponsor logo | grayscale → color | 0.3s ease |
| Table row | Background sutil aparece | 0.15s ease |
| Ticket card | Top accent bar scaleX(0 → 1) | 0.4s ease-out-quart |

### Nota sobre `data-aos`
Las sections del Custom usan `data-aos="fade-up"` (libreria AOS).
En PRO NO se usa AOS. Se usa la clase `.reveal` con IntersectionObserver nativo.
**Al re-skinear: reemplazar `data-aos="fade-up"` por `class="reveal"`.**

---

## 8. Paginas especificas con padding-top

Las paginas que NO son homepage necesitan compensar el header fijo:

```css
padding-top: calc(var(--header-height) + var(--space-lg));
```

Esto aplica a: ranking, kit-rider, merch, sorteo, inscripcion, product, cart, collection, 404.

Clases existentes que ya lo hacen:
- `.ranking-section`
- `.kit-section`
- `.merch-section`
- `.product-page`
- `.cart-page`
- `.collection-page`
- `.page-404`
- `.inscripcion`
- `.sorteo__hero`

---

## 9. Patron de Section Header

Todas las secciones deben usar el mismo patron de header:

```html
<div class="section__header reveal">
  <div class="section__header-left">
    <span class="label">ETIQUETA PEQUENA</span>
    <h2 class="heading-lg">TITULO PRINCIPAL</h2>
  </div>
  <!-- Opcional -->
  <a href="#" class="btn btn--outline">Ver Todo</a>
</div>
```

- Label en 11px uppercase tracking
- Heading en heading-lg o heading-md
- Flex con space-between, alineado al fondo
- Margin-bottom: `var(--space-lg)`

---

## 10. Checklist de Re-Skin

Para cada section del Custom que se re-skinee, verificar:

- [ ] Usar `<section class="section">` o clase especifica del design system
- [ ] Envolver en `<div class="container">`
- [ ] Header con patron `.section__header` + `.label` + `.heading-lg`
- [ ] Reemplazar `data-aos="fade-up"` por `class="reveal"`
- [ ] Reemplazar CSS inline / `{% stylesheet %}` por clases del design system
- [ ] Fuentes: heading font para titulos, body font para texto
- [ ] Uppercase en headings, labels, botones
- [ ] Bordes: usar rgba semi-transparentes, nunca solidos
- [ ] Spacing: usar variables `--space-*`, nunca valores hardcoded
- [ ] Botones: usar `.btn .btn--primary` o `.btn--outline`
- [ ] Grids: usar patron responsive 1→2→3 columnas
- [ ] Cards: hover con border-color increase, image scale(1.05)
- [ ] Padding-top con `calc(var(--header-height) + var(--space-lg))` si es pagina standalone
- [ ] Mantener toda la logica Liquid/JS del Custom intacta
- [ ] No agregar librerias nuevas (no AOS, no nuevos CDNs)

---

## Rutas de referencia

| Archivo | Descripcion |
|---------|-------------|
| `assets/base.css` | Design system completo (2887 lineas) |
| `assets/theme.js` | JS: reveal, countdown, countup, mobile menu, GSAP |
| `snippets/css-variables.liquid` | Variables CSS + brand colors |
| `sections/hero.liquid` | Referencia de section con hero pattern |
| `sections/product-inscripcion.liquid` | Referencia de formulario complejo |
| `sections/ranking.liquid` | Referencia de tablas con filtros |
| `sections/race-dates.liquid` | Referencia de cards con status |
