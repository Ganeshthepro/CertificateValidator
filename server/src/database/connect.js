const mongoose = require("mongoose")
const env = require("../config/config.js")

const connect = async () => {
    try {
       await mongoose.connect(env.mongoUrl)
       console.log("database connected");
       
    } catch (error) {
        console.log("something went wrong" + error.message);
        
    }
}

module.exports = connect