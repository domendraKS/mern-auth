import User_Model from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

//Update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }

  try {
    const { userName, email, password, profilePicture } = await req.body;

    if (password) {
      password = bcrypt.hashSync(password, 10);
    }
    const updatedUser = await User_Model.findByIdAndUpdate(
      req.params.id,
      {
        userName,
        email,
        password,
        profilePicture,
      },
      { new: true }
    );
    const { password: hashedPassword, ...rest } = updatedUser._doc;
    return res.status(200).json({ message: "Successfully Updated", rest });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  if (req.user.id !== id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }

  try {
    const checkUser = await User_Model.findById(id);
    if (!checkUser) return next(errorHandler(404, "User does not exist"));

    await User_Model.findByIdAndDelete(id);
    return res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
};
