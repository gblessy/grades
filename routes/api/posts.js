const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post Model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc  Test post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Post Works" }));

// @route GET api/posts
// @desc  Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/posts/:id
// @desc  Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ postnotfound: "No Post found with that ID" })
    );
});

// @route DELETE api/posts/:id
// @desc  Delete post by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profle => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ noauthorized: "User not authorized" });
          }
          post.remove().then(() => res.json({ seccess: true }));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "No Post found with that ID" })
        );
    });
  }
);

// @route POST api/posts
// @desc  Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/posts/like/:id
// @desc  Like posts
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profle => {
      Post.findById(req.params.id)
        .then(post => {
          console.log(post);
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          post.likes.unshift({ user: req.user.id });

          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.json(err));
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({ postnotfound: "No Post found with that ID" });
        });
    });
  }
);

// @route POST api/posts/unlike/:id
// @desc  UnLike posts
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profle => {
      Post.findById(req.params.id)
        .then(post => {
          console.log(post);
          console.log(req.user.id);
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not liked this post" });
          }
          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);

          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.json(err));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "No Post found with that ID" })
        );
    });
  }
);

// @route POST api/posts/comment/:id
// @desc  Comment posts
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);

        post
          .save()
          .then(post => {
            res.json(post);
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Remove Comment posts
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check that comment exists
        if (
          post.comments.filter(comment => {
            // console.log(comment._id.toString(), req.params.comment_id);
            comment._id.toString() === req.params.comment_id;
          }).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: "Comment not exists" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post
          .save()
          .then(post => {
            res.json(post);
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
