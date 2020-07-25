const keys = require("../config/keys");
const nodemailer = require("nodemailer");

const sendEmail = async (emailConfig) => {
  try {

    const htmlTemplateCorreo =
      "<html style='-webkit-box-sizing: border-box;box-sizing: border-box;line-height: 1.5;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: -apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif;font-weight: normal;color: rgba(0,0,0,0.87);'><head style='-webkit-box-sizing: inherit;box-sizing: inherit;'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css' style='-webkit-box-sizing: inherit;box-sizing: inherit;'><style>#submitEntradas{background-color: #26a69a;cursor: pointer;}#submitEntradas:hover{background-color: #34e3d3;}</style></head><body style='-webkit-box-sizing: inherit;box-sizing: inherit;margin: 0;'><div ' style='-webkit-box-sizing: inherit;box-sizing: inherit;margin: 0 auto;max-width: 1280px;width: 90%;'><div style='-webkit-box-sizing: inherit;box-sizing: inherit;margin-left: auto;margin-right: auto;margin-bottom: 20px;'><div style='-webkit-box-sizing: border-box;box-sizing: border-box;float: left;padding: 0 .75rem;min-height: 1px;margin-left: auto;left: auto;right: auto;'><div  style='-webkit-box-sizing: inherit;box-sizing: inherit;-webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);text-align: center;position: relative;margin: .5rem 0 1rem 0;background-color: #546e7a !important;-webkit-transition: -webkit-box-shadow .25s;transition: box-shadow .25s, -webkit-box-shadow .25s;border-radius: 2px;'><div  style='-webkit-box-sizing: inherit;box-sizing: inherit;padding: 24px;border-radius: 0 0 2px 2px;color: #fff !important;'><span  style='-webkit-box-sizing: inherit;box-sizing: inherit;font-size: 24px;font-weight: 300;display: block;line-height: 32px;margin-bottom: 8px;'><h4 style='-webkit-box-sizing: inherit;box-sizing: inherit;font-weight: 400;line-height: 110%;font-size: 2.28rem;margin: 1.52rem 0 .912rem 0;'>Aquí tienes tus entradas!</h4></span><p style='-webkit-box-sizing: inherit;box-sizing: inherit;margin: 0;'>La compra de tus entradas se ha realizado con éxito. Si hay algún problema con las entradas, mande un correo a esta dirección.</p></div><div  style='-webkit-box-sizing: inherit;box-sizing: inherit;background-color: inherit;border-top: 1px solid rgba(160,160,160,0.2);position: relative;padding: 16px 24px;border-radius: 0 0 2px 2px;'></div></div><div  style='-webkit-box-sizing: inherit;box-sizing: inherit;'><div style='-webkit-box-sizing: inherit;box-sizing: inherit;text-align: center;margin: 0 auto;max-width: 1280px;width: 90%;'><a href='http://localhost:3000/' style='-webkit-box-sizing: inherit;box-sizing: inherit;background-color: transparent;-webkit-text-decoration-skip: objects;color: #039be5;text-decoration: none;-webkit-tap-highlight-color: transparent;'>cineticket.com</a></div></div></div></div></div></body></html>";

    const mailOptions = {
      from: keys.emailUser,
      to: emailConfig.destinatario,
      subject: "Aquí tienes tus entradas!",
      text: "Gracias por comprar en cineticket.com.",
      html: htmlTemplateCorreo,
      attachments: emailConfig.fileEntrada,
    }; // html body

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: keys.emailUser,
        pass: keys.emailKey,
      },
    });

    const res = await transporter.sendMail(mailOptions);
    console.log(res);
    return res;

  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { sendEmail: sendEmail };
