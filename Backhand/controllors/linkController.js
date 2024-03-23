const User = require("../modle/userModle");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const api = express();

const linkController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const decoded = jwt.verify(email, "shhhhh");

    const findUser = await User.findOne({ email: decoded.email });
    if (!findUser.emailVerified) {
      await User.findOneAndUpdate(
        { email: decoded.email },
        { emailVerified: true }
      );
      res.send("OTP Is Massing");
    } else {
      res.send("OTP not mascing");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = linkController;
