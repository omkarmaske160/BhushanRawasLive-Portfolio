const validator = require("validator");
const feedback = require("../model/emailModel");
const sendEmail = require("../utils/email");

exports.addFeedback = async (req, res) => {
    try {
        const { name, email, description, mobile } = req.body


        console.log(req.body);
        if (
            validator.isEmpty(name) ||
            validator.isEmpty(email) ||
            validator.isEmpty(mobile) ||
            validator.isEmpty(description)
        ) {
            res.status(400).json({
                message: "all fields required"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "please provide valid email"
            })
        }


        // Create feedback entry in the database
        const data = await feedback.create(req.body);

        // Send email
        await sendEmail({
            to: req.body.email,
            name: req.body.name
        });

        // Respond to the client
        res.status(200).json({
            message: `Feedback sent successfully`,
        });
    } catch (error) {
        // Handle errors
        console.error('Error sending feedback or email:', error);
        res.status(400).json({
            message: error.message || "Something went wrong",
        });
    }
};
