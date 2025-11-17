import type { APIRoute } from 'astro';
import { sendEmail, recipientEmail } from '../../lib/smtp';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email } = data;

    // Validar email
    if (!email) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'El email es requerido' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email inválido' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Crear el contenido del email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .email-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nueva suscripción al newsletter - Libera México</h2>
            </div>
            <div class="content">
              <p>Una nueva persona se ha suscrito al newsletter:</p>
              <div class="email-box">
                <strong>${email}</strong>
              </div>
              <p style="margin-top: 20px; color: #666; font-size: 14px;">
                Fecha: ${new Date().toLocaleString('es-MX', { 
                  dateStyle: 'long', 
                  timeStyle: 'short' 
                })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar el correo
    await sendEmail({
      to: recipientEmail,
      subject: `Nueva suscripción al newsletter: ${email}`,
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Suscripción realizada correctamente' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error al procesar la suscripción:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error al procesar la suscripción. Por favor, intenta nuevamente.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

