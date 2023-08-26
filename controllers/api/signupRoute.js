const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // Check if the provided username is already taken
    const findUser = await User.findOne({ where: { user_name: req.body.user_name } });
    if (findUser) {
      res.status(400).json({ message: 'Username is already taken.' });
      return;
    }

    // Create a new user
    const user = await User.create({
      user_name: req.body.user_name,
      password: req.body.password
    });

    // Set up the user's session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json(user);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
