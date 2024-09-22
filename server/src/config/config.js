require("dotenv").config();
const env = {
   mongoUrl: process.env.MONGODB_URL,
   jwtSecret: process.env.JWT_SECRET,
};

module.exports = env;
