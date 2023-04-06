const asyncHandler = require("express-async-handler");
const { BlogPost, Comment } = require("../models/blogModel");
const BlogUser = require("../models/userModel");

// Get all blog posts
const get_blog_post = asyncHandler(async (req, res) => {
  const blogPosts = await BlogPost.find();
  res.status(200).json(blogPosts);
});

// Add a post
const add_blog_post = asyncHandler(async (req, res) => {
  const post = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    user: req.user.id,
  });
  await post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to create post",
        error: error,
      });
    });
});
// update a blog post

const update_blog_post = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const blog = await BlogPost.findById(postId);
  if (!blog) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const user = await BlogUser.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (blog.user.toString() !== userId.toString()) {
    return res.status(403).json({ error: "User not authorized" });
  }

  const updatedPost = req.body;
  const result = await BlogPost.findByIdAndUpdate(postId, updatedPost, {
    new: true,
  });
  res.status(200).json(result);
});

// GET /posts/:id route handler to retrieve a single blog post with comments
const detail_blog_post = asyncHandler(async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate("comments");
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST /posts/:id/comments route handler to add a new comment to a blog post
const post_comment = asyncHandler(async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const user = await BlogUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const comment = new Comment(req.body);
    comment.user = userId;
    post.comments.push(comment);
    await Promise.all([comment.save(), post.save()]);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint for deleting blog post

const delete_Blog_post = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;

    const blog = await BlogPost.findById(postId);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await BlogUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (blog.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "User not authorized" });
    }
    const post = await BlogPost.findByIdAndDelete(blog);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// end point to delete comment in a blog post

const delete_blog_comment = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;

    // Find the blog post by ID and remove the comment by ID
    const result = await BlogPost.findByIdAndUpdate(
      postId,
      { $pull: { comments: commentId } },
      { new: true }
    );

    // If the blog post is not found, return a 404 error
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is authenticated
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Find user by ID
    const user = await BlogUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the comment to be deleted
    const comment = result.comments.find(
      (comment) => comment._id.toString() === commentId.toString()
    );

    // Check if user is authorized to delete the comment
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "User not authorized" });
    }

    // Delete comment from comment collection
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    // Return a success message
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  get_blog_post,
  add_blog_post,
  detail_blog_post,
  update_blog_post,
  post_comment,
  delete_Blog_post,
  delete_blog_comment,
};
