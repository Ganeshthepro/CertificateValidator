const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
      },
      fullname: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         uniq: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         enum: ["admin", "user"],
         default: "user",
      },
   },
   { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
