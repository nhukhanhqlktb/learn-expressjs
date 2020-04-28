var express = require('express');

var userController = require('../controllers/user.controller');
var userValidate = require('../validate/user.validate.js');

var router = express.Router();

router.get('/', userController.index);

router.get('/cookie', function(req, res, next){
	res.cookie('user-id', 12345);
	res.send('hello');
});

router.get('/search', userController.search);

router.get('/create', userController.create);

router.get('/:id', userController.get);

router.post('/create', userValidate.postCreate, userController.postCreate);

module.exports = router;