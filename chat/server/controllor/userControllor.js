const mongoose = require("mongoose");
const User = require("../models/userModal");
const expresshandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const registerUser = expresshandler(async (req, res) => {
  const { name, email, password, pic, isVerified } = req.body;
  try {
    const userExist = await User.findOne({ email });
    const nameExist = await User.findOne({ name });
    if (nameExist) {
      res.status(400).json({ message: "Name already exist" });
    }
    if (userExist) {
      res.status(400).json({ message: "User already exist" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
        pic,
        isVerified,
      });
      const user = await newUser.save();
      // const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
      //   expiresIn: "30d",
      // });
      res.status(200).json({ message: "User Register", user });
      // const transporter = nodemailer.createTransport(
      //   smtp({
      //     host: "smtp.gmail.com",
      //     port: 587,
      //     secure: false, // true for 587, false for other ports
      //     requireTLS: true,
      //     auth: {
      //       user: process.env.EMAIL,
      //       pass: process.env.PASSWORD,
      //     },
      //   })
      // );

      // const mailOptions = {
      //   from: process.env.EMAIL,
      //   to: email,
      //   subject: "Account Verification",
      //   html: `<h1>Click on the link to verify your account</h1>
      //   <a href="http://localhost:3000/verify/${token}">Click here</a>`,
      // };

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log("Email sent: " + info.response);
      //     transporter.close();
      //   }
      // });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const loginUser = expresshandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        res.status(200).json({ message: "Login successfully", token, user });
      } else {
        res.status(400).json({ message: "Password not matched" });
      }
    } else {
      res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//all user details
const allUser = expresshandler(async () => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).json({ user });
});
module.exports = { registerUser, loginUser, allUser };
