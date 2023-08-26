router.get('/post/:id', async (req, res) => {
  try {      
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: Comment,
          include: [
            {
              model: User, 
              attributes: ['user_name']
            }
          ]
        }
      ]
    });

    const singlePost = post.get({ plain: true });
    res.render('post', {
      singlePost,
      logged_in: req.session.logged_in, 
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err, message: "Something went wrong." });
  } 
});



