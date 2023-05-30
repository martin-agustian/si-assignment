const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
   quantity: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);