const { sendEmail } = require("./email");

exports.sendSelfEmail = ({ name, email, mobile, description }) => {
    const subject = "New Feedback Received";
    const message = `Dear Team,

    We have received new feedback from a client. Here are the details:

    Name: ${name}
    Email: ${email}
    Mobile: ${mobile}
    Message: ${description}
    
    Best regards,
    Feedback System`;

    return sendEmail({
        to: process.env.FORM_EMAIL, // Send to your own email
        subject,
        message
    });
};
