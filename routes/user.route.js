var express = require('express');
var multer  = require('multer');

var userController = require('../controllers/user.controller');
var userValidate = require('../validate/user.validate.js');

var upload = multer({ dest: './public/uploads/' })

var router = express.Router();

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.create);

router.get('/:id', userController.get);

router.post('/create', 
	upload.single('avatar'), //avatar the same with name of input in html
	userValidate.postCreate, userController.postCreate
);

module.exports = router;