const helpers = require('./Helpers')
const User = require('../models/user.model'); 

function isFuncionario(user) {
  return user.role == 'funcionário';
}

function isAdmin(user) {
  return user.role == 'admin';
}

function isOwner(user) {
  return user.role == 'owner';
}

function createService(req, res, user) {
  if((user.role != 'funcionário' && (req.user == undefined || isFuncionario(req.user))) // user
    || (user.role == 'owner' && (req.user == undefined || !(isAdmin(req.user)) ) )
    || (user.role == 'admin' && (req.user == undefined || !(isAdmin(req.user)) ) )
  ) {
    helpers.fillResponse(res, 400, false, 'Unauthorized');
    return;
  }

  User.create(user, function(err, result) {
    if(err){
      helpers.fillResponse(res, 400, false, err.message);
      return;
    }
    helpers.fillResponse(res, 201, true, result, {message: "Post created successfully"});
  });
}

module.exports = {
  isFuncionario,
  isAdmin,
  isOwner,
  isCoach,
  createService
}