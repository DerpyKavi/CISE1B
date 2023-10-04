//This is a model for book to store into the database. It contains the details of the book 
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  journal_name: {
    type: String,
    required: true
  },
  published_date: {
    type: Date,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  pages: {
    type: String,
    required: true
  },
  DOI: {
    type: String,
    required: true
  },
});

module.exports = Book = mongoose.model('book', BookSchema);