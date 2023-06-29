const BlogPost = require('./BlogPost');
const User = require('./User');
const Comment = require('./Comment');

// ASSOCIATIONS

BlogPost.hasMany(Comment, {
    foreignKey: "blog_id",
    onDelete: "CASCADE"
}) 

User.hasMany(BlogPost, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

module.exports = {BlogPost, User, Comment}