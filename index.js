/**
 * Created by Luc on 22/06/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');
var path = require('path');
var session = require('express-session');

var app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'hackerFiles',
    saveUninitialized: true,
    resave: true,
    ttl: 2*24*60*60}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

require('./app/config/passport')(passport);

app.use(express.static(path.join(__dirname, '/public')));

var public_router = express.Router();
require('./app/routes/public')(public_router);
app.use('/public', public_router);

var auth_router = express.Router();
require('./app/routes/auth')(auth_router, passport);
app.use('/auth', auth_router);

var secure_router = express.Router();
require('./app/routes/secure')(secure_router);
app.use('/', secure_router);

app.listen(1337, function(){
   console.log('Server is listening on port', 1337);
});