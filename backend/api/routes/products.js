const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/Product.js');

router.get('/', (req, res, next) => {
   const params = {
      sort: req.query.sort,
   };

   let sort = {};

   if (params.sort == 'price_asc') {
      sort = { 'price': 1 };
   }
   else if (params.sort == 'price_desc') {
      sort = { 'price': -1 };
   }
   else if (params.sort == 'title_asc') {
      sort = { 'title': 1 };
   }
   else if (params.sort == 'title_desc') {
      sort = { 'title': -1 };
   }

   Product
      .find()
      .sort(sort)
      .exec()
      .then(result => {
         res.status(200).json({
            code: 200,
            message: 'success get data',
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

router.get('/:slug', (req, res, next) => {
   Product
      .findOne({ 'slug' : req.params.slug })
      .exec()
      .then(result => {
         if (result) {
            res.status(200).json({
               code: 200,
               message: 'success get data',
               result: result,
            });
         }
         else {
            res.status(404).json({
               code: 404,
               message: 'data not found',
            });
         }
      })
      .catch(error => {
         res.status(500).json({
            code: error.code,
            message: error.message,
         });
      });
});

router.post('/', (req, res, next) => {
   const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      slug: req.body.slug,
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
   });

   product
      .save()
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
});

module.exports = router;