# Configuración SMTP

Este proyecto incluye un módulo SMTP configurado para recibir correos de los formularios de contacto y suscripción.

## Archivos creados

- `src/lib/smtp.ts` - Módulo de configuración SMTP
- `src/pages/api/contact.ts` - Endpoint API para el formulario de contacto
- `src/pages/api/newsletter.ts` - Endpoint API para el formulario de suscripción

## Configuración

### 1. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Host del servidor SMTP
SMTP_HOST=smtp.gmail.com

# Puerto del servidor SMTP (587 para TLS, 465 para SSL)
SMTP_PORT=587

# Si el puerto es 465, establecer a 'true', de lo contrario 'false'
SMTP_SECURE=false

# Usuario/Email para autenticación SMTP
SMTP_USER=tu-email@gmail.com

# Contraseña o contraseña de aplicación para SMTP
SMTP_PASS=tu-contraseña-de-aplicacion

# Email de destino donde se recibirán los formularios
RECIPIENT_EMAIL=contacto@liberamexico.org

# Email que aparecerá como remitente en los correos enviados
FROM_EMAIL=noreply@liberamexico.org
```

### 2. Configuración para diferentes proveedores

#### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion
```

**Nota:** Para Gmail, necesitarás generar una "Contraseña de aplicación" desde tu cuenta de Google:
1. Ve a tu cuenta de Google
2. Seguridad → Verificación en 2 pasos (debe estar activada)
3. Contraseñas de aplicaciones → Generar nueva contraseña

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@outlook.com
SMTP_PASS=tu-contraseña
```

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=tu-api-key-de-sendgrid
```

#### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@tu-dominio.mailgun.org
SMTP_PASS=tu-contraseña-de-mailgun
```

### 3. Cargar variables de entorno en Astro

Asegúrate de que Astro esté configurado para cargar variables de entorno. En `astro.config.mjs`, puedes agregar:

```javascript
export default defineConfig({
  integrations: [tailwind()],
  // Las variables de entorno se cargan automáticamente desde .env
});
```

## Uso

Los formularios ya están configurados para usar los endpoints API:

- **Formulario de contacto**: Envía datos a `/api/contact`
- **Formulario de newsletter**: Envía datos a `/api/newsletter`

Ambos endpoints procesan los datos y envían un correo electrónico al email configurado en `RECIPIENT_EMAIL`.

## Pruebas

Para verificar que la configuración SMTP funciona correctamente, puedes usar la función `verifySMTPConnection()` del módulo:

```typescript
import { verifySMTPConnection } from './lib/smtp';

const isConnected = await verifySMTPConnection();
console.log('SMTP conectado:', isConnected);
```

## Notas de seguridad

- **Nunca** subas el archivo `.env` al repositorio
- Asegúrate de que `.env` esté en tu `.gitignore`
- En producción, usa variables de entorno del servidor o plataforma de hosting
- Para Gmail, siempre usa "Contraseñas de aplicación" en lugar de tu contraseña principal

