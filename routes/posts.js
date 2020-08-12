const express = require('express');
const router = express.Router();
const Posts = require('../data/db');

// GET all posts
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      });
    });
});

// GET single post by ID
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      });
    });
});

// Create Post
router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

// Update Post
router.put('/:id', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  Posts.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'The post information could not be modified.'
      });
    });
});

// Delete Post
router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: 'The user has been deleted.'
        });
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'The post could not be removed'
      });
    });
});

// GET comments for specified post
router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(comments => {
      if (comments.length) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          message: 'No comments found.'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'The comments information could not be retrieved.'
      });
    });
});

// Create a comment for specified post
router.post('/:id/comments', (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: 'Please provide text for the comment.'
    });
  }
  Posts.insertComment({
    text: req.body.text,
    post_id: req.body.post_id
  })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error while saving the comment to the database.'
      });
    });
});

module.exports = router;
