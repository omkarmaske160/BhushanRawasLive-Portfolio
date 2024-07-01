const nodemailer = require("nodemailer");

const sendEmail = ({ to, name, subject = "Thank you for contacting us" }) => {
    const message = `Dear ${name},

    Thank you for reaching out to us. We have received your feedback and will get back to you shortly.
    
    If you have any urgent inquiries, feel free to contact us at our hotline number or reply to this email. We are here to assist you with any questions or concerns you may have.
    
    We appreciate your trust in our services and look forward to providing you with the best support possible.
    
    Best regards,
    Bhushan Rawas
    Insurance Adviser`;

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

module.exports = sendEmail;
