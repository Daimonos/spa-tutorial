var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/partials/:name', function(req, res, next){
	var name = req.param('name');
	res.render('partials/'+name);
});
module.exports = router;
