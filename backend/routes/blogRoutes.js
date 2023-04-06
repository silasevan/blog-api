const express = require("express");
const router = express.Router();

const {
  get_blog_post,
  add_blog_post,
  detail_blog_post,
  update_blog_post,
  post_comment,
  delete_Blog_post,
  delete_blog_comment,
} = require("../controller/blogController");
const { protect } = require("../middlewares/authMiddleware");
router.route("/").get(get_blog_post).post(protect, add_blog_post);
router
  .route("/:id")
  .get(detail_blog_post)
  .put(update_blog_post)
  .delete(protect, delete_Blog_post);
router.route("/:id/comments").post(protect, post_comment);
router.route("/:id/comments/:commentId").delete(protect, delete_blog_comment);

module.exports = router;
