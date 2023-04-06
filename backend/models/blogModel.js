const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the comment schema
const commentSchema = new Schema({
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
});

// Define the blog post schema
const blogPostSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "BlogUser",
  },
  title: {
    type: String,
    required: [true, "Please add a text value"],
  },
  imageUrl: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

// Create the Mongoose models
const Comment = mongoose.model("Comment", commentSchema);
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = { Comment, BlogPost };
