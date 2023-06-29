const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');


//CRUD
//GET all blogposts
router.get('/', async (req, res) => {
    try {
      
      const blogpostData = await BlogPost.findAll({
        include: [ Comment ]
      });
  
      
      const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
  
      
      res.render('homepage', { 
        blogposts, 
        // logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // GET blogpost by id
  router.get('/blogpost/:id', async (req, res) => {
    try {
      const blogpostData = await BlogPost.findByPk(req.params.id, {
        include: [ Comment ]
      });
  
      const blogpost = blogpostData.get({ plain: true });
  
      res.render('blogpost', {
        ...blogpost,
        // logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //withAUTH GET ROUTE NEEDED !

  router.post('/', async (req, res) => {
    const newBlogPost = await BlogPost.create(req.body)
    res.json(newBlogPost)
  })


  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;