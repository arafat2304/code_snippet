const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  language: String,
  code: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Snippet', SnippetSchema);
