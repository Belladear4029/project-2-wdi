const mongoose = require('mongoose');
const textSearch = require('mongoose-text-search');

const commentSchema = new mongoose.Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const recipeSchema = new mongoose.Schema({
  title: {type: String, index: true},
  url: String,
  ingredients: {type: String, index: true},
  method: String,
  likes: Number,
  likers: [],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [commentSchema]
});

recipeSchema.plugin(textSearch);

module.exports = mongoose.model('recipe', recipeSchema);
