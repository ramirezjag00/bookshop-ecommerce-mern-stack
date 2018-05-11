const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = app => {
	//SAVE SESSION CART API
	app.post('/api/cart', (req,res) => {
		const cart = req.body;
		req.session.cart = cart;
		req.session.save((err) => {
			if(err) {
				throw err;
			}
			res.json(req.session.cart);
		})
	});

	//GET SESSION CART API
	app.get('/api/cart', (req, res) => {
		if(typeof req.session.cart !== 'undefined'){
			res.json(req.session.cart);
		}
	});
};