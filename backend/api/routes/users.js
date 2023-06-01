const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res, next) => {
   const query = req.query;

   const params = {};

   if (query.name) {
      params.name = query.name;
   }

   if (query.email) {
      params.email = query.email;
   }

   User
      .find(params)
      .exec()
      .then(result => {
         res.status(200).json({
            message: 'success get data',
            result: result,
         });
      })
      .catch(error => {
         res.status(500).json({
            code: error.code ? error.code : 500,
            message: error,
         });
      });
});

router.delete('/:id', async (req, res, next) => {
   User
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
            code: error.code ? error.code : 500,
            message: error.message,
         });
      });
});

module.exports = router;