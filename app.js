'use strict';

//dependencies
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    http = require('http'),
    path = require('path'),
    multer  =   require('multer'),
    passport = require('passport'),
    helmet = require('helmet'),
    expressValidator = require('express-validator');

//create express app
var app = express();

//setup the web server
app.server = http.createServer(app);


//settings
app.disable('x-powered-by');
//app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware
app.use(require('morgan')('dev'));
app.use(require('compression')());
app.use(require('serve-static')(path.join(__dirname, '/public')));
app.use(require('method-override')());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser(config.cryptoKey));
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: config.cryptoKey
// }));
// Connect Flash

//response locals
app.use(function(req, res, next) {
    // res.cookie('_csrfToken', req.csrfToken());
    res.locals.user = req.user || null;
    res.locals.messages = require('express-messages')(req, res);
    next();
});

helmet(app);


//global locals
// app.locals.projectName = app.config.projectName;
app.locals.copyrightYear = new Date().getFullYear();
// app.locals.copyrightName = app.config.companyName;

//setup routes
require('./routes/routes')(app, passport);

//custom (friendly) error handler
app.use(require('./views/http/index').http500);

//listen up
app.server.listen(8080, function(){
  //and... we're live
  console.log('Server is running on port ' + 8080);
});

// app.server.on('listening',function(){
//   console.log('ok, server is running');
// });

