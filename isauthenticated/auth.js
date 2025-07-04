import { userModel } from "../models/user.js";

import jwt from "jsonwebtoken";

export const isAunthaticated = async (req, res, next) => {
  try {
    const token = req.header("auth");

    if (!token) {
      return res.status(404).json({
        message: "First login",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRETE_KEY);

    console.log("decode:-", decode);

    const user = await userModel.findById(decode.userId);

    console.log("user from the auth", user);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(404).json({
      error: err.message,
      success: false,
    });
  }
};
