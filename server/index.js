const express = require('express');
const cors = require('cors');
const adminUserRoutes = require('./routes/admin/users.route');
const connectToDatabase = require('./database/connection');
const categoryRoutes = require('./routes/admin/categories.route');
const brandRoutes = require('./routes/admin/brands.route');
const productRoutes = require('./routes/seller/products.route');

// Load environment variables from .env
require('dotenv').config();

// Connect to database with environment variable
connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

app.use("/admin", adminUserRoutes);
app.use("/admin", categoryRoutes);
app.use("/admin", brandRoutes);
app.use("/seller",productRoutes);

// Use PORT from environment variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
