const db = require('../db.js');
const shortid = require('shortid');

module.exports = function(req, res, next) {
	let sessionId = shortid.generate();
	let cart;
	let countCart;

	if (!req.signedCookies.sessionId) {
		res.cookie('sessionId', sessionId, {
		signed: true});

		db.get('sessions').push({sessionId: sessionId}).write();
	}

	cart = db.get('sessions')
		.find( {sessionId: req.signedCookies.sessionId} )
		.get('cart').value();
	if (cart) {
		countCart = Object.values(cart).reduce((result, cur) => {
			return result + cur;
		});
		res.locals.countCart = countCart;
	}

	next();
};