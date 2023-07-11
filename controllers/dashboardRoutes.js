// NEED TO GET USERS BLOGPOSTS
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//CRUD
//GET all user blogposts
router.get('/', withAuth, async (req, res) => {
    try {
    
        const userId = req.session.userId;

        const blogpostData = await BlogPost.findAll({
            where: { user_id: userId },
            include: [ Comment ]
        });

        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true}));
        console.log(blogposts);
        res.render('dashboard', {
            blogposts,
            name: req.session.username,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
      console.log(err)
        res.status(500).json(err);
    }
});

// need a route for /:id to search for specific blogpost
// need a blogpost hb for single blogposts
// api route for comments on single blogposts
// update and delete

  module.exports = router;