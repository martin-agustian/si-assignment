const express = require('express');
const router = express.Router();

const Cart = require('../models/cart.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');

router.get('/', async (req, res, next) => {
   const query = req.query;

   const params = {};

   if (query.user) {
      params.user = query.user;
   }

   if (query.product) {
      params.product = query.product;
   }

   Cart
      .find(params)
      .select('product user quantity _id')
      .populate('product user')
      .exec()
      .then(async (result) => {
         const count = await Cart.find(params).countDocuments().exec();

         res.status(200).json({
            code: 200,
            message: 'success get data',
            result: {
               count: count,
               data: result,
            },
         });
      })
      .catch(error => {
         res.status(500).json({
            code: error.code,
            message: error.message,
         });
      });
});

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

router.delete('/:id', async (req, res, next) => {
   Cart
      .findOneAndRemove({
         _id: req.params.id,
      })
      .exec()
      .then(result => {
         res.status(200).json({
            code: 200,
            message: 'success delete data',
            result: result,
         });
      })
      .catch(error => {
         res.status(500).json({
            code: error.code,
            message: error.message,
         });
      });
});

module.exports = router;