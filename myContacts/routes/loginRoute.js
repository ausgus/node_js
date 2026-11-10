import express from "express";
export const router = express.Router();

import { getLogin, loginUser, getRegister, registerUser } from "../controllers/loginController.js";


router.route("/")
  .get(getLogin)
  .post(loginUser);


router.route("/register")
  .get(getRegister)
  .post(registerUser);