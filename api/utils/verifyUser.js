import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyUser = async (req, res, next) => {
  const checkToken = req.headers.authorization;

  if (!checkToken) return next(errorHandler(403, "You can not authenticated"));

  jwt.verify(checkToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid..!"));

    req.user = user;
    next();
  });
};
