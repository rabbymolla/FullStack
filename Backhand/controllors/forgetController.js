const User = require("../modle/userModle");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const forgetController = async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    console.log(existingUser);
    jwt.sign({ email: email }, "shhhhh", async function (err, token) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "rabby16139@gmail.com",
          pass: "kecb xykz ejiz rdvp",
        },
      });
      const info = await transporter.sendMail({
        from: `rabby16139@gmail.com`, // sender address
        to: email, // list of receivers
        subject: "This is your change password link", // Subject line
        html: `<a href="http://localhost:5173/newpass/${token}">Click Here:</a> `, // html body
      });
    });
  } else {
    res.send({ error: "user not found" });
  }
};
module.exports = forgetController;
