// Corrected app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Book = require('./models/Book'); // Adjust the path according to your project structure

const app = express();
module.exports = app;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Address of your client-side app
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.use(bodyParser.json());

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://newuser:5Ivj1Y97H5RjMG53@mernstack.aanyxwa.mongodb.net/?retryWrites=true&w=majority'; 
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.get('/api/books', async (req, res) => { // Removed the full URL
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }
});

app.post('/api/books', async (req, res) => { // Removed the full URL
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'An error occurred while adding the book' });
  }
});

// Start the server
const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
