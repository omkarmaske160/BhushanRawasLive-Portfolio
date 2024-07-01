const { addFeedback } = require("../controller/emailController")


const protectedRoute = require("express").Router()

protectedRoute


    .post("/add-feedback", addFeedback)




module.exports = protectedRoute  