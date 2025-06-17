const express = require('express');
const router = express.Router();
const Snippet = require('../model/snippet');

// Get all snippets
router.get('/', async (req, res) => {
  const snippets = await Snippet.find().sort({ createdAt: -1 });
  res.json(snippets);
});

// Create a new snippet
router.post('/', async (req, res) => {
  const snippet = new Snippet(req.body);
  await snippet.save();
  res.status(201).json(snippet);
});

// Delete a snippet
router.delete('/:id', async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
