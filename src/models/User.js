// User.model.js
const mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

// function setPassword(value) {
//   return bcrypt.hashSync(value, 10);
// }

const userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   // slug: {
   //     type: String,
   //     required: true,
   //     unique : true
   // },
   email: {
       type: String,
       required: true,
       unique : true,
       lowercase: true,
   },
   password: {
       type: String,
       required: true,
       select: false,
       // set: setPassword
   },
   role: {
       type: String,
       required: true,
       default: 'funcionário'
   },
   createdAt:{
     type: Date,
     default: Date.now,
   },
});

// userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;