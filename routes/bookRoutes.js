const mongoose = require('mongoose');
const Books = mongoose.model('books');

module.exports = app => {

	//GET BOOKS
	app.get('/api/books', (req, res) => {
		Books.find((err,books) => {
			if (err) {
				throw err;
			}
			res.json(books);
		})
	});

	//POST BOOKS
	app.post('/api/books', (req,res) => {
		const book = req.body;

		Books.create(book, (err, books) =>{
			if (err) {
				throw err;
			}
			res.json(books);
		})
	});

	//UPDATE BOOKS
	app.put('/api/books/:_id', (req,res) => {
		const book = req.body;
		const query = req.params._id;

		//if the field doesn't exist $set will set a new field

		const update = {
			'$set': {
				title: book.title,
				description: book.description,
				image: book.image,
				price:book.price
			}
		};

		//When true returns the updated document
		const options = {new: true};

		Books.findOneAndUpdate(query, update, options, (err,books) => {
			if (err) {
				throw err;
			}
			res.json;
		})
	});

	//DELETE BOOKS
	app.delete('/api/books/:_id', (req,res) => {
		const query = {_id: req.params._id};
		Books.remove(query, (err, books) => {
			if (err) {
				console.log("# API DELETE BOOKS: ", err);
			}
			res.json(books);
		})
	});
};