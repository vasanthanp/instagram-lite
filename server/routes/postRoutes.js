const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const requireLogin = require("../authenticateJWT");
const Post = require("../models/postModel");
router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, imageUrl } = req.body;
  if (!title || !body || !imageUrl) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  const newPost = new Post({ title, body, imageUrl, postedBy: req.user });
  newPost.save((err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ post });
    }
  });
});

router.get("/allposts", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ posts });
      }
    });
});
router.get("/myposts", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ posts });
      }
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true },
    (err, result) => {
      if (err) return res.status(422).json({ error: err });
      res.json(result);
    }
  );
});
router.put("/unlike", requireLogin, (req, res) => {
  console.log(req.user._id);
  Post.findById(
    req.body.postId,
    { $pull: { likes: { $eq: req.user._id } } },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(422).json({ error: err });
      }
      res.json(result);
    }
  );
});

// router.put("/like", requireLogin, (req, res) => {
//   Post.findById(req.body.postId, (err, post) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("post---------------------", post);
//       const existing = post.likes.find((id) => id === req.user._id);
//       if (existing) {
//         post.likes.pop(req.user._id);
//       } else {
//         post.likes.push(req.user._id);
//       }
//       const updatedPost = new Post(post);
//       updatedPost.save((err, updated) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(updated);
//         }
//       });
//     }
//   });
// });
module.exports = router;
