const express = require('express')
const router = express.Router()


const { get_blog_post, add_blog_post, detail_blog_post, update_blog_post, post_comment, delete_Blog_post, delete_blog_comment} = require('../controller/blogController')

router.route('/').get(get_blog_post).post(add_blog_post)
router.route('/:id').get(detail_blog_post).put(update_blog_post).delete(delete_Blog_post)
router.route('/:id/comments').post(post_comment)
router.route('/:id/comments/:commentId').delete(delete_blog_comment)


module.exports= router