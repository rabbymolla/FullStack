const User = require("../modle/userModle");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

const regController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.send({ error: "Plese fill up the from" });
  }
  if (password && password.length < 6) {
    return res.send({ error: "possoword too small" });
  }
  const existingUser = await User.find({ email: email });
  if (existingUser.length > 0) {
    return res.status(401).send({ error: `${email} alrady in use` });
  } else {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    bcrypt.hash(password, 10, async function (err, hash) {
      const user = new User({
        name: name,
        email: email,
        password: hash,
        otp: otp,
      });
      user.save();

      jwt.sign({ email: email }, "shhhhh", async function (err, token) {
        res.send({
          name: user.name,
          email: user.email,
          role: user.role,
          token: token,
        });

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
          subject: "This is your Verfication", // Subject line
          html: `<a href="http://localhost:5173/emaillink/${token}">Click Here:</a> `, // html body
        });
      });
    });
  }
};
module.exports = regController;
