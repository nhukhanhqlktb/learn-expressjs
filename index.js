require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var csurf = require('csurf');

// ========= Mongoosejs - create connection =========
mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;
var app = express();

// ===== Mongoosejs - check connection =====
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected database');
});

// ========= Mongoosejs =========

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET)); //each id, it generates a private hash is different
app.use(sessionMiddleware);
app.use(csurf( {cookie: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index', {
		name: 'Everybody'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, () => {
	console.log('Server is run on port ' + port);
});