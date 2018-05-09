const express = require('express');
const app = express();
const path = require('path');

//MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
app.use(express.static('public'))

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, () => {
	console.log("APP HAS BEEN STARTED AT PORT 3000")
})