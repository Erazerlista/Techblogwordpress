const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({ username: 'user1', email: 'user1@example.com', password: 'password1' });
  const post1 = await Post.create({ title: 'Post 1', content: 'Content of post 1', user_id: user1.id });
  const comment1 = await Comment.create({ comment_text: 'Comment 1', user_id: user1.id, post_id: post1.id });

  process.exit(0);
};

seedDatabase();
