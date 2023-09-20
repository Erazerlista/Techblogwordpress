const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const userData = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const postData = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const commentData = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();