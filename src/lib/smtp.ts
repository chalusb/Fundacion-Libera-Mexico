import nodemailer from 'nodemailer';

/**
 * Configuración SMTP para el envío de correos electrónicos
 * 
 * IMPORTANTE: Reemplaza estos valores con tus credenciales reales de SMTP
 * 
 * Ejemplos de proveedores comunes:
 * - Gmail: smtp.gmail.com, puerto 587
 * - Outlook: smtp-mail.outlook.com, puerto 587
 * - SendGrid: smtp.sendgrid.net, puerto 587
 * - Mailgun: smtp.mailgun.org, puerto 587
 * - Servidor propio: configura según tu proveedor
 */
export const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true para puerto 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER || 'tu-email@gmail.com',
    pass: process.env.SMTP_PASS || 'tu-contraseña-de-aplicacion',
  },
};

/**
 * Email de destino para recibir los formularios
 */
export const recipientEmail = process.env.RECIPIENT_EMAIL || 'contacto@liberamexico.org';

/**
 * Email que aparecerá como remitente en los correos enviados
 */
export const fromEmail = process.env.FROM_EMAIL || 'noreply@liberamexico.org';

/**
 * Crea y retorna un transporter de nodemailer configurado
 */
export function createTransporter() {
  return nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: smtpConfig.auth,
    // Opciones adicionales para mejor compatibilidad
    tls: {
      rejectUnauthorized: false, // Solo para desarrollo, cambiar a true en producción
    },
  });
}

/**
 * Verifica la conexión SMTP
 * Útil para testing durante la configuración
 */
export async function verifySMTPConnection(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Error verificando conexión SMTP:', error);
    return false;
  }
}

/**
 * Envía un correo electrónico
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> {
  const transporter = createTransporter();
  
  await transporter.sendMail({
    from: `"Libera México" <${fromEmail}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text || options.html.replace(/<[^>]*>/g, ''), // Convertir HTML a texto plano si no se proporciona
  });
}

