const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//comment.create
router.post('/', withAuth, async (req, res) => {
    try {
        console.log('creating comment')
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.userId,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;
