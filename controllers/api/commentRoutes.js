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

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.userId,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found!' });
        return;
      }
  
      res.status(200).json(blogpostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
