const router = require("express").Router();
const User = require("../database/dbSchema");
const {
  registerValidation,
  loginValidation
} = require("../Joi_Validation/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//USER REGISTRATION ENDPOINT
router.post("/register", async (req, res) => {
  //LETS VALIDATE BEFORE WE SAVE THE USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //CHECK IF THE USER ALREADY EXIST IN DB
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist)
    return res.status(400).send(`user ${req.body.email} already exist!`);

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    //SAVE USER TO MONGODB
    const savedUser = await user.save();
    res.send(`User ${savedUser._id} is now registered!`);
  } catch (err) {
    res.status(400).send(err);
  }
});

//USER LOGIN ENDPOINT
router.post("/login", async (req, res) => {
  //LETS VALIDATE DATA BEFORE WE LOG THE USER IN
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //CHECK IF THE USER EXIST IN DB
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) return res.status(404).send("user is not found!");

  const validPass = await bcrypt.compare(req.body.password, userExist.password);
  if (!validPass) return res.status(401).send("Invalid Password!");

  const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(`user is loggedIn with token ${token}`);
});

module.exports = router;
