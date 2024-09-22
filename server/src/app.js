const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/authRoutes.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
   res.send("welcome to api :) ");
});

app.use("/ajax/v1", userRoutes);

module.exports = app;
