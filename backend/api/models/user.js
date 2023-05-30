const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: { type: String, required: true },
   email: { 
      type: String, 
      required: true, 
      unique: true,
      validate: { 
         validator: validator.isEmail, 
         message: 'value is not email' 
      } 
   },
   password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);