const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Cart = require('../models/cart.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');

router.post('/', async (req, res, next) => {
   try {
      var user = await User.findById(req.body.user);
      if (!user) throw { message: 'user not found' };

      var product = await Product.findById(req.body.product);
      if (!product) throw { message: 'product not found' };
   }
   catch (error) {
      return res.status(500).json({
         code: error.code ? error.code : 500,
         message: error.message,
      });
   }

   if (req.body.quantity <= product.stock) {
      Cart
         .findOneAndUpdate(
            { 
               user: req.body.user,
               product: req.body.product,
            }, 
            {
               $set: {
                  user: req.body.user,
                  product: req.body.product,
                  quantity: req.body.quantity,
               }
            }, 
            { upsert: true, returnOriginal: false } 
         )
         .exec()
         .then(result => {
            res.status(200).json({
               code: 200,
               message: 'success store data',
               result: result,
            });
         })
         .catch(error => {
            res.status(500).json({
               code: error.code,
               message: error.message,
            });
         });
   }
   else {
      res.status(500).json({
         code: 421,
         message: 'quantity must less or equal to product stock',
      });
   }
});

module.exports = router;