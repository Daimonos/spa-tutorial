var express = require('express');
var router = express.Router();

var inventory = require('../models/inventory');

router.get('/', function(req, res, next){
	res.json(inventory.inventory);
});

module.exports = router;