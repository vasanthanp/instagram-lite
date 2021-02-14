const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET_KEY } = require("../key");
const requiredLogin = require("../authenticateJWT");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Enter vald details" });
  }
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      return res.json({ error: "User already exists" });
    } else if (err) {
      console.log(err);
    } else {
      bcryptjs.hash(password, 12, (err, hashedPassword) => {
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });
        newUser.save((err, newUser) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ message: "registered successfully" });
          }
        });
      });
    }
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Enter a valid Email and Password" });
  }
  User.findOne({ email: email }, (err, user) => {
    if (!user) {
      return res.status(422).json({ error: "Invalid Email or Password" });
    }
    bcryptjs.compare(password, user.password, (err, success) => {
      if (err) {
        console.log(err);
      } else if (!success) {
        res.status(422).json({ error: "Invalid Email or Password" });
      } else {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY);
        const { _id, name, email } = user;
        res.json({ token, user: { _id, name, email } });
      }
    });
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
