const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:id', async (req, res) => {
    try {
        // Create a new comment associated with the provided post ID and user ID
        const message = await Comment.create({
            ...req.body, // Spread operator to include fields like "comment_text"
            post_id: req.params.id, // Link comment to the post
            user_id: req.session.user_id // Associate comment with the logged-in user
        });
        res.json({ message }); // Respond with a success message or the created comment data
    } catch (err) {
        res.status(500).json(err); // Handle errors by responding with a 500 status code
    }
});

module.exports = router;
