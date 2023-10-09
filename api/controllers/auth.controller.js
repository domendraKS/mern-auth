import User_Model from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//1. Signup
export const signup = async (req, res, next) => {
  const { userName, email, password } = await req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User_Model({ userName, email, password: hashedPassword });

  try {
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

//2. Signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User_Model.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: 10000,
    });
    const { password: hashedPassword, ...rest } = validUser._doc;
    // const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    return res.status(200).json({ message: "Successfully login", rest, token });
  } catch (error) {
    next(error);
  }
};

//Google signin
export const google = async (req, res, next) => {
  try {
    const user = await User_Model.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 10000,
      });
      const { password: hashedPassword, ...rest } = user._doc;
      return res.status(200).json({ rest, token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User_Model({
        userName:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: 10000,
      });
      const { password: hashedPassword2, ...rest } = newUser._doc;
      res.status(201).json({ rest, token });
    }
  } catch (error) {
    next(error);
  }
};
