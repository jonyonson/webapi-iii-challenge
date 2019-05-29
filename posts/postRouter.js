const express = require('express');
const postDb = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'unable to retrieve posts' });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  postDb
    .getById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'unable to retrieve posts' });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  postDb
    .remove(req.params.id)
    .then(deletedPost => {
      res.status(200).json(deletedPost);
    })
    .catch(err => {
      res.status(500).json({ error: 'unable to to delete post' });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  const text = req.body;
  postDb
    .update(req.params.id, text)
    .then(updatedPost => {
      res.status(200).json(updatedPost);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating post' });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  postDb.getById(req.params.id).then(post => {
    if (!post) {
      res.status(400).json({ message: 'invalid post id' });
    } else {
      next();
    }
  });
}

module.exports = router;
