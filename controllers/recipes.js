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
    .update(req.body)
    .then( recipe =>{
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

}

module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute
};
