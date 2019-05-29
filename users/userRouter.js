const express = require('express');

const userDb = require('./userDb.js');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', (req, res) => {
  const user = req.body;
  userDb
    .insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'There was an error saving the user to the database' });
    });
});

router.post('/:id/posts', (req, res) => {
  let post = req.body;
  const id = req.params.id;
  post.user_id = id;

  if (!post.text) {
    res.status(404).json({
      message: 'Please provide text for the post',
    });
  } else {
    postDb
      .insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database',
        });
      });
  }
  // userDb.getUserPosts(userPosts)
  //   .then(userPosts => {
  //   })
});

router.get('/', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error retrieving users' });
    });
});

router.get('/:id', (req, res) => {
  userDb
    .getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'A user with that specified ID does not exist' });
    });
});

router.get('/:id/posts', (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ error: 'A user with that specified id does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'asdasdf' });
    });
});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  if (req.body && req.body.id) {
    next();
  } else {
    res.status(400).json({ message: 'Provide ID' });
  }
  console.log(req.body);
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
