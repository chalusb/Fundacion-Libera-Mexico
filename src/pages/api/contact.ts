import type { APIRoute } from 'astro';
import { sendEmail, recipientEmail } from '../../lib/smtp';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, subject, message } = data;

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Faltan campos requeridos' 
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

    // Mapear asuntos a texto legible
    const subjectMap: Record<string, string> = {
      denuncia: 'Denuncia',
      voluntariado: 'Voluntariado',
      donacion: 'Donación',
      informacion: 'Información general',
      colaboracion: 'Colaboración',
      otro: 'Otro',
    };

    const subjectText = subjectMap[subject] || subject;

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
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; color: #333; }
            .message-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nuevo mensaje de contacto - Libera México</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nombre:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="label">Teléfono:</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Asunto:</div>
                <div class="value">${subjectText}</div>
              </div>
              <div class="field">
                <div class="label">Mensaje:</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar el correo
    await sendEmail({
      to: recipientEmail,
      subject: `Nuevo contacto: ${subjectText} - ${name}`,
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mensaje enviado correctamente' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error al enviar el formulario de contacto:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error al procesar el formulario. Por favor, intenta nuevamente.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

