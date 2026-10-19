const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes import karein
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');   // Naya
const categoryRoutes = require('./routes/categoryRoutes'); // Naya



// Env variables load karein
dotenv.config();

// Database connect karein
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

// app.use(cors({
//   origin: 'https://cy-frontend.vercel.app', // Apna frontend URL yahan daalein
//   credentials: true
// }));

// Basic Test Route
app.get('/', (req, res) => {
  res.send('CY Products API is running...');
});

// API Routes
app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);      // Naya
app.use('/api/categories', categoryRoutes);   // Naya

app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

// Global Error Handler (Agar code mein koi crash/error aaye)
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err); // Terminal mein error print karega
  res.status(500).json({ 
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});