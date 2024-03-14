"use strict";
/**--------BLOG API with Mongoose  */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// DB
require("./src/configs/dbConnection");

/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session

const session = require("cookie-session");

app.use(
  session({
    secret: process.env.SECRET_KEY, //secret key
    // maxAge: 1000 * 60 * 60 * 24 *3, // 3 days
  })
);

app.use(express.json()); // keep it at the top

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Blog API",
    logedInIser: req.session,
  });
});

require("express-async-errors");
app.use("/user", require("./src/routes/user.router"));
app.use("/blog", require("./src/routes/blog.router"));

app.use(require("./src/middlewares/errorHandler")); // keep it at the bottom

app.listen(PORT, () => console.log(`Running on: http://${HOST}:${PORT}`));

// require("./src/sync")();
