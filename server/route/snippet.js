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

// DELETE (soft delete to trash)
router.put("/trash/:id", verifyToken, async (req, res) => {
  try {
    await Snippet.findOneAndUpdate(
      { _id: req.params.id },
      { trashed: true }
    );
    res.json({ msg: "Moved to trash" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to trash snippet" });
  }
});

// RESTORE from trash
router.put("/restore/:id", verifyToken, async (req, res) => {
  try {
    await Snippet.findOneAndUpdate(
      { _id: req.params.id},
      { trashed: false }
    );
    res.json({ msg: "Restored successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to restore snippet" });
  }
});

// DELETE permanently
router.delete("/permanent/:id", verifyToken, async (req, res) => {
  try {
    await Snippet.findOneAndDelete({ _id: req.params.id});
    res.json({ msg: "Deleted permanently" });
  } catch (err) {
    res.status(500).json({ msg: "Permanent delete failed" });
  }
});


// TOGGLE favorite
router.put("/favorite/:id", verifyToken, async (req, res) => {
  
  try {
    const { favorite } = req.body;
    await Snippet.findOneAndUpdate({ _id: req.params.id }, { favorite });
    res.json({ msg: "Favorite updated" });
  } catch (err) {
    res.status(500).json({ msg: "Favorite update failed" });
  }
});

// Toggle public/private
router.put("/toggle-public/:id", verifyToken, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user.id });
    if (!snippet) return res.status(404).json({ msg: "Not found" });
    snippet.public = !snippet.public;
    await snippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ msg: "Toggle public failed" });
  }
});

// Get public snippet without auth
router.get("/public/:id", async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, public: true });
    if (!snippet) return res.status(404).json({ msg: "Not found" });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching snippet" });
  }
});

// Update a snippet (with versioning)
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, tags, language, code } = req.body;

  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user.id });
    if (!snippet) return res.status(404).json({ msg: "Snippet not found" });

    // Save current version before updating
    snippet.versions.push({
      title: snippet.title,
      description: snippet.description,
      tags: snippet.tags,
      language: snippet.language,
      code: snippet.code,
      updatedAt: new Date()
    });

    // Update to new version
    snippet.title = title;
    snippet.description = description;
    snippet.tags = tags;
    snippet.language = language;
    snippet.code = code;

    await snippet.save();
    res.status(200).json({ msg: "Snippet updated with version history", snippet });
  } catch (err) {
    console.error("Error updating snippet:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get version history of a snippet
router.get("/:id/versions", verifyToken, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user.id });
    if (!snippet) return res.status(404).json({ msg: "Snippet not found" });

    res.status(200).json(snippet.versions || []);
  } catch (err) {
    console.error("Error fetching versions:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Revert snippet to a previous version
router.put("/:id/revert/:versionId", verifyToken, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user.id });
    if (!snippet) return res.status(404).json({ msg: "Snippet not found" });

    const version = snippet.versions.id(req.params.versionId);
    if (!version) return res.status(404).json({ msg: "Version not found" });

    // Push current version into history first
    snippet.versions.push({
      title: snippet.title,
      description: snippet.description,
      tags: snippet.tags,
      language: snippet.language,
      code: snippet.code,
      updatedAt: new Date()
    });

    // Revert to selected version
    snippet.title = version.title;
    snippet.description = version.description;
    snippet.tags = version.tags;
    snippet.language = version.language;
    snippet.code = version.code;

    await snippet.save();
    res.status(200).json({ msg: "Reverted to previous version", snippet });
  } catch (err) {
    console.error("Error reverting version:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get snippet analytics for logged-in user
router.get("/stats/overview", verifyToken, async (req, res) => {
  try {
    const allSnippets = await Snippet.find({ user: req.user.id, trashed: false });

    const total = allSnippets.length;
    const favorites = allSnippets.filter((s) => s.favorite).length;

    // Count per language
    const languageCounts = {};
    allSnippets.forEach((s) => {
      languageCounts[s.language] = (languageCounts[s.language] || 0) + 1;
    });

    // Top 5 recent
    const recent = [...allSnippets]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.status(200).json({
      total,
      favorites,
      languages: languageCounts,
      recent,
    });
  } catch (err) {
    console.error("Failed to get stats:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
