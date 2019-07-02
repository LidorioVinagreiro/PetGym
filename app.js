const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose'); //ORM para mongodb
const passport = require('passport');
//Estas duas bibliotecas servem para mandar mensagens quando fazemos redirect
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
//esta linha de código vai configurar o middleware do passport
//e é configurada passando o objecto passport que é configurado no module.export = function (passport) da pasta config -> passport.js
require('./config/passport')(passport);

// DB Config
const dbMongoConnection = require('./config/keys').mongoURI;

// Connect to MongoDB. ver o que é o usenewurlparser, 
//o connect retorna uma promise (ver o que é)
//ver o then tb
 mongoose
  .connect(
    dbMongoConnection,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
//descodificação do body
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//const PORT = process.env.PORT || 5000;
const PORT = 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
