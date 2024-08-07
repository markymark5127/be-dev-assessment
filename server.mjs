// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/urlShortener', {
  // Removed deprecated options
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define the URL schema for MongoDB
const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true }, // Original long URL
  short_url: { type: String, required: true, unique: true }, // Generated short URL
  created_at: { type: Date, default: Date.now }, // Timestamp of creation
  click_count: { type: Number, default: 0 }, // Number of clicks
});

// Create a model from the schema
const URL = mongoose.model('URL', urlSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to create a short URL
app.post('/shorten', async (req, res) => {
  const { original_url } = req.body; // Extract original URL from request body
  const short_url = nanoid(7); // Generate a short URL using nanoid

  // Create a new URL document and save it to the database
  const newUrl = new URL({ original_url, short_url });
  await newUrl.save();

  // Respond with the generated short URL
  res.json({ short_url });
});

// Endpoint to redirect to the original URL
app.get('/:short_url', async (req, res) => {
  const { short_url } = req.params; // Extract short URL from request parameters
  const url = await URL.findOne({ short_url }); // Find the URL document by short URL

  if (url) {
    url.click_count++; // Increment click count
    await url.save(); // Save the updated URL document
    res.redirect(url.original_url); // Redirect to the original URL
  } else {
    res.status(404).send('URL not found'); // Respond with 404 if URL not found
  }
});

// Endpoint to get analytics for a short URL
app.get('/analytics/:short_url', async (req, res) => {
  const { short_url } = req.params; // Extract short URL from request parameters
  const url = await URL.findOne({ short_url }); // Find the URL document by short URL

  if (url) {
    res.json({ click_count: url.click_count }); // Respond with click count
  } else {
    res.status(404).send('URL not found'); // Respond with 404 if URL not found
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
