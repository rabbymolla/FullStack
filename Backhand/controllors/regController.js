const User = require("../modle/userModle");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

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
    return res.send({ error: `${email} alrady in use` });
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

      const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: "rabby16139@gmail.com",
          pass: "wokz ipba uanh gnvd",
        },
      });

      const info = await transporter.sendMail({
        from: ` "Ecomarce"`, // sender address
        to: email, // list of receivers
        subject: "This is your Verfication", // Subject line
        html: `Here is your <b>OTP:</b> ${otp} `, // html body
      });

      res.send({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });
  }
};
module.exports = regController;
