const db = require('../db.js');
const shortid = require('shortid');

module.exports.index = function(req, res) {
	res.render('users/index',{
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res) {
	let q = req.query.q;
	let users = db.get('users').value();
	var matchedUser = users.filter(function(use){
		return use.name.indexOf(q) !== -1;
	});
	res.render('users/index',{
		users: matchedUser,
		queri: q
	});
};

module.exports.create = function(req, res) {
	res.render('users/create');
};

module.exports.get = function(req, res){
	let idUser = req.params.id;
	let user = db.get('users').find({id: idUser}).value();
	res.render('users/view', {user: user});
};

module.exports.postCreate = function(req, res) {
	let data = { ...req.body };  //deep clone

	data.id = shortid.generate();
	data.avatar = req.file.path.slice(7);
	
	db.get('users')
	  .push(data)
	  .write();
	res.redirect('/users');
};
