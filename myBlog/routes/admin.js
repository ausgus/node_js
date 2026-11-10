import express from "express";
export const router = express.Router();
import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;
import bcrypt from "bcrypt";
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/noLogout";

import { userModel } from "../models/User.js";
import { Post } from "../models/Post.js";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
const jwtSecret = process.env.JWT_SECRET;



//Check Login

const checkLogin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect("/admin");
  } else {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.Id;
      next();
    } catch(error) {
      res.redirect("/admin")
    };
  };
};




//Admin Page
//GET /admin
router.get("/admin", (req, res) => {
  const locals = {
    title: "Admin Page"
  }

  res.render("admin/index", { locals, layout: adminLayout2 });
});


//Check Login
//POST /admin
router.post("/admin", asyncHandler( async(req, res) => {
  const { username, password } =req.body;
  const user = await userModel.findOne({ username });
  
  if (!user) {
    return res.status(401).json( {message: '일치하는 사용자가 없습니다.'});
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.'});
  }

  const token = jwt.sign({ id: user._id}, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/allPosts");
}));


//Get All Posts
//GET /allPosts

router.get("/allPosts", checkLogin, asyncHandler( async(req, res) => {
  const locals = {
    title: "Posts"
  };

  const data = await Post.find();
  res.render("admin/allPosts", { locals, data, layout: adminLayout });
}))


//Admin Logout
//GET /logout

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});



//Admin - Add Post
//GET /add

router.get("/add", checkLogin, asyncHandler( async(req, res) => {
  const locals = {
    title: "게시물 작성"
  };

  res.render("admin/add", { locals, layout: adminLayout});
}));


//Admin - Add Post
//POST /add

router.post("/add", checkLogin, asyncHandler( async(req, res) => {
  const { title, body } = req.body;

  const newPost = new Post ( {
    title: title,
    body: body
  } );
  await Post.create(newPost);
  res.redirect("/allPosts");
}));




//Admin - Edit post
//GET /edit/:id

router.get("/edit/:_id", checkLogin, asyncHandler( async(req, res) => {
  const locals = {
    title: "게시물 편집"
  };
  const data = await Post.findOne( { _id: req.params._id } );

  res.render("admin/edit", { locals, data, layout:adminLayout });
}));



//Admin - Edit post
//PUT /edit/:id

router.put("/edit/:id", checkLogin, asyncHandler( async(req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,
    createdAt: Date.now()
  });

  res.redirect("/allPosts");
}));



//Admin - Delete post
//DELETE /edit/:id

router.delete("/delete/:id", checkLogin, asyncHandler( async(req, res) => {
  await Post.deleteOne({ _id: req.params.id });
  res.redirect("/allPosts");
}));







//View Register Form
//GET /register

router.get("/register", asyncHandler( async(req, res) => {
  res.render("admin/index", { layout: adminLayout2 });
}))

//Register Administrator
//POST /register

router.post("/register", asyncHandler( async(req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = userModel.create( {
    username: req.body.username,
    password: hashedPassword
  });
}));