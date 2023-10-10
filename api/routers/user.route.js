import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.patch("/update/:id", verifyUser, updateUser);

export default userRouter;
