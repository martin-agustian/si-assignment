const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user.js');

const Validator = require('validatorjs');

router.post('/login', async (req, res, next) => {
   let params = {
      email: req.body.email,
      password: req.body.password,
   };

   let rules = {
      email: 'required|email',
      password: 'required',
   };

   let validation = new Validator(params, rules);

   if (validation.passes()) {
      let isEmail = await User.findOne({ 
         "email": { $eq: params.email } 
      });

      if (!isEmail) {
         return res.status(404).json({
            code: 404,
            message: "email not found"
         });
      }

      User
         .findOne({
            "email": { $eq: params.email },
            "password": { $eq: params.password },
         })
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
               res.status(500).json({
                  code: 401,
                  message: 'email or password incorrect'
               });
            }
         })
         .catch(error => {
            res.status(500).json({
               code: error.code ? error.code : 500,
               message: error.message
            });
         });
   }
   else {
      let errors = [];

      Object.values(validation.errors.errors).forEach((error) => {
         console.log(errors.push(error[0]));   
      });

      res.status(500).json({
         code: 500,
         message: errors,
      });
   }
});

router.post('/register', (req, res, next) => {
   const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
   });

   user
      .save()
      .then(result => {
         res.status(200).json({
            code: 200,
            message: 'success store data',
            result: result,
         });
      })
      .catch(error => {
         if (error.code == 11000) {
            error.code = 423;
            error.message = 'email already exists';
         }

         res.status(500).json({
            code: error.code ? error.code : 500,
            message: error.message
         });
      });
});

module.exports = router;