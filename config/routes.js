const express = require('express');
const router = express.Router();

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const recipes = require('../controllers/recipes');

router.get('/', (req, res) => res.render('home', {
  isHomepage: true
}));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
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

module.exports = router;
