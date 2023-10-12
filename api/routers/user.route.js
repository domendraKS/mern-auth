import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.patch("/update/:id", verifyUser, updateUser);
userRouter.delete("/delete/:id", verifyUser, deleteUser);

export default userRouter;
