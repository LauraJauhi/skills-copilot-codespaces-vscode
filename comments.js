// Create web server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Comment schema
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
});

// Comment model
const Comment = mongoose.model('Comment', commentSchema);

// Routes
app.post('/comments', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.status(201).send(comment);
});

app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.status(200).send(comments);
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});