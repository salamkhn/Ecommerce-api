import { error } from "console";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";

// LOGIC FOR REGISTRING THE USER
export const RegisterUser = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  console.log("name", name);

  // Early validation for empty fields
  if (name == "" || email == "" || password == "" || confirmpassword == "") {
    console.log("all fields are required");
    return res.status(404).json({
      message: "all fields are required",
      success: false,
    });
  }
  try {
    // check if password match
    if (password !== confirmpassword) {
      console.log("password and confirm password not matching");
      return res.status(400).json({
        message: "password and confirm password should be matched",
      });
    } else {
      //  step:1=>hashing the password
      const hashpassword = await bcrypt.hash(password, 10);

      //  step:2=>adjeceting details with schema
      const user = await userModel.create({
        name,
        email,
        password: hashpassword,
      });

      //  step:2=>Reurning the response if every thing working correct
      return res.status(201).json({
        message: "user registered successfully",
        userData: user,
        success: true,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "internal error during registration",
      error: err.message,
      success: false,
    });
  }
};

// LOGIC FOR LOGIN THE USER

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).res.json({
      message: "both field is required for login",
      success: false,
    });
  }
  try {
    // find the user from the database
    const user = await userModel.findOne({ email });

    // comparing from the bcrypted password
    const bcryptpassword = bcrypt.compare(password, user.password);

    if (!bcryptpassword) {
      console.log("password", password + "user.password", user.password);
      return res.status(203).json({
        message: "Invalid login details",
        success: false,
      });
    }
    // if login detail is matched than give a token to him
    const token = jwt.sign({ userId: user._id }, process.env.SECRETE_KEY, {
      expiresIn: "1h",
    });
    console.log("token from the login section=>:", token);
    return res.status(200).json({
      message: "user login successfully and user is this",
      user,
      token,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "error  during the login ",
      error: err.message,
      success: false,
    });
  }
};
