const UserModel = require("../../models/users");
const bcrypt = require("bcrypt");
const joi = require("joi");
const generateToken = require("../../libs/utils");

const registerUser = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);

  if (validationError) {
    return res
      .status(400)
      .json({ message: validationError.details[0].message });
  }
  const { username, email, password } = req.body;
  try {
    const formattedEmail = email.toLowerCase();
    const formattedName = username.toLowerCase();
    const existingUser = await UserModel.findOne({
      email: formattedEmail,
      username: formattedName,
    });
    if (existingUser) {
      return res.status(400).json({ message: "This user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username: formattedName,
      email: formattedEmail,
      password: hashedPassword,
    });
    const token=generateToken(newUser._id, res);
    await newUser.save();
    res
      .status(200)
      .json({
        token,
        username: newUser.username,
        message: "User registered successfully",
      });
  } catch (err) {
    next(err);
  }
};

module.exports = registerUser;

function validateUser(data) {
  const userSchema = joi.object({
    username: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(12).required(),
  });
  return userSchema.validate(data);
}
