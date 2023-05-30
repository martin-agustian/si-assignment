const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user.js');

router.get('/', (req, res, next) => {
   const params = {
      name: req.query.name,
      email: req.query.email,
   };

   User
      .find({
         "name": !params.name,
         "email": !params.email,
      })
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