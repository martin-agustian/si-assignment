const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
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
            message: error
         });
      });
});

module.exports = router;