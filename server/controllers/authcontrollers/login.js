const UserModel = require("../../models/users");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const generateToken = require("../../libs/utils");
const loginUser = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);

  if (validationError) {
    return res
      .status(400)
      .json({ message: validationError.details[0].message });
  }
  const { email, password } = req.body;
  try {
    const formattedEmail = email.toLowerCase();
    const isUser = await UserModel.findOne({ email: formattedEmail });
    if (!isUser) {
      return res.status(400).json({ message: "The user does not exist" });
    }
    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Incorrect pasword" });
    }
   const token= generateToken(isUser._id, res);
    res
      .status(200)
      .json({
        token,
        message: "Login successfull",
        status: true,
        isUser,
      });
  } catch (err) {
    next(err);
  }
};
module.exports = loginUser;

function validateUser(data) {
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(12).required(),
  });
  return userSchema.validate(data);
}
