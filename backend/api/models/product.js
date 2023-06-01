const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   slug: { type: String, required: true, unique: true },
   title: { type: String, required: true },
   image: { 
      type: String, 
      required: true,
      validate: { 
         validator: validator.isURL, 
         message: 'value is not url' 
      }
   },
   description: { type: String, required: true },
   price: { type: Number, required: true },
   stock: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);