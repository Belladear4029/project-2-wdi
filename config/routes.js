const express = require('express');
const router = express.Router();

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const pictures = require('../controllers/pictures');

router.get('/', (req, res) => res.render('home', {
  isHomepage: true
}));

router.route('/')

router.route('/register')

router.route('/login')

router.route('/logout')

router.route('/')

router.route('/')

router.route('/')

module.exports = router;
