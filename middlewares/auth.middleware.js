const db = require('../db.js');

module.exports.requireAuth = function(req, res, next){
	// let userID = req.cookies.userID;
	// let user = db.get('users').find( { id: userID} ).value();

	// if (!user){
	// 	res.redirect('/auth/login');
	// 	return;
	// }

	if (!req.cookies.userID){
		res.redirect('/auth/login');
		return;
	}

	let user = db.get('users').find( {id: req.cookies.userID} ).value();

	if (!user) {
		res.redirect('/auth/login');
		return;
	}

	next();
};