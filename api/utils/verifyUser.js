import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Verify the token
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized access token"));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};