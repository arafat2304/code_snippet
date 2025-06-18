const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
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
