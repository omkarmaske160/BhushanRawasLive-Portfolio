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
        await sendEmail({
            to: email,
            name
        });



        // Send email to yourself
        await sendSelfEmail({ name, email, mobile, description });

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
