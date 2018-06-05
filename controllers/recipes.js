const Recipe = require('../models/recipe.js');

function indexRoute(req, res){
  Recipe
    .find()
    .populate('creator')
    .exec()
    .then( recipes =>{
      res.render('recipes/index', {recipes});
    });
}

function showRoute(req, res){
  Recipe
    .findById(req.params.id)
    .populate('creator')
    .populate('comments.user')
    // .ingredients.split(', ')
    .exec()
    .then( recipe =>{
      res.render('recipes/show', {recipe});
    });
}

function newRoute(req, res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  res.render('recipes/new');
}

function createRoute(req, res){
  const recipeData = req.body;
  recipeData['creator'] = res.locals.user.id;
  Recipe
    .create(req.body)
    .then( recipe =>{
      return res.redirect(`/recipes/${recipe.id}`);
    });
}

function editRoute(req, res){
  Recipe
    .findById(req.params.id)
    .exec()
    .then( recipe =>{
      res.render('recipes/edit', {recipe});
    });
}
function updateRoute(req, res){
  Recipe
    .findById(req.params.id)
    .then( recipe =>{
      Object.assign(recipe, req.body);
      recipe.save();
      return res.redirect(`/recipes/${recipe.id}`);
    });
}
function deleteRoute(req, res){
  Recipe
    .findById(req.params.id)
    .then( recipe =>{
      recipe.remove();
      return res.redirect('/recipes');
    });
}
function createCommentRoute(req, res){
  Recipe
    .findById(req.params.id)
    .exec()
    .then( recipe => {
      const commentData = req.body;
      commentData.user = res.locals.user.id;
      recipe.comments.push(commentData);
      recipe.save();
      return res. redirect(`/recipes/${recipe.id}`);
    });
}

function deleteCommentRoute(req, res, next){
  Recipe
    .findById(req.params.id)
    .exec()
    .then( recipe => {
      const comment = recipe.comments.id(req.params.commentId);
      console.log(comment);
      comment.remove();
      return recipe.save();
    })
    .then( recipe => res. redirect(`/recipes/${recipe.id}`))
    .catch(next);
}

function myRecipesRoute(req, res){
  Recipe
    .find()
    .populate('creator')
    .exec()
    .then( recipes =>{
      res.render('recipes/user-profile', {recipes});
    });
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  userprofile: myRecipesRoute
};
