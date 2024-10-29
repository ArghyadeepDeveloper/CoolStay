const handleMongooseError = require("../../helpers/errorHandler");
const UserModel = require("../../models/users.model");
const bcrypt = require('bcrypt');

async function register(req, res, next) {
  try {
    console.log(req.body);
    const { firstName, lastName, email, phoneNumber, type, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !phoneNumber || !type || !password) {
      return res.status(400).json({
        message: "Please insert all data",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // Using a salt round of 10 for hashing

    // Create a new user document
    const newAdmin = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
      phoneNumber,
      type,
    });

    // Save the new user to the database
    const newSavedAdmin = await newAdmin.save();
    res.status(201).json({ message: "Admin added", data: newSavedAdmin });
  } catch (error) {
    const errorString = handleMongooseError(error);
    res.status(500).json({ message: errorString });
  }
}

async function login(req,res,next){
    try{
        const {email,password} = req.body;

        if(!email || !password)
            res.status(400).json({message: "Please enter all data"})
        

        let userFound = await UserModel.findOne({email})

        if(!userFound) {
            res.status(404).json({message:"This email doest not exists."})
        }else{
            res.status(200).json({message:"email found"})
        }


    }catch(error){
        let errorString = handleMongooseError(error);
        res.status(500).json({ message: errorString });
    }
}

module.exports = { register , login };
