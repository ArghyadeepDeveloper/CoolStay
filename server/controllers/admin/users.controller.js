const handleMongooseError = require("../../helpers/errorHandler");
const UserModel = require("../../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  try {
    console.log(req.body);
    const { firstName, lastName, email, phoneNumber, type, password } =
      req.body;

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !type ||
      !password
    ) {
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

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all data" });
    }

    // Find the user by email
    const userFound = await UserModel.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "This email does not exist." });
    }

    console.log("userfound is ", userFound)

    // Check if the password matches
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create a JWT token with user's _id and type as payload
    const token = jwt.sign(
      { _id: userFound._id, type: userFound.type },
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: "24h" } // Token expiration time
    );

    // Send the token as a response
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    const errorString = handleMongooseError(error);
    return res.status(500).json({ message: errorString });
  }
}

async function uploadProfilePicture(req, res, next) {
      console.log(req.file)
}

async function updateProfilePicture(req, res) {
  try {
    console.log(req.file)
    console.log(req.user)
    const { _id, type } = req.user; // Assuming `id` and `type` are in `req.user` from authentication middleware
    const  profilePicUrl  = req.file.filename; // `profilePicUrl` should be in the request body
    console.log(profilePicUrl)
    if (!profilePicUrl) {
      return res.status(400).json({ message: "Profile picture URL is required" });
    }

    // Find user by `id` and `type`, then update `profilePicUrl`
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: _id, type: type },             // Match user by `id` and `type`
      { profilePicUrl: profilePicUrl },     // Update `profilePicUrl`
      { new: true }                         // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture updated successfully",
      user: updatedUser
    });
  } catch (error) {
    let errorMessage = handleMongooseError(error)
    res.status(500).json({
      message: errorMessage,
      error: error.message
    });
  }
}

module.exports = { register, login, uploadProfilePicture, updateProfilePicture };
