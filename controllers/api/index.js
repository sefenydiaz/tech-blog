const router = require('express').Router();
// connect commentRoutes
const commentRoutes = require("./commentRoutes")
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");

// router.use comments
router.use("/comments", commentRoutes)
router.use("/users", userRoutes)
router.use("/blogs", blogRoutes)

module.exports = router;