const db = require('../db.js');
const shortid = require('shortid');

module.exports = function(req, res, next) {
	let sessionId = shortid.generate();

	if (!req.signedCookies.sessionId) {
		res.cookie('sessionId', sessionId, {
		signed: true});

		db.get('sessions').push({sessionId: sessionId}).write();
	}

	next();
};