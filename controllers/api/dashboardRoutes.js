// NEED TO GET USERS BLOGPOSTS
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//CRUD
//GET all user blogposts
router.get('/', withAuth, async (req, res) => {
    try {
        if (!req.session.logged_in) {
            return res.redirect('/login');
        }

        const userId = req.session.user_id;

        const blogpostData = await BlogPost.findAll({
            where: { user_id: userId },
            include: [ Comment ]
        });

        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true}));

        res.render('dashboard', {
            blogposts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const newBlogPost = await BlogPost.create({
        ...req.body,
        user_id: req.session.user_id,
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
          user_id: req.session.user_id,
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