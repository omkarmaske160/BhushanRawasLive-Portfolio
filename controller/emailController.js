const validator = require("validator");
const feedback = require("../model/emailModel");
const { sendEmail } = require("../utils/email");
const { sendSelfEmail } = require("../utils/selfEmail");

exports.addFeedback = async (req, res) => {
    try {
        const { name, email, description, mobile } = req.body;

        console.log(req.body);
        if (
            validator.isEmpty(name) ||
            validator.isEmpty(email) ||
            validator.isEmpty(mobile) ||
            validator.isEmpty(description)
        ) {
            return res.status(400).json({
                message: "All fields required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Please provide a valid email"
            });
        }

        // Create feedback entry in the database
        const data = await feedback.create(req.body);

        // Send email to client
        const client_Message = `Dear ${name},

        Thank you for reaching out to us. We have received your feedback and will get back to you shortly.
            
        If you have any urgent inquiries, feel free to contact us at our hotline number or reply to this email. We are here to assist you with any questions or concerns you may have.
            
        We appreciate your trust in our services and look forward to providing you with the best support possible.
            
        Best regards,
        Bhushan Rawas
        Insurance Adviser`;

        client_subject = "Thank you for contacting us"

        const self_Message = `Dear Team,

        We have received new feedback from a client. Here are the details:
    
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Message: ${description}
        
        Best regards,
        Feedback System`;

        await sendEmail({
            to: email,
            name,
            message: client_Message,
            subject: client_subject
        });
        const self_subject = "New Feedback Received";



        // Send email to yourself
        await sendSelfEmail({ name, email, mobile, description, message: self_Message, subject: self_subject });

        // Respond to the client
        res.status(200).json({
            message: "Feedback sent successfully",
        });
    } catch (error) {
        // Handle errors
        console.error('Error sending feedback or email:', error);
        res.status(400).json({
            message: error.message || "Something went wrong",
        });
    }
};
