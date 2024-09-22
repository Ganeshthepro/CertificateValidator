
const userModel = require("../models/userModel.js")
const createUser =  async (req , res) => {
    try {
        const {email , username , password} = req.body
        const isExist = userModel.find({email})

        if(isExist) res.status(400).json({status : "error" , msg : "user all ready exist"})

        const newUser = new userModel({
            email,
            username,
            password
        })
        await newUser.save()
        res.status(200).json({status : "success" ,user : newUser})
    } catch (error) {
        res.status(500).json({status : "error" , msg : error.message}) 
    }
}

module.exports = {createUser}