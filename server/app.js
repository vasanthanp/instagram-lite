const mongoose = require("mongoose");
const express = require("express");
const { db } = require("./config");
const userRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRoutes");
const app = express();
const PORT = 5000;

mongoose.connect(
  "mongodb://localhost",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("db connected successfully");
    }
  }
);
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.listen(PORT, () => console.log(`server listen at ${PORT}`));
