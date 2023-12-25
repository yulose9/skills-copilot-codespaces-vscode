// Create web server

// Import express
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// Get all comment
router.get('/', commentController.getComment);

// Get comment by id
router.get('/:id', commentController.getCommentById);

// Create new comment
router.post('/', commentController.createComment);

// Update comment by id
router.put('/:id', commentController.updateCommentById);

// Delete comment by id
router.delete('/:id', commentController.deleteCommentById);

// Export router
module.exports = router;