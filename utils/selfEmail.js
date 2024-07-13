const { sendEmail } = require("./email");

exports.sendSelfEmail = ({ message, subject }) => {



    return sendEmail({
        to: process.env.FORM_EMAIL, // Send to your own email
        subject,
        message
    });
};
