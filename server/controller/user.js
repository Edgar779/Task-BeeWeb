const users = require('../models/User');
const jwt = require('jsonwebtoken');
// const axios = require('axios');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

exports.signup = (req, res) => {
   
    const user = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
      };
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        user.password = hash;
        User.create(user)
        .then(data => {
            res.status(200).send({
                success: true,
                message: ""
              });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
    });
    
  };

  exports.signin = (req, res) => {
   res.send('login success');
    
  };


exports.register = function (req, res) {

    const user = new users(req.body);

    const access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, config.jwt_secretKey).toString();

    user.tokens.push({ access, token });

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        user.password = hash;
        user.save().then(users => {
            res.header('x-auth', token).render('home.hbs', {
                name: users.name,
                surname: users.surname,
                email: users.email
            });
        }).catch(err => {
            res.json(err);
        });
    });

}
