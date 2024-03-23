const User = require("../modle/userModle");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });

  console.log(findUser.password);
  if (findUser) {
    // Load hash from your password DB.
    bcrypt.compare(password, findUser.password, function (err, result) {
      // result == true
      console.log(result);
      if (result) {
        res.send({ success: "Login Succfull" });
      } else {
        res.send({ error: "Credinsial Not Match" });
      }
    });
  } else {
    res.send("OTP not mascing");
  }
};

module.exports = loginController;
