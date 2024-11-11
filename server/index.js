const express = require('express');
const cors = require('cors');
const adminUserRoutes = require('./routes/admin/users.route');
const connectToDatabase = require('./database/connection');
const categoryRoutes = require('./routes/admin/categories.route');

// Load environment variables from .env
require('dotenv').config();

// Connect to database with environment variable
connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/admin", adminUserRoutes);
app.use("/admin", categoryRoutes);

// Use PORT from environment variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
