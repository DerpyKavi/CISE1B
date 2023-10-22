// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

// Create an Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes (you can adjust this as needed)
app.use(bodyParser.json());

app.use(express.json({ extended: false }));

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://newuser:5Ivj1Y97H5RjMG53@mernstack.aanyxwa.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
mongoose
//connect to database
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //display successful connection message
  .then(() => {
    console.log('Connected to MongoDB');
  //display error connection message if failed
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Define a Mongoose schema and model for the article data
const bookSchema = new mongoose.Schema({
  //define variables
  title: String,
  authors: String,
  journal_name: String,
  published_date: Date,
  volume: String,
  number: String,
  pages: String,
  DOI: String,
  Rating: Number,
});

//define the article model
const Book = mongoose.model('Book', bookSchema);

// Define a route for fetching article from the route
app.get('/api/books', async (req, res) => {
  try {
    //find the article from database
    const books = await Book.find();
    res.json(books);
    //display error if unable to retrieve article 
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }
});

// Define a route for posting article
app.post('/api/books', async (req, res) => {
  //try to post the article the database
  try {
    //create a new article model to post to database
    Book.create(req.body)
    //display message if article is added successfully
    .then(book => res.json({ msg: 'Article added successfully' }))
    //display error if unable to post article
    .catch(err => res.status(400).json({ error: 'Unable to add this article' }));

  //if the post fails, display an error
  } catch (error) {
    console.error('Error posting article:', error);
    res.status(500).json({ error: 'An error occurred while posting article' });
  } 
});

// Start the server on port 8082
const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});