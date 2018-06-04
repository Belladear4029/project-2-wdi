const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const recipeSchema = new mongoose.Schema({
  title: String,
  url: String,
  ingredients: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [commentSchema]
});

module.exports = mongoose.model('recipe',recipeSchema);
