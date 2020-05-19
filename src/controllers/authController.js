const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}){
  return jwt.sign({ params }, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if(await User.findOne({ email }))
      return res.status(400).send({ error: 'Usuário já existe'})

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' });
  }

});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if(!user)
    return res.status(400).send({ error: 'Usuário não encontrado' })

  if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Senha inválida!'})

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = app => app.use('/auth', router);



// const jwt = require("jsonwebtoken");
// const userService = require('./UserService')

// function authenticateJWT(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.APP_KEY, (err, result) => {
//       if (err) {
//         res.status(403).send({
//           success: false,
//           error: "Unauthenticated"
//         });
//         return;
//       }

//       req.user = result.user;
//       next();
//     });
//   } else {
//     res.status(401).send({
//       success: false,
//       error: "Unauthenticated"
//     });
//   }
// }

// function authenticateAdmin(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.APP_KEY, (err, result) => {
//       if (err || !userService.isAdmin(result.user)) {
//         res.status(403).send({
//           success: false,
//           error: "Unauthenticated"
//         });
//         return;
//       }

//       req.user = result.user;
//       next();
//     });
//   } else {
//     res.status(401).send({
//       success: false,
//       error: "Unauthenticated"
//     });
//   }
// }

// function authenticateOwner(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.APP_KEY, (err, result) => {
//       if (err || !userService.isOwner(result.user)) {
//         res.status(403).send({
//           success: false,
//           error: "Unauthenticated"
//         });
//         return;
//       }

//       req.user = result.user;
//       next();
//     });
//   } else {
//     res.status(401).send({
//       success: false,
//       error: "Unauthenticated"
//     });
//   }
// }

// module.exports = {
//   authenticateJWT,
//   authenticateAdmin,
//   authenticateOwner
// }