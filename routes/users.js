//bcrypt é uma biblioteca de encriptação da passwords
// o User.findOne é uma função de todos os schemas que encontra
//um registo por uma determinada propriedade
//const { name, email, password, password2 } = req.body; fetch dados do body e mete em um objecto
//                req.flash(
//  'success_msg',
//  'You are now registered and can log in'
//); -> esta função esta ligada a uma variavel global criada no app.js
// server para guardar mensagens entre redirects e usada no partials

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Insira todos os campos' });
  }

  if (password != password2) {
    errors.push({ msg: 'Password incorrecta' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'A password tem que ter no minimo 6 caracteres' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'O Email já está registado' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        //hash password
        //criar um salt
        //utilizar o salt na criação do hash da password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Já está registado, pode fazer o log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/initial',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Log out efectuado');
  res.redirect('/users/login');
});

module.exports = router;
