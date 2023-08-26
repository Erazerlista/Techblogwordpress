const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth'); // Import the withAuth middleware

// This route requires authentication
router.get('/dashboard', withAuth, (req, res) => {
  // If the user is logged in, proceed to the route handler logic
  res.render('dashboard', { user: req.session.user_id });
});

module.exports = router;
