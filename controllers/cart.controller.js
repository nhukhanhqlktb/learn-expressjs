const db = require('../db.js');

module.exports.addToCart = function(req, res) {
	let sessionId = req.signedCookies.sessionId;
	let productId = req.params.productId;
	let pageNumber = req.params.page;

	if (!sessionId) {
		res.redirect(`/products?page=${pageNumber}`); //redirect to page add product
		return;
	}

	let count = db.get('sessions')
		.find( {sessionId: sessionId} )
		.get('cart.' + productId, 0).value();

	db.get('sessions')
		.find( {sessionId: sessionId} )
		.set(`cart.${productId}`, count + 1)
		.write();

	res.redirect(`/products?page=${pageNumber}`);
};