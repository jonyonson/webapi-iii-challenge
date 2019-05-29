const express = require('express');

const userDb = require('./userDb.js');

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

router.post('/:id/posts', validateUserId, (req, res) => {
  // userDb.getUserPosts(req.params.id).then()
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

router.get('/:id', (req, res) => {});

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
