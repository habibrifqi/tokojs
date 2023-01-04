var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('admin area');
});
router.get('/test', function(req, res){
    res.send('test admin');
});
//exports
module.exports = router;

