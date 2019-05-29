const express = require('express');
const postDb = require('postDb.js');
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

router.get('/:id', (req, res) => {
  postDb
    .getById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'unable to retrieve posts' });
    });
});

router.delete('/:id', (req, res) => {
  postDb
    .remove(req.params.id)
    .get(deletedPost => {
      res.status(200).json(deletedPost);
    })
    .catch(err => {
      res.status(500).json({ error: 'unable to to delete ost' });
    });
});

router.put('/:id', (req, res) => {
  postDb
    .update(req.params.id)
    .then(updatedPost => {
      res.status(200).json(updatedPost);
    })
    .catch(error => {
      res.status(500).json({ error: 'A post with that id could not be found' });
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
