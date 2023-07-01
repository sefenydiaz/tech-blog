// NEED TO GET USERS BLOGPOSTS
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

//CRUD
//GET all user blogposts
router.get('/', async (req, res) => {
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

  module.exports = router;