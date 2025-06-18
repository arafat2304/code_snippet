const express = require('express');
const router = express.Router();
const Snippet = require('../model/snippet');
const verifyToken = require("../meadlewear/userAuth.js");

// Get all snippets
router.get('/all',verifyToken, async (req, res) => {
  const snippets = await Snippet.find({user:req.user.id});
  res.json(snippets);
});

// Create a new snippet
router.post('/add', verifyToken,async (req, res) => {

  const {title,description,tags,language,code,} = req.body;
  
  if(!title || !code){
    res.status(201).json('tile and code is required');
  }

  const snippet = new Snippet({
    user:req.user.id,
    title,
    description,
    tags,
    language,
    code,
  });
  await snippet.save();
  res.status(201).json(snippet);
});

// Delete a snippet
router.delete('/:id', verifyToken,async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
