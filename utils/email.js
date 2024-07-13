const nodemailer = require("nodemailer");

exports.sendEmail = ({ to, name, subject, message }) => {


    return new Promise((resolve, reject) => {
        try {
            const mailer = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.FORM_EMAIL,
                    pass: process.env.EMAIL_PASS
                }
            });
            mailer.sendMail({
                to,
                subject,
                text: message,
                from: process.env.FORM_EMAIL
            }, (err) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    console.log("Email sent successfully");
                    return resolve("Email sent successfully");
                }
            });
        } catch (error) {
            console.log(error);
            return reject(error.message);
        }
    });
};


