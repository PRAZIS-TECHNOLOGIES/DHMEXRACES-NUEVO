# COPA SCOTT DHMEXRACES 2026 — Documentacion Tecnica

> Campeonato nacional de Downhill MTB en Mexico.
> Marca: **DHMEXRACES** | Tech: **PRAZIS Technologies**

---

## Indice

1. [Arquitectura General](#arquitectura-general)
2. [Sedes del Campeonato 2026](#sedes-del-campeonato-2026)
3. [Categorias y Premios](#categorias-y-premios)
4. [Patrocinadores](#patrocinadores)
5. [Flujos del Sistema](#flujos-del-sistema)
6. [Google Sheets — Estructura de Datos](#google-sheets--estructura-de-datos)
7. [Webhooks API (Vercel)](#webhooks-api-vercel)
8. [Tema Shopify — Estructura](#tema-shopify--estructura)
9. [Reglas de Negocio](#reglas-de-negocio)
10. [Despliegue](#despliegue)

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                      USUARIO / CORREDOR                     │
│                    (Navegador / Movil)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                SHOPIFY STOREFRONT                           │
│            dhmexraces-demo.myshopify.com                    │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐  │
│  │  Tema    │  │ Carrito  │  │ Registro   │  │ Checkout │  │
│  │ Liquid   │  │ + Jersey │  │ Multi-step │  │ Shopify  │  │
│  │          │  │  Sync    │  │  Form      │  │          │  │
│  └──────────┘  └────┬─────┘  └────────────┘  └────┬─────┘  │
└──────────────────────┼────────────────────────────┼─────────┘
                       │                            │
                       │ fetch /api/inventory       │ Webhook: order/create
                       ▼                            ▼
┌─────────────────────────────────────────────────────────────┐
│              VERCEL — dhmexraces-webhooks                   │
│                                                             │
│  ┌────────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ order-created  │  │  inventory   │  │  check-in-pro  │  │
│  │ (QR, rifa,     │  │ (stock por   │  │ (escaneo QR,   │  │
│  │  corredor,     │  │  sede)       │  │  stats, kit)   │  │
│  │  email)        │  │              │  │                │  │
│  └───────┬────────┘  └──────────────┘  └────────────────┘  │
│          │                                                  │
│  ┌───────┴────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ manual-        │  │ sync-        │  │ update-        │  │
│  │ registration   │  │ finanzas     │  │ discount       │  │
│  │ (admin)        │  │ (CRON)       │  │ (jersey auto)  │  │
│  └────────────────┘  └──────────────┘  └────────────────┘  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     GOOGLE SHEETS                           │
│         Spreadsheet ID: 1XGe4vuVxsP...CqpFBg               │
│                                                             │
│  ┌────────────┐ ┌────────────┐ ┌──────┐ ┌────────────────┐ │
│  │ GUANAJUATO │ │ GUADALAJARA│ │ RIFA │ │   FINANZAS     │ │
│  │ PUEBLA     │ │ IXTAPAN   │ │      │ │   RESUMEN      │ │
│  │            │ │ TAXCO     │ │      │ │                │ │
│  └────────────┘ └────────────┘ └──────┘ └────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ {SEDE} NUMEROS — Numeros de corredor por sede       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   RESEND (Email)                            │
│              noreply@endhurorace.com                        │
│                                                             │
│  Email de confirmacion con:                                 │
│  - QR de check-in                                          │
│  - Numero de corredor                                      │
│  - Boleto de rifa (si aplica)                              │
│  - Datos del corredor                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Sedes del Campeonato 2026

| Sede | Ciudad | Fecha | Codigo | Status |
|------|--------|-------|--------|--------|
| SEDE 1 | Guanajuato | 21-22 Febrero | GTO | COMPLETADA (105 inscritos) |
| SEDE 2 | Guadalajara | 30-31 Mayo | GDL | Proxima — NO da boleto de rifa |
| SEDE 3 | Ixtapan de la Sal | 18-19 Julio | IXT | — |
| SEDE 4 | Puebla | Por confirmar | PUE | Da boleto de rifa |
| SEDE 5 | Taxco (Final Urbano) | 17-18 Octubre | TAX | — |

**Nota:** Puebla paso de Sede 2 a Sede 4. La rifa FOX 40 se realizara en Puebla.

---

## Categorias y Premios

### 14 Categorias

| Categoria | Rango de Edad | Premio en Efectivo |
|-----------|---------------|-------------------|
| Minis | 10-11 anos (obligatorio mochilero) | — |
| Infantil | 12-14 anos | — |
| Cadetes | 15-16 anos | — |
| Junior | 17-18 anos | 1ro $2,500 / 2do $1,500 / 3ro $1,000 |
| Senior | 19-29 anos | 1ro $2,500 / 2do $1,500 / 3ro $1,000 |
| Principiantes | Edad libre | — |
| Master 30 | 30-39 anos | — |
| Master 40 | 40-49 anos | — |
| Master 50 | 50+ anos | — |
| Femenil | Edad libre | — |
| PRO | 19+ anos | — |
| Elite | 19+ anos | 1ro $5,000 / 2do $3,000 / 3ro $2,000 |
| EBIKE | Edad libre | — |
| EBIKE Full Power | Edad libre | — |

**Premios por sede, en pesos mexicanos (MXN).**

### Inscripcion

- **Precio:** $1,500 MXN (fijo, puede haber descuentos emergentes no permanentes)
- **Incluye:** Acceso practica + carrera, puntos ranking, seguro accidentes, medalla, cronometraje

---

## Patrocinadores

| Tier | Marcas |
|------|--------|
| **Oro (Title)** | Scott |
| **Plata (Oficial)** | Motul, SRAM |
| **Bronce (Partners)** | Red Bull, RockShox, Fox Factory, Vittoria, Giro, Schwalbe, Traxion Suspension, Race Face, Syncross, Zefal, Mula Prieta, Alpinestars, Bikextore, Bikecheck, Raceclip |

---

## Flujos del Sistema

### FLUJO 1 — Corredor: Inscripcion Online

```
                         ┌──────────────┐
                         │  CORREDOR    │
                         │  visita web  │
                         └──────┬───────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Selecciona Sede      │
                    │  (ej: Guadalajara)    │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Selecciona Categoria │
                    │  (ej: Senior)         │
                    │  Precio: $1,500 MXN   │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Agrega al Carrito    │
                    │                       │
                    │  Sistema verifica:    │
                    │  Hay jerseys? (< 50)──┼──SI──▶ Agrega jersey promo
                    │                       │         con _promo_jersey: true
                    │                       │         cantidad = min(inscritos, disponibles)
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  CARRITO              │
                    │                       │
                    │  - Inscripcion $1,500 │
                    │  - Jersey GRATIS      │
                    │    (si aplica)        │
                    │  - Codigo descuento   │
                    │    (opcional)         │
                    │                       │
                    │  Hay inscripciones?   │
                    │  ┌─SI──────────────┐  │
                    │  │Continuar al     │  │
                    │  │Registro         │  │
                    │  └─────────────────┘  │
                    │  ┌─NO (solo merch)─┐  │
                    │  │Proceder al Pago │  │
                    │  │(checkout        │  │
                    │  │ directo)        │  │
                    │  └─────────────────┘  │
                    └───────────┬───────────┘
                                │ (tiene inscripciones)
                                ▼
                    ┌───────────────────────┐
                    │  FORMULARIO REGISTRO  │
                    │  (multi-step,         │
                    │   1 form por corredor)│
                    │                       │
                    │  Campos por corredor: │
                    │  - Nombre completo *  │
                    │  - Fecha nacimiento * │
                    │  - Equipo             │
                    │  - Email *            │
                    │  - Telefono (10 dig)* │
                    │  - Emergencia nombre *│
                    │  - Emergencia tel *   │
                    │  - Tipo de sangre *   │
                    │  - Alergias           │
                    │  - Talla playera *    │
                    │    (solo si jersey)   │
                    │                       │
                    │  Datos se guardan en  │
                    │  cart.attributes      │
                    │  .registration_data   │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  CHECKOUT SHOPIFY     │
                    │                       │
                    │  Descuento automatico │
                    │  "JERSEY-GRATIS-      │
                    │   INSCRIPCION"        │
                    │  (Buy X Get Y)        │
                    │                       │
                    │  + codigo descuento   │
                    │    si lo ingreso      │
                    └───────────┬───────────┘
                                │ PAGO EXITOSO
                                ▼
                    ┌───────────────────────┐
                    │  WEBHOOK              │
                    │  order-created.js     │
                    │                       │
                    │  Por cada corredor:   │
                    └───────────┬───────────┘
                     ┌──────────┼──────────────────────┐
                     ▼          ▼                      ▼
              ┌───────────┐ ┌──────────┐    ┌──────────────────┐
              │ Genera QR │ │ Asigna   │    │ Asigna boleto    │
              │ check-in  │ │ numero   │    │ de rifa          │
              │ DHMEX-GDL │ │ corredor │    │                  │
              │ -XXXXXXXX │ │ (secuen- │    │ Solo si:         │
              │           │ │  cial)   │    │ - Sede GTO o PUE │
              └─────┬─────┘ └────┬─────┘    │ - Orden > $0     │
                    │            │           │ - No patrocinado │
                    │            │           └────────┬─────────┘
                    └────────────┼────────────────────┘
                                 │
                     ┌───────────┼───────────┐
                     ▼           ▼           ▼
              ┌───────────┐ ┌──────────┐ ┌───────────┐
              │ Google    │ │ Envia    │ │ Actualiza │
              │ Sheets    │ │ Email    │ │ descuento │
              │ (guarda   │ │ con QR + │ │ jersey    │
              │  todo)    │ │ numero + │ │ (si >= 50 │
              │           │ │ boleto   │ │  desactiva│
              └───────────┘ └──────────┘ └───────────┘
```

---

### FLUJO 2 — Corredor: Compra de Merch

```
  ┌────────────┐     ┌──────────────┐     ┌──────────────┐     ┌───────────┐
  │  Corredor  │────▶│ Agrega merch │────▶│   Carrito     │────▶│ Checkout  │
  │  visita    │     │ al carrito   │     │              │     │ directo   │
  │  /merch    │     │ (jersey,     │     │ Sin inscrip- │     │ (sin      │
  │            │     │  accesorios) │     │ ciones = no  │     │ formulario│
  └────────────┘     └──────────────┘     │ formulario   │     │ registro) │
                                          │              │     │           │
                                          │ Boton:       │     │           │
                                          │ "Proceder    │     │           │
                                          │  al Pago"    │     │           │
                                          └──────────────┘     └───────────┘
```

---

### FLUJO 3 — Organizador: Check-in Dia de Carrera

```
  ┌──────────────┐     ┌────────────────────────┐     ┌───────────────────┐
  │  Admin abre  │────▶│  Escanea QR del        │────▶│  Sistema busca    │
  │  /api/       │     │  corredor              │     │  en Google Sheets │
  │  check-in-pro│     │                        │     │  por codigo QR    │
  └──────────────┘     │  O busca por:          │     │                   │
                       │  - Nombre              │     │  Busqueda fuzzy   │
                       │  - Email               │     │  (sin acentos)    │
                       │  - Telefono            │     └─────────┬─────────┘
                       └────────────────────────┘               │
                                                                ▼
                                                 ┌─────────────────────────┐
                                                 │  Muestra datos:         │
                                                 │  - Nombre, categoria    │
                                                 │  - Equipo, telefono     │
                                                 │  - Estado de pago       │
                                                 │  - Ya hizo check-in?    │
                                                 └────────────┬────────────┘
                                                              │
                                           ┌──────────────────┼──────────────┐
                                           ▼                                 ▼
                                ┌────────────────────┐            ┌────────────────┐
                                │  Confirmar         │            │  Entregar Kit  │
                                │  CHECK_IN = SI     │            │  KIT = SI      │
                                │  CHECK_IN_TIME =   │            │                │
                                │  timestamp actual  │            │                │
                                └────────────────────┘            └────────────────┘
                                                              │
                                                              ▼
                                                 ┌─────────────────────────┐
                                                 │  Dashboard en vivo:     │
                                                 │  - Total registrados    │
                                                 │  - Total checked-in     │
                                                 │  - Stats por categoria  │
                                                 │  - Lista de corredores  │
                                                 └─────────────────────────┘
```

---

### FLUJO 4 — Organizador: Registro Manual (en sitio)

```
  ┌──────────────┐     ┌────────────────────────────┐     ┌──────────────────┐
  │  Admin abre  │────▶│  Llena formulario:         │────▶│ Backend genera:  │
  │  /api/admin  │     │                            │     │                  │
  │  (password   │     │  - Nombre, email, tel      │     │  - Orden MANUAL- │
  │   requerido) │     │  - Fecha nacimiento        │     │    {numero}      │
  │              │     │  - Categoria, sede         │     │  - QR check-in   │
  └──────────────┘     │  - Equipo                  │     │  - Numero        │
                       │  - Emergencia, sangre      │     │    corredor      │
                       │  - Alergias                │     │  - Boleto rifa   │
                       │  - Talla playera           │     │    (si aplica)   │
                       │  - Metodo pago:            │     │                  │
                       │    Deposito/Transferencia/ │     └────────┬─────────┘
                       │    Efectivo/Patrocinado    │              │
                       │  - Monto: $1300/$1500/$1800│     ┌───────┼────────┐
                       └────────────────────────────┘     ▼       ▼        ▼
                                                  ┌─────────┐ ┌───────┐ ┌───────┐
                                                  │ Sheets  │ │ Email │ │ Rifa  │
                                                  │ (guarda)│ │ conf. │ │(si no │
                                                  │         │ │       │ │ patroc│
                                                  └─────────┘ └───────┘ └───────┘
```

---

### FLUJO 5 — Sistema: Sincronizacion de Finanzas

```
  ┌────────────────┐
  │  CRON diario   │
  │  8:00 UTC      │
  │  (2:00am MX)   │
  └───────┬────────┘
          │
          ▼
  ┌────────────────────────────────────────────┐
  │  sync-finanzas.js                          │
  │                                            │
  │  1. Fetch Shopify Payments API             │
  │     └─ balance/transactions.json           │
  │     └─ payouts.json                        │
  │                                            │
  │  2. Fetch orders via GraphQL               │
  │     └─ Nombre de orden, line items         │
  │     └─ Detecta sede por producto           │
  │                                            │
  │  3. Escribe en Google Sheets               │
  │     ├─ Hoja FINANZAS:                      │
  │     │  Pedido, Fecha, Monto, Status,       │
  │     │  Payout asociado                     │
  │     └─ Hoja RESUMEN:                       │
  │        Totales por sede, estado             │
  └────────────────────────────────────────────┘
```

---

### FLUJO 6 — Sistema: Jersey Promo Automatico

```
  ┌──────────────────────────┐
  │  Cada orden procesada    │
  │  (order-created.js)      │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │  Cuenta inscritos        │
  │  PAGADOS en hoja sede    │     PAGO = "patrocinado"
  │  (excluye patrocinados)──┼──▶  NO cuenta para jersey
  └────────────┬─────────────┘
               │
               ▼
       ┌───────────────┐
       │ paidCount < 50│
       └───┬───────┬───┘
        SI │       │ NO (>= 50)
           ▼       ▼
  ┌─────────────┐  ┌───────────────────┐
  │ Descuento   │  │ Descuento         │
  │ ACTIVO      │  │ DESACTIVADO       │
  │             │  │                   │
  │ usesPerOrder│  │ GraphQL mutation: │
  │ Limit =     │  │ discountAutomatic │
  │ 50 - paid   │  │ Deactivate       │
  └─────────────┘  └───────────────────┘

  Descuento Shopify: "JERSEY-GRATIS-INSCRIPCION" (Buy X Get Y)
  Discount ID: gid://shopify/DiscountAutomaticNode/1888870433004
```

---

### FLUJO 7 — Google Sheets: Datos del Corredor

```
  ┌───────────────────────────────────────────────────────────────┐
  │                    ORDEN LLEGA (webhook)                      │
  └────────────────────────────┬──────────────────────────────────┘
                               │
         ┌─────────────────────┼──────────────────────┐
         ▼                     ▼                      ▼
  ┌──────────────┐   ┌──────────────────┐   ┌──────────────────┐
  │ HOJA DE SEDE │   │ HOJA {SEDE}      │   │ HOJA RIFA        │
  │              │   │ NUMEROS          │   │                  │
  │ Ej:          │   │                  │   │ Columnas:        │
  │ GUANAJUATO   │   │ Columnas:        │   │ - Numero (1-N)   │
  │              │   │ - Numero (1-200) │   │ - Ocupado (0/1)  │
  │ Columnas:    │   │ - Ocupado (0/1)  │   │ - OrderID        │
  │ - FECHA      │   │ - OrderID        │   │ - Email          │
  │ - ORDEN      │   │ - Email          │   │ - Nombre         │
  │ - NOMBRE     │   │ - Nombre         │   │ - Fecha          │
  │ - EMAIL      │   │ - Categoria      │   │                  │
  │ - TELEFONO   │   │ - Fecha          │   │ Solo GTO y PUE   │
  │ - FECHA NAC  │   │                  │   │ Solo pagados     │
  │ - EQUIPO     │   │ Busca primer     │   │                  │
  │ - CATEGORIA  │   │ Ocupado=0,       │   │ Busca primer     │
  │ - SEDE       │   │ lo marca 1       │   │ Ocupado=0,       │
  │ - EMERGENCIA │   │                  │   │ lo marca 1       │
  │   NOMBRE     │   └──────────────────┘   └──────────────────┘
  │ - EMERGENCIA │
  │   TEL        │
  │ - QR_CODE    │
  │ - CHECK_IN   │  ◀── "NO" al registrar, "SI" dia de carrera
  │ - CHECK_IN   │
  │   _TIME      │  ◀── Timestamp del escaneo QR
  │ - JERSEY     │  ◀── Talla (S/M/L/XL) o vacio
  │ - PAGO       │  ◀── "shopify" | "patrocinado" | "deposito" etc
  │ - TOTAL PAGO │  ◀── Monto dividido entre corredores de la orden
  │ - KIT        │  ◀── Marcado dia de carrera
  │ - MEDALLA    │  ◀── Marcado dia de carrera
  └──────────────┘

  Proteccion anti-duplicados:
  Antes de escribir, busca si ya existe fila con
  mismo OrderID + Email + Nombre + Categoria.
  Si existe, omite y retorna el QR existente.
```

---

## Google Sheets — Estructura de Datos

**Spreadsheet ID:** `1XGe4vuVxsPQAE10deD-bYUVxKjUbeclyDx3m1CqpFBg`

### Hojas por sede (1 por ciudad)

| Hoja | Contenido |
|------|-----------|
| `GUANAJUATO` | Todos los corredores inscritos en Sede 1 |
| `GUADALAJARA` | Todos los corredores inscritos en Sede 2 |
| `IXTAPAN` | Todos los corredores inscritos en Sede 3 |
| `PUEBLA` | Todos los corredores inscritos en Sede 4 |
| `TAXCO` | Todos los corredores inscritos en Sede 5 |

### Hojas de numeros de corredor

| Hoja | Contenido |
|------|-----------|
| `GUANAJUATO NUMEROS` | Numeros 1-200, asignacion secuencial |
| `GUADALAJARA NUMEROS` | Numeros 1-200, asignacion secuencial |
| `IXTAPAN NUMEROS` | Numeros 1-200, asignacion secuencial |
| `PUEBLA NUMEROS` | Numeros 1-200, asignacion secuencial |
| `TAXCO NUMEROS` | Numeros 1-200, asignacion secuencial |

### Hojas globales

| Hoja | Contenido |
|------|-----------|
| `RIFA` | Pool de boletos para sorteo FOX 40 (solo GTO + PUE) |
| `FINANZAS` | Transacciones de Shopify Payments sincronizadas |
| `RESUMEN` | Totales agregados por sede y estado |

---

## Webhooks API (Vercel)

**Base URL:** `https://dhmexraces-webhooks.vercel.app`

| Endpoint | Metodo | Descripcion |
|----------|--------|-------------|
| `/api/order-created` | POST | Webhook principal. Recibe orden de Shopify, genera QR, asigna numero corredor, asigna rifa, guarda en Sheets, envia email |
| `/api/inventory` | GET | Stock en tiempo real de jerseys y medallas por sede. Cache 60s |
| `/api/check-in` | GET/POST | Check-in basico por codigo QR |
| `/api/check-in-pro` | POST | Check-in avanzado: busqueda fuzzy, stats, kit, lista corredores |
| `/api/dashboard` | GET | Dashboard con conteos en tiempo real por sede y categoria |
| `/api/manual-registration` | POST | Registro manual desde panel admin (con password) |
| `/api/admin` | GET | Panel admin HTML con formulario de registro manual |
| `/api/update-discount` | POST | Sincroniza descuento jersey con inventario real |
| `/api/sync-finanzas` | GET | Sync Shopify Payments a Google Sheets (CRON diario 8am UTC) |
| `/api/setup-sheets` | GET | Inicializa estructura de hojas con headers y numeros |
| `/api/format-sheets` | GET | Aplica formato visual a filas de las hojas |

### Variables de entorno (Vercel)

| Variable | Uso |
|----------|-----|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Auth Google Sheets |
| `GOOGLE_PRIVATE_KEY` | Auth Google Sheets |
| `RESEND_API_KEY` | Envio de emails |
| `SHOPIFY_ADMIN_TOKEN` | API admin Shopify |
| `SHOPIFY_FINANZAS_TOKEN` | Sync financiera |

---

## Tema Shopify — Estructura

```
DHMEX SKELETON/
├── layout/
│   ├── theme.liquid              # Layout principal (GSAP, CountUp, Google Fonts)
│   └── password.liquid           # Pagina de mantenimiento
├── assets/
│   ├── base.css                  # Design system completo (~3235 lineas)
│   └── theme.js                  # JS: smooth scroll, reveal, countdown, mobile menu
├── config/
│   ├── settings_schema.json      # Tipografia, Layout, Colores, Copa, Redes
│   └── settings_data.json        # Valores actuales del tema
├── snippets/
│   ├── css-variables.liquid      # Variables CSS desde settings
│   ├── meta-tags.liquid          # SEO, Open Graph, JSON-LD
│   ├── image.liquid              # Helper responsive images
│   └── product-card.liquid       # Card reutilizable de producto
├── sections/                     # 40 secciones (ver detalle abajo)
├── templates/                    # 25+ templates (ver detalle abajo)
└── locales/
    └── en.default.json           # Traducciones
```

### Secciones principales

| Seccion | Funcion |
|---------|---------|
| `header.liquid` | Nav con indice numerado, logo, cart count, mobile menu |
| `footer.liquid` | 4 columnas: marca, copa, tienda, contacto |
| `hero.liquid` | Hero video YouTube/galeria, countdown, CTA |
| `product-inscripcion.liquid` | Pagina de inscripcion completa (~1137 lineas): categorias, tour guiado, FOMO, jersey auto-add, precio, galeria |
| `registration-form.liquid` | Formulario multi-step con validacion, guarda en cart attributes |
| `ranking.liquid` | Rankings por sede con filtro de categoria, tabla con tiempos y diferencias |
| `ranking-overall.liquid` | Overall dinamico: fetch + deduplicacion + calculo puntos |
| `bases-sorteo.liquid` | Pagina completa del sorteo FOX 40 con bases legales |
| `race-dates.liquid` | Cards de sedes con status open/closed/upcoming |
| `sponsors.liquid` | Patrocinadores en 3 tiers: Oro, Plata, Bronce (marquee) |
| `kit-rider.liquid` | Kit incluido en inscripcion con iconos SVG |

### Templates de inscripcion por sede

| Template | Sede |
|----------|------|
| `product.inscripcion-guanajuato-2026.json` | Guanajuato |
| `product.inscripcion-sede-2-guadalajara.json` | Guadalajara |
| `product.inscripcion-sede-4-ixtapan-de-la-sal.json` | Ixtapan |
| `product.inscripcion-sede-1-puebla.json` | Puebla |
| `product.inscripcion-sede-5-taxco-final-urbano.json` | Taxco |

### Cart (`templates/cart.liquid`)

Carrito custom con:
- Deteccion de inscripciones vs merch
- Sync robusto de jersey promo (8 pasos, deteccion de sede, inventario)
- Codigo de descuento (localStorage)
- Botones condicionales: "Continuar al Registro" (inscripciones) o "Proceder al Pago" (merch)

---

## Reglas de Negocio

### Jersey Gratis
- Primeros **50 inscritos que pagan** por sede reciben jersey gratis
- Inscripciones gratis y patrocinados **NO cuentan** para los 50
- Se maneja con descuento automatico de Shopify (Buy X Get Y)
- El sistema actualiza el limite automaticamente despues de cada orden

### Sorteo FOX 40
- **Premio:** FOX 40 Factory GRIP 2 (valor $50,000 MXN)
- **Boletos:** Solo inscripciones de **Guanajuato** y **Puebla**
- Inscripciones gratis y patrocinados **NO reciben boleto**
- Sin limite fijo de boletos — son los que se junten
- Maximo 2 boletos por corredor (1 por sede)
- **Sorteo:** En vivo al finalizar la carrera de Puebla
- **Guadalajara, Ixtapan y Taxco NO dan boleto de rifa**

### Codigos QR Check-in
- Formato: `DHMEX-{CODIGO_SEDE}-{8_CARACTERES_ALEATORIOS}`
- Ejemplo: `DHMEX-GTO-A3B7C9D2`
- Generados via api.qrserver.com
- Unicos por corredor, no reutilizables

### Deteccion de Duplicados
- El webhook verifica antes de escribir en Sheets
- Busca coincidencia de: OrderID + Email + Nombre + Categoria
- Si existe, retorna el QR existente sin crear duplicado
- Protege contra retries del webhook de Shopify

---

## Despliegue

### Tema Shopify (SKELETON)

```bash
cd "C:/Users/gibra/PRAZIS DEV/DHMEX SKELETON"

# Push de archivos especificos (recomendado)
shopify theme push --only sections/header.liquid --theme 194933194912 --store dhmexraces-demo.myshopify.com --allow-live

# Push completo (cuidado: sobreescribe configuracion del admin)
shopify theme push --theme 194933194912 --store dhmexraces-demo.myshopify.com --allow-live
```

| Config | Valor |
|--------|-------|
| Store demo | `dhmexraces-demo.myshopify.com` |
| Theme ID | `194933194912` |
| Theme name | `DHMEX SKELETON` |
| Git repo | `github.com/PRAZIS-TECHNOLOGIES/DHMEXRACES-NUEVO` |

### Webhooks (Vercel)

```bash
cd "C:/Users/gibra/PRAZIS DEV/DHMEXRACES-theme/dhmexraces-webhooks"
npx vercel --prod
```

| Config | Valor |
|--------|-------|
| URL | `dhmexraces-webhooks.vercel.app` |
| Proyecto | `gibran-gomezs-projects/dhmexraces-webhooks` |

### Store Original (PRODUCCION — NO TOCAR desde este proyecto)

| Config | Valor |
|--------|-------|
| Store | `18d06f-7a.myshopify.com` |
| Theme ID | `157252976876` |
| Tema local | `C:\Users\gibra\PRAZIS DEV\DHMEXRACES-theme\dhmexraces-custom` |

---

## Dependencias Externas

| Servicio | Uso |
|----------|-----|
| Google Fonts (Space Mono + IBM Plex Mono) | Tipografia del tema |
| GSAP 3.12.7 + ScrollTrigger | Animaciones, scroll horizontal |
| CountUp.js 2.8.0 | Animacion de numeros en estadisticas |
| Google Sheets API | Base de datos de corredores |
| Resend | Emails de confirmacion |
| Shopify Admin API (REST + GraphQL) | Ordenes, descuentos, pagos |
| api.qrserver.com | Generacion de codigos QR |

---

## Proyectos Relacionados

| Proyecto | Ruta Local | Descripcion |
|----------|-----------|-------------|
| DHMEX SKELETON | `C:\Users\gibra\PRAZIS DEV\DHMEX SKELETON` | Este proyecto — tema rediseñado |
| DHMEXRACES Custom | `C:\Users\gibra\PRAZIS DEV\DHMEXRACES-theme\dhmexraces-custom` | Tema live en produccion (referencia, no modificar) |
| DHMEXRACES Webhooks | `C:\Users\gibra\PRAZIS DEV\DHMEXRACES-theme\dhmexraces-webhooks` | APIs en Vercel (compartido entre ambos temas) |
| DHMEX PRO | `C:\Users\gibra\PRAZIS DEV\DHMEX PRO` | Tema UI/UX fuente del design system |
