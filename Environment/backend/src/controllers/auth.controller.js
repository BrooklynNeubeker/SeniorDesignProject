import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import transporter from "./nodemailer.controller.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    //hash passwords
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    //checking there's already a user with same email
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already in use." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data." });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required." });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// being used when user is refreshing application
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    // finding the user by email
    const user = await User.findOne({ email: req.body.email });
    // verifies if user email in the database
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    
    const token = generateToken(
      user._id, res,
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );
   
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset",
      html: `<p>You requested for password reset</p>
      <p> Click on the link to reset your password: </p>
      <a href="http://localhost:5173/reset-password/${token}">Reset Password</a>
      <p>This link will expire in 10 minutes</p>
      <p>If you did not request for password reset, please ignore this email</p>`,
    };

    // send the email
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Error sending email", error);
      }
      res.status(200).json({ message: "Email sent successfully." });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const resetPassword = async (req, res) => {
  try {
  
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }
    // find the user by id from token 
    const user = await User.findById( {_id: decodedToken.userId} );
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    // hash the new password
    const salt = await bcrypt.genSalt(10);
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
    // update the user's password
    user.password = req.body.newPassword;
    await user.save();
    //sending success response
    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  } 
};
