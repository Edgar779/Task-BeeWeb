const user = require('./user');
const subdomain = require('./subdomain');
const workspace = require('./workspace');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
// const passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
router.use(passport.initialize());
router.use(passport.session());

router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(id, done) {
    done(null, id);
  });
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'}, 
    function(usernameField, passwordField, done) {
        console.log(usernameField);
        console.log(passwordField);
        User.findAll({ where: { email: usernameField } })
        .then(async data => {

            if (!data) {
                return done(null, false);
              }
              // i can not understund this moment anyway :)
              const stringify = JSON.stringify(data);
              const dataParse = JSON.parse(stringify);
              //

              const isValid = await bcrypt.compare(passwordField, dataParse[0].password);

              if (!isValid) { return done(null, false); }   
              return done(null, dataParse);
        })
        .catch(err => {
          console.log(err);
            return done(null,false); 

        });
    }
));



router.use(cookieParser());
router.use(express.static(__dirname + '../public'));



router.post('/sign-up', user.signup);

router.post('/sign-in', 
  passport.authenticate('local', { failureRedirect: '/sign-in' }),
  function(req, res) {
    // let token = jwt.sign({ id: req.user[0].id },
    //   'mainConfig.secret',
    //   {
    //     expiresIn: '3h'
    //   }
    // );

// decided not to go deep with the token

      res.status(200).send({
        success: true,
        message: "",
        id: req.user[0].id
      });
  });


  router.get('/sign-in', (req,res)=>{
    res.status(200).send({
        success: false,
        message: "User or Password is incorrect"
      });
  });

 router.post('/createSubDomain', subdomain.createSubDomain);
 router.post('/availableDomain', subdomain.availableSubDomain);
 router.post('/createWorkspace', workspace.createWorkspace);
 router.post('/deleteWorkspace', workspace.deleteWorkspace);
 router.post('/editWorkspace', workspace.editWorkspace);
 router.post('/getWorkspaces', workspace.getWorkspaces);

// router.get('/favicon.ico', (req, res) => res.status(204));


module.exports = router;
