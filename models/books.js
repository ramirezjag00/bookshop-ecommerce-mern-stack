const mongoose = require("mongoose");
const {Schema} = mongoose;

const booksSchema = new Schema({
	title: String,
	description: String,
	images: String,
	price: Number
});

mongoose.model('books', booksSchema);
