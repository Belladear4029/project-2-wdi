const express = require('express');
const router = express.Router();

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const recipes = require('../controllers/recipes');

router.get('/', (req, res) => res.render('home', {
  isHomepage: true
}));

function secureRoute(req, res, next) {
  if (res.locals.isloggedIn) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect('/'); // or render a form, etc.
  }
}

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get( sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/recipes')
  .get(recipes.index)
  .post(recipes.create);
router.route('/recipes/myrecipes')
  .get(recipes.userprofile);

router.route('/users/:id')
  .get(users.show);

router.route('/recipes/new')
  .get(recipes.new);
router.route('/recipes/:id')
  .get(recipes.show)
  .put(recipes.update)
  .delete(recipes.delete);
router.route('/recipes/:id/edit')
  .get(recipes.edit);

router.route('/recipes/:id/comment')
  .post(recipes.createComment);
router.route('/recipes/:id/comment/:commentId')
  .delete(recipes.deleteComment);

router.route('/recipes/:id/like')
  .put(recipes.addLike);

router.route('/recipes/:id/likers')
  .get(recipes.likers);

router.route('/recipes/search')
  .post(recipes.search);


module.exports = router;
