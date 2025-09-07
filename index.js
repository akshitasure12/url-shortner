const express = require("express");
const path = require("path");
const {connectToDB} = require("./connection.js");
const Url = require("./models/url.js");
const cookieParser = require("cookie-parser");
const {checkForAuth, restrictTo} = require("./middlewares/auth.js");
const app = express()

const PORT = 8000

const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticRoute");
const userRouter = require("./routes/user.js");

connectToDB("mongodb://127.0.0.1:27017/url")
  .then(() => console.log("DB connection secured"))
  .catch((err) => console.log("error obtained"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuth);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log("port successfully running"));

