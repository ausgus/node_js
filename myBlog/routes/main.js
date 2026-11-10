import express from "express";
import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;
export const router = express.Router();
const mainLayout = "../views/layouts/main.ejs"
import { Post } from "../models/Post.js";


router.get(["/", "/home"], asyncHandler( async (req, res) => {
  const locals = {
    title : "Home"
  };

  const data = await Post.find();
  res.render("index", { locals , data, layout: mainLayout });
}));


router.get("/about", (req, res) => {
  const locals = {
    title : "About"
  };

  res.render("about", { locals , layout: mainLayout });
});


//게시물 상세보기
//GET /post/:id


router.get(
  "/post/:id", 
  asyncHandler( async (req, res) => {
    const data = await Post.findOne({_id : req.params.id });
    const locals = {
      title : "게시물 상세"
    };

    res.render("post", { locals, data, layout: mainLayout });
  })
)