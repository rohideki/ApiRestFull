var nodemailer = require('nodemailer');

module.exports.sendMail = function (data) {
console.log(process.env)
    var remetente = nodemailer.createTransport({
        host: process.env.SMTP,
        service: process.env.SERVICE,
        port: 587, //process.env.PORT,
        secure: true,
        auth: {
            user: process.env.AUTH_USER,
            pass: process.env.AUTH_PASS
        }
    });

    var emailASerEnviado = {
        from: `${data.email}`,
        to: process.env.MAILTO,
        subject: `Enviando de ${data.email}`,
        text: `${data.text}`,
    };


    remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado com sucesso.');
        }
    });
}