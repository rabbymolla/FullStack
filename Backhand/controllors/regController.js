const User = require("../modle/userModle");
const bcrypt = require("bcrypt");

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
    bcrypt.hash(password, 10, function (err, hash) {
      const user = new User({
        name: name,
        email: email,
        password: hash,
      });
      user.save();
      res.send({
        name: user.name,
        email: user.email,
      });
    });
  }
};
module.exports = regController;
