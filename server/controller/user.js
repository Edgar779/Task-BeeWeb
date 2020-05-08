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
// router.use(passport.initialize());
// router.use(passport.session());



// passport.serializeUser(function (profile, cb) {
//     cb(null, profile);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });



// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
  
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err,user){
//       err 
//         ? done(err)
//         : done(null,user);
//     });
//   });





//   passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   }, function(username, password,done){
//     User.findOne({ username : username},function(err,user){
//       return err 
//         ? done(err)
//         : user
//           ? password === user.password
//             ? done(null, user)
//             : done(null, false, { message: 'Incorrect password.' })
//           : done(null, false, { message: 'Incorrect username.' });
//     });
//   }));


exports.signup = (req, res) => {
  // User.destroy({
  //   where: {},
  //   truncate: true
  // }).then(ress=>{
  //   console.log(ress);
  // }).catch(err=>{
  //   console.log(err);
  // })


//    User.findAll({ where: { fullName: req.body.fullName } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });









    // if (!req.body.fullName || !req.body.email || !req.body.password) {
    //   res.status(200).send({
    //     success: false,
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }

   
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


    //    User.findAll({ where: { } })
    // .then(data => {
    //   res.send(data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while retrieving tutorials."
    //   });
    // });

    
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
// get User By Token
// exports.getUserbyToken = function (req, res) {
//     const token = req.header('x-auth');
//     var decoded;
//     try {
//         decoded = jwt.verify(token, config.jwt_secretKey);
//     }
//     catch (e) {
//         return res.status(401).send(e);
//     }
//     users.findOne({
//         '_id': decoded._id,
//         'tokens.token': token,
//         'tokens.access': 'auth'
//     }).then(user => {
//         if (!user) {
//             res.json('user is not defined');
//         }
//         res.json(user);
//     }).catch(err => {
//         res.json(err);
//     })

// }