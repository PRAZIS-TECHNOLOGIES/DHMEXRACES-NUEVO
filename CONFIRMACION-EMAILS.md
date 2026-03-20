# Sistema de Confirmacion de Emails — DHMEX SKELETON

## Flujo del Sistema

### Paso 1: Captura de Datos
El formulario de registro (`/pages/formulario-de-inscripcion`) captura datos de cada corredor y los guarda en `cart.attributes.registration_data` como JSON.

### Paso 2: Checkout
Los datos se transfieren al pedido como `order.attributes.registration_data`.

### Paso 3: Webhook
Al crearse el pedido, el webhook en Vercel (`dhmexraces-webhooks`) extrae los datos y envia un email individual a cada corredor via RESEND (`noreply@endhurorace.com`).

---

## Variables del Template

| Variable | Fuente | Ejemplo |
|----------|--------|---------|
| `{{NOMBRE_CORREDOR}}` | `corredor.nombre` | Juan Perez Garcia |
| `{{CATEGORIA}}` | `corredor.categoria` | Elite Varonil |
| `{{EQUIPO}}` | `corredor.equipo` | Team Scott |
| `{{EMAIL}}` | `corredor.email` | juan@ejemplo.com |
| `{{TELEFONO}}` | `corredor.telefono` | 5512345678 |
| `{{SEDE}}` | `corredor.product_title` | Inscripcion SEDE 2 - Puebla 2026 |
| `{{FECHA_EVENTO}}` | Segun la sede | 21-22 Mar 2026 |
| `{{ORDER_NUMBER}}` | `order.order_number` | 1042 |
| `{{NUMERO_CORREDOR}}` | Asignado por webhook | 087 |
| `{{QR_URL}}` | Generado por webhook | URL de imagen QR |
| `{{TALLA_PLAYERA}}` | `corredor.talla_playera` | L |
| `{{LOGO_URL}}` | CDN Shopify | URL del logo |

---

## Plantilla HTML — Email de Confirmacion al Corredor

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inscripcion Confirmada — DHMEXRACES</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F5;font-family:'Courier New',Courier,monospace;color:#1A1A1A;-webkit-font-smoothing:antialiased;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:0;">

          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 32px;border-bottom:1px solid rgba(0,0,0,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="{{LOGO_URL}}" alt="DHMEXRACES" width="140" style="display:block;height:auto;">
                  </td>
                  <td align="right" style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#666666;">
                    Copa Scott 2026
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Status Banner -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 20px;background-color:#F5F5F5;border-left:3px solid #DF3382;">
                    <span style="display:block;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#DF3382;margin-bottom:4px;">Estado</span>
                    <span style="display:block;font-size:16px;font-weight:700;color:#1A1A1A;letter-spacing:-0.02em;">Inscripcion Confirmada</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Numero de Corredor -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding:24px;text-align:center;">
                    <span style="display:block;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#666666;margin-bottom:8px;">Tu numero de corredor</span>
                    <span style="display:block;font-size:48px;font-weight:700;color:#1A1A1A;letter-spacing:-0.04em;line-height:1;">{{NUMERO_CORREDOR}}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Datos del Corredor -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1A1A1A;">Datos del Corredor</span>
                    <div style="width:24px;height:2px;background-color:#DF3382;margin-top:8px;"></div>
                  </td>
                </tr>
              </table>

              <!-- Row: Nombre -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding:12px 0;font-size:12px;color:#666666;width:120px;vertical-align:top;">Nombre</td>
                  <td style="padding:12px 0;font-size:13px;font-weight:600;color:#1A1A1A;text-align:right;">{{NOMBRE_CORREDOR}}</td>
                </tr>
              </table>

              <!-- Row: Categoria -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding:12px 0;font-size:12px;color:#666666;width:120px;vertical-align:top;">Categoria</td>
                  <td style="padding:12px 0;font-size:13px;font-weight:700;color:#DF3382;text-align:right;text-transform:uppercase;letter-spacing:0.04em;">{{CATEGORIA}}</td>
                </tr>
              </table>

              <!-- Row: Equipo -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding:12px 0;font-size:12px;color:#666666;width:120px;vertical-align:top;">Equipo</td>
                  <td style="padding:12px 0;font-size:13px;font-weight:600;color:#1A1A1A;text-align:right;">{{EQUIPO}}</td>
                </tr>
              </table>

              <!-- Row: Email -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding:12px 0;font-size:12px;color:#666666;width:120px;vertical-align:top;">Email</td>
                  <td style="padding:12px 0;font-size:13px;font-weight:600;color:#1A1A1A;text-align:right;">{{EMAIL}}</td>
                </tr>
              </table>

              <!-- Row: Telefono -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;font-size:12px;color:#666666;width:120px;vertical-align:top;">Telefono</td>
                  <td style="padding:12px 0;font-size:13px;font-weight:600;color:#1A1A1A;text-align:right;">{{TELEFONO}}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Informacion del Evento -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1A1A1A;">Informacion del Evento</span>
                    <div style="width:24px;height:2px;background-color:#DF3382;margin-top:8px;"></div>
                  </td>
                </tr>
              </table>

              <!-- Row: Sede -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding:12px 0;font-size:12px;color:#666666;width:120px;vertical-align:top;">Sede</td>
                  <td style="padding:12px 0;font-size:13px;font-weight:600;color:#1A1A1A;text-align:right;">{{SEDE}}</td>
                </tr>
              </table>

              <!-- Row: Fecha -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding:12px 0;font-size:12px;color:#666666;width:120px;vertical-align:top;">Fecha</td>
                  <td style="padding:12px 0;font-size:13px;font-weight:600;color:#1A1A1A;text-align:right;">{{FECHA_EVENTO}}</td>
                </tr>
              </table>

              <!-- Row: Pedido -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;font-size:12px;color:#666666;width:120px;vertical-align:top;">Pedido</td>
                  <td style="padding:12px 0;font-size:13px;font-weight:600;color:#1A1A1A;text-align:right;">#{{ORDER_NUMBER}}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Talla de Playera (condicional) -->
          <!--
            Solo incluir este bloque si {{TALLA_PLAYERA}} tiene valor.
            En el webhook: if (corredor.talla_playera) { incluir bloque }
          -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FDF2F8;border:1px solid rgba(223,51,130,0.15);">
                <tr>
                  <td style="padding:16px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display:block;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#DF3382;margin-bottom:2px;">Playera Oficial Incluida</span>
                          <span style="display:block;font-size:13px;font-weight:600;color:#1A1A1A;">Talla: {{TALLA_PLAYERA}}</span>
                        </td>
                        <td align="right" style="font-size:11px;color:#666666;">
                          Se entrega en carrera
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- QR Code -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding:24px;text-align:center;">
                    <span style="display:block;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#666666;margin-bottom:16px;">QR de Check-in</span>
                    <img src="{{QR_URL}}" alt="QR Check-in" width="180" height="180" style="display:inline-block;">
                    <span style="display:block;font-size:11px;color:#666666;margin-top:12px;">Presenta este codigo al llegar a la sede</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:14px 40px;background-color:#1A1A1A;text-align:center;">
                    <a href="https://endhurorace.com/pages/ranking-2026" style="font-family:'Courier New',Courier,monospace;font-size:12px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;">Ver Ranking 2026</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Importante -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:12px;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1A1A1A;">Importante</span>
                    <div style="width:24px;height:2px;background-color:#DF3382;margin-top:8px;"></div>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:4px 0;font-size:12px;color:#666666;line-height:1.6;">
                    &bull; Llega al menos 1 hora antes del inicio de tu categoria
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:12px;color:#666666;line-height:1.6;">
                    &bull; Presenta tu QR o numero de corredor en el registro
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:12px;color:#666666;line-height:1.6;">
                    &bull; Usa casco integral, guantes y protecciones obligatorias
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:12px;color:#666666;line-height:1.6;">
                    &bull; Revisa el reglamento completo en endhurorace.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:40px 40px 32px;margin-top:32px;border-top:1px solid rgba(0,0,0,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1A1A1A;">Copa Scott DHMEXRACES 2026</span>
                    <span style="display:block;font-size:11px;color:#666666;margin-top:6px;">La copa nacional de downhill MTB mas profesional de Mexico</span>
                    <span style="display:block;font-size:11px;color:#666666;margin-top:2px;">5 sedes &bull; 14 categorias &bull; $530,000 MXN en premios</span>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;padding-top:20px;">
                    <a href="https://www.instagram.com/dhmex_races/" style="font-size:11px;font-weight:600;color:#DF3382;text-decoration:none;letter-spacing:0.04em;">@dhmex_races</a>
                    <span style="color:#666666;margin:0 8px;">&bull;</span>
                    <a href="mailto:endhurorace@gmail.com" style="font-size:11px;font-weight:600;color:#666666;text-decoration:none;">endhurorace@gmail.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;padding-top:16px;">
                    <span style="font-size:10px;color:#999999;">Este correo fue enviado porque te inscribiste en una sede de la Copa Scott DHMEXRACES 2026. Si crees que fue un error, contactanos a endhurorace@gmail.com</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Container -->

      </td>
    </tr>
  </table>
  <!-- /Wrapper -->

</body>
</html>
```

---

## Plantilla Liquid — Resumen para el Comprador

Agregar en Shopify Admin > Settings > Notifications > Order confirmation:

```liquid
{% if order.attributes.registration_data %}
  <div style="margin-top:24px;padding:24px;background:#F5F5F5;font-family:'Courier New',Courier,monospace;">
    <h3 style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1A1A1A;margin:0 0 16px;">Corredores Registrados</h3>

    {% assign reg_data = order.attributes.registration_data | parse_json %}
    {% for corredor in reg_data.registrations %}
      <div style="padding:16px;margin-bottom:8px;background:#FFFFFF;border:1px solid rgba(0,0,0,0.06);">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Courier New',Courier,monospace;">
          <tr>
            <td style="font-size:13px;font-weight:700;color:#1A1A1A;">{{ corredor.nombre }}</td>
            <td align="right" style="font-size:12px;font-weight:700;color:#DF3382;text-transform:uppercase;letter-spacing:0.04em;">{{ corredor.categoria }}</td>
          </tr>
          <tr>
            <td style="font-size:11px;color:#666666;padding-top:4px;">{{ corredor.email }}</td>
            <td align="right" style="font-size:11px;color:#666666;padding-top:4px;">{{ corredor.telefono }}</td>
          </tr>
        </table>
      </div>
    {% endfor %}

    <p style="font-size:11px;color:#666666;margin:12px 0 0;font-style:italic;">Cada corredor recibira un email de confirmacion individual a su correo registrado.</p>
  </div>
{% endif %}
```

---

## Notas de Diseno

El email sigue exactamente el sistema de diseno del theme DHMEX SKELETON:

- **Tipografia:** `'Courier New', Courier, monospace` (fallback compatible con email de Space Mono / IBM Plex Mono)
- **Colores:** Fondo blanco `#FFFFFF`, fondo exterior `#F5F5F5`, texto primario `#1A1A1A`, texto secundario `#666666`, acento rosa `#DF3382`
- **Labels:** Uppercase, letter-spacing 0.1em, 10-11px, peso 600-700
- **Linea de acento:** 24px x 2px rosa `#DF3382` bajo cada titulo de seccion
- **Bordes:** `1px solid rgba(0,0,0,0.08)` sutiles, sin border-radius (estilo editorial)
- **Rows de datos:** Label izquierda gris + valor derecha negro/bold, separados por border-bottom tenue
- **Boton CTA:** Fondo negro `#1A1A1A`, texto blanco, uppercase, letter-spacing
- **Sin emojis, sin gradientes, sin esquinas redondeadas** — estilo limpio, editorial, profesional
