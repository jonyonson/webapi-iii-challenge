const express = require('express');

const userDb = require('./userDb.js');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  let post = req.body;
  const id = req.params.id;
  post.user_id = id;
  console.log(req.user);

  // if (!post.text) {
  //   res.status(404).json({
  //     message: 'Please provide text for the post',
  //   });
  // } else {
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
  // }
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

router.get('/:id', validateUserId, (req, res) => {
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

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
  userDb
    .remove(req.params.id)
    .then(deletedUser => {
      res.status(200).json(deletedUser);
    })
    .catch(err => {
      res.status(500).json();
    });
});

router.put('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  const name = req.body;

  userDb
    .update(id, name)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error updating the user' });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  userDb.getById(req.params.id).then(user => {
    if (!user) {
      res.status(400).json({ message: 'invalid user id' });
    } else {
      req.user = user;
      next();
    }
  });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
  // if (req.body && req.body.name) {
  //   next();
  // }

  // if (req.body && !req.body.name) {
  //   res.status(400).json({ message: 'missing required name field' });
  // }

  // if (!req.body) {
  //   res.status(400).json({ message: 'missing user data' });
  // }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' });
  }
}

module.exports = router;
