const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: String,

  tags: {
    type: [String],
    default: [],
  },

  language: {
    type: String,
    default: "javascript",
  },

  code: {
    type: String,
    required: true,
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  trashed: {
    type: Boolean,
    default: false,
  },

  public: { 
    type: Boolean,
    default: false
  }, 

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Snippet', SnippetSchema);
