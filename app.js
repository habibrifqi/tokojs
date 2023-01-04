var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
let ejs = require('ejs');
var config = require('./config/database')

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