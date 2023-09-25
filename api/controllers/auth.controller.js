import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ userName, email, password: hashedPassword });

  try {
      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json(error.message)
  }
};
