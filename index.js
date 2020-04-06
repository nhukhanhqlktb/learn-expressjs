var express = require('express');
var app = express();
var port = 3000;
var dataUser = [
	{id: 1, name:'Nguyen Nhu'},
	{id: 2, name:'Phan Van'},
	{id: 3, name:'Hoang Tu'},
	{id: 4, name:'Giang Ho'},
	{id: 5, name:'Hoc hanh'}
]

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', (req, res) => {
	res.render('index', {
		name: 'Kaka'
	});
});

app.get('/users', (req, res) => {
	res.render('./users/index',{
		users: dataUser
	});
});

app.get('/users/search', (req, res) => {
	var q = req.query.q;
	var matchedUser = dataUser.filter(function(item){
		return item.name.indexOf(q) !== -1;
	});
	res.render('./users/index',{
		users: matchedUser,
		queri: q
	});
})

app.listen(port, () => {
	console.log('Server is run');
});