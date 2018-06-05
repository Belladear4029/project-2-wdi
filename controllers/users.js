const User = require('../models/user.js');

function showRoute(req, res){
  User
    .findById(req.params.id)
    .populate('recipes')
    .exec()
    .then( user =>{
      res.render('users/show', {user});
    });
}

module.exports = {
  show: showRoute
};
