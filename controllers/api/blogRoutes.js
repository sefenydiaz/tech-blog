const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        console.log('creating blogpost')
      const newBlogPost = await BlogPost.create({
        ...req.body,
        user_id: req.session.userId,
      });
  
      res.status(200).json(newBlogPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogpostData = await BlogPost.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.userId,
        },
      });
  
      if (!blogpostData) {
        res.status(404).json({ message: 'No blogpost found with this id!' });
        return;
      }
  
      res.status(200).json(blogpostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;