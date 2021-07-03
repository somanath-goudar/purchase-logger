const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to Purchase Logger API | Created by Somanath Goudar' });
});

// Init Middleware
app.use('/uploads', express.static('uploads'));
app.use(express.json({ extended: false }));

app.use('/api/purchases', require('./routes/purchases'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
