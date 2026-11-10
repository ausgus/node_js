
import dotenv from "dotenv";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
const expressLayouts = expressEjsLayouts;
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import methodOverride from "method-override";


import { router as mainRouter } from "./routes/main.js";
import { router as adminRouter } from "./routes/admin.js";


const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(methodOverride("_method"));


app.use("/", mainRouter);

app.use("/", adminRouter);



app.listen( port, () => {
  console.log(`App listening on port ${port}`);
});