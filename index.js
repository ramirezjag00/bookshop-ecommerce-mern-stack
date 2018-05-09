const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
// const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys')
;
//make sure to use lowercase for model files
//no need to require recipient model since it is already required in survey model
require('./models/books');
// require('./models/survey');
//since we are not passing any info, we just have to require it
// require("./services/passport");

//mongoose.Promise = global.Promise;
//from mlab.com, the standard MongoDB URI that we created
mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());

app.use(
	cookieSession({
		//how long can a cookie exist on the browser before it is automatically expires
		//30 days in ms
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]
	})
);

// app.use(passport.initialize());
// app.use(passport.session());

//require the ROUTES function/s and immediately calls that function
//this is a valid js syntax
require("./routes/bookRoutes")(app);
// require("./routes/billingRoutes")(app);
// require("./routes/surveyRoutes")(app);

//route handling for production only. there are some routes that can be handled by express server, some can be answered by the css/js files from the build and some routes that can only be resolved by index.html
if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assets
	//like our main.js file, main.css file!
	app.use(express.static('client/build'));

	//Express will serve up the index.html file
	//if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, process.env.IP, () => {
	console.log("BOOKSHOP SERVER STARTED");
});