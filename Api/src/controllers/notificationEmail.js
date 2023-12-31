const nodemailer = require("nodemailer");
const { User, Order, Cart } = require("../db");
require("dotenv").config();
const { EMAIL_USER, EMAIL_PASS } = process.env;

async function sendPaymentStatusEmail(order) {
    const user = await User.findByPk(order.userSub);

    // Crear un transporte SMTP
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true para 465, false para otros puertos
        auth: {
            user: EMAIL_USER, // cuenta de correo electrónico
            pass: EMAIL_PASS, // contraseña de la cuenta de correo electrónico
        },
    });

    // Configurar los detalles del correo electrónico
    let mailOptions = {
        from: `Tecnocamp ${EMAIL_USER}`, // dirección de correo electrónico del remitente
        to: user.sub, // lista de destinatarios
        subject: "Actualización del estado de pago", // asunto del correo electrónico
        // text: `Hola ${user.name},\n\nEl estado de pago de tu(s) reserva(s) con numero de referencia ${reservation.payment_transaction_id} ha sido "${reservation.payment_status}"\n\nGracias por reservar con nosotros,\n Att: Equipo Paby`, // cuerpo del correo electrónico en texto plano
        text: `Estimado/a usuario,\n\nLe informamos que el estado de pago de su compra con número de referencia ${order.payment_transaction_id} ha sido actualizado a "${order.payment_status}".\n\nSi tiene alguna duda o necesita ayuda adicional, no dude en ponerse en contacto con nosotros.\n\nGracias por elegir nuestra tienda para su compra,\n Atentamente, el equipo de Tecnocamp`, // cuerpo del correo electrónico en texto plano
        //html: `<p>Hola ${user.name},</p><p>El estado de pago de tu reserva ha sido actualizado a "${reservation.payment_status}"</p><p>Gracias por reservar con nosotros,</p><p>El equipo de reservas</p>` // cuerpo del correo electrónico en formato HTML
    };

    // Enviar el correo electrónico
    let info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado: %s", info.messageId);
}

async function sendRegisterEmail(user) {

    // Crear un transporte SMTP
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true para 465, false para otros puertos
        auth: {
            user: EMAIL_USER, // cuenta de correo electrónico
            pass: EMAIL_PASS, // contraseña de la cuenta de correo electrónico
        },
    });

    // Configurar los detalles del correo electrónico
    let mailOptions = {
        from: `Tecnocamp ${EMAIL_USER}`, // dirección de correo electrónico del remitente
        to: user.email, // lista de destinatarios
        subject: "Registro exitoso!!!", // asunto del correo electrónico
        // text: `Hola ${user.name},\n\nEl estado de pago de tu(s) reserva(s) con numero de referencia ${reservation.payment_transaction_id} ha sido "${reservation.payment_status}"\n\nGracias por reservar con nosotros,\n Att: Equipo Paby`, // cuerpo del correo electrónico en texto plano
        text: `Estimado/a usuario,\n\n¡Gracias por registrarte en Tecnocamp! Te damos la bienvenida a nuestra comunidad. Esperamos que disfrutes de nuestros servicios y encuentres todo lo que necesitas para tu compra.\n\nSi tienes alguna pregunta o necesitas ayuda adicional, no dudes en ponerte en contacto con nosotros.\n\nAtentamente,\nEl equipo de Tecnocamp`,
        //html: `<p>Hola ${user.name},</p><p>El estado de pago de tu reserva ha sido actualizado a "${reservation.payment_status}"</p><p>Gracias por reservar con nosotros,</p><p>El equipo de reservas</p>` // cuerpo del correo electrónico en formato HTML
    };

    // Enviar el correo electrónico
    let info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado: %s", info.messageId);
}



module.exports = { sendPaymentStatusEmail, sendRegisterEmail };
