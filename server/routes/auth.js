const router = require("express").Router();
const User = require("../database/dbSchema");
const {
  registerValidation,
  loginValidation
} = require("../Joi_Validation/validation");
const bcrypt = require("bcryptjs");

//USER REGISTRATION ENDPOINT
router.post("/register", async (req, res) => {
  //LETS VALIDATE BEFORE WE SAVE THE USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //CHECK IF THE USER ALREADY EXIST IN DB
  const userExist = await User.findOne({ email: req.body.email });
  console.log(userExist);
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
    res.send(`User ${savedUser.name} is now registered!`);
  } catch (err) {
    res.status(400).send(err);
  }
});

//USER LOGIN ENDPOINT
router.post("/login", async (req, res) => {
  //LETS VALIDATE BEFORE WE LOG THE USER IN
  const { error } = loginValidation(req.body);
  if (error) return err.details[0].message;

  //CHECK IF THE USER EXIST IN DB
  // const userExist = await User.findOne({ email: req.body.email });
  // if (userExiss) re;
  res.send("user is loggedIn");
});

module.exports = router;
