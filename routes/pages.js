var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index',{
        title: 'Home'
    });
});

router.get('/test', function(req, res){
    res.send('test area');
});

//exports
module.exports = router;

