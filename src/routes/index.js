// instantiate route object from express
const Router = require("express").Router();
// require database model
const UserModel = require("../models/user.model");
// validation middleware
const { validateLogin, validateRegistration } = require("../validation");
// helpers
const { generateToken, createHash } = require("../helpers");

Router.post("/login", validateLogin, async (req, res, next) => {
  // login service | end point for login process
  const user = await UserModel.findOne({ email: req.data.email }).exec();
  if (!user) return res.status(404).json({ message: "no user found" });
  // check if user password is correct
  if (user.password !== createHash(req.data.password))
    return res.status(400).json({ message: "Incorrect password" });

  // generate access token if login success
  const token = generateToken(user._doc._id.toString());

  res.status(200).json({ token });
});

// register service | end point for registration process
Router.post("/register", validateRegistration, (req, res, next) => {
  // destruct passwords from data
  const { password, confirmPassword } = req.data;
  // check equality of passwords
  if (password !== confirmPassword)
    // if are not equal then run the error handler middleware
    return next({ status: 400, message: "Mismatch password!" });
  // else hash the password
  req.data.password = createHash(req.data.password);
  // delete confirm password after validation success
  delete req.data.confirmPassword;
  // save user to the database
  const user = new UserModel(req.data).save();
  // if saved successfully
  user
    .then((data) => {
      // send the saved object
      res.status(201).json(data);
    })
    .catch((err) => {
      // run the error handler middleware
      next({ status: 409, message: err.message });
    });
});

module.exports = Router;
