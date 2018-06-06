const Recipe = require('../models/recipe.js');
Recipe.likes = 0;

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
  recipeData['creator'] = res.locals.currentUser.id;
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
      commentData.user = res.locals.currentUser.id;
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

function addLikeRoute(req, res){
  Recipe
    .findById(req.params.id)
    .exec()
    .then( recipe => {
      recipe.likes ? recipe.likes ++ : recipe.likes = 1;
      recipe.likers.push(res.locals.currentUser.username);
      recipe.save();
      return res. redirect(`/recipes/${recipe.id}`);
    });
}

function likersRoute(req, res){
  Recipe
    .find()
    .populate('creator')
    .exec()
    .then( recipes =>{
      res.render('recipes/likers', {recipes});
    });
}

// function searchRoute(req, res) {
//   Recipe
//     .textSearch(input, => {
//       if (err) return handleError(err);
//     })
// }


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
  userprofile: myRecipesRoute,
  addLike: addLikeRoute,
  likers: likersRoute
};
