import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;

import User from "../models/userModel.js";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
// Get login page
// GET /
export const getLogin = (req, res) => {
  res.render("home");
};


// Login user
// POST /

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.json( { message : '일치하는 사용자가 없습니다.'});
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ message : '비밀번호가 틀립나디'})
  }

  const token = jwt.sign( { id: user._id}, jwtSecret)
  res.cookie("token", token, {httpOnly: true});

  res.redirect("/contacts");
});


// Register page
// GET /register

export const getRegister = (req, res) => {
  res.render("register");
};


// Register user
// POST /register

export const registerUser = asyncHandler(async (req, res) => {
  const { username, password, password2} = req.body;

  if ( password === password2) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create( { username, password : hashedPassword });
    res.json( { message : "Register susccessful", user})
  } else {
    res.send("Register failed");
  }
});