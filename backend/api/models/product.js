const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   title: { type: String, required: true },
   image: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);