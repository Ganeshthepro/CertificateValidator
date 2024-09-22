// import express from "express"
const express = require("express")
const userRoutes = require("./routes/userRoutes.js")

 const app = express()

app.get("/" , (req , res) => {
 res.status(200).json({status : "success" ,msg : "wellcome"})
})

app.use("/api/v2"  ,userRoutes)

module.exports = app