const db = require('../db.js');

module.exports.index = function(req, res) {
	let page = parseInt(req.query.page) || 1;
	let perPage = 8;
	let limitPage = Math.ceil(db.get('products').value().length/perPage);
	let pageLink = 'products';

	let start = (page - 1) * perPage;
	let end = page * perPage;

	let drop = (page - 1) * perPage;

	res.render('products/index', {
		// products: db.get('products').value().slice(start, end)
		products: db.get('products').drop(drop).take(perPage).value(),
		limitPage,
		page,
		pageLink
	});
};