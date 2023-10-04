// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes (you can adjust this as needed)
app.use(bodyParser.json());

app.use(express.json({ extended: false }));

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://newuser:5Ivj1Y97H5RjMG53@mernstack.aanyxwa.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
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

// Define a Mongoose schema and model for your data
const bookSchema = new mongoose.Schema({
  title: String,
  isbn: String,
  author: String,
  description: String,
  published_date: Date,
  publisher: String,
  updated_date: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

// Define a route for fetching books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }
});

// Start the server
const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});