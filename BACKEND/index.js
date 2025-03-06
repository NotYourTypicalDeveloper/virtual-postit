const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");

app.use(
  cookieSession({
    name: "session",
    keys: ["openreplay"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.listen("4000", () => {
  console.log("server is running");
});
