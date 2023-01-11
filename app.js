var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var ejs = require('ejs');
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
// var expressValidator = require('express-validator');
const { buildCheckFunction  } = require('express-validator');

//connect to db
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection errror'));
db.once('open', function(){
    console.log('connection to monggo dbb')
})


// init app
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set public folder
app.use(express.static(path.join(__dirname,'public')));

//parse middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

//express validator middleware
app.use(buildCheckFunction   ({
    errorFormatter : function(param,msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
        while(namespace.lenght){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value : value 
        };
    }
}));

//set express message middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//set routes
var pages = require('./routes/pages');
var adminPages = require('./routes/admin_pages.js');

app.use('/admin/pages',adminPages);
app.use('/',pages);


//start the server
var port = 3000;
app.listen(port, function(){
    console.log('server started on port' + port);
})

