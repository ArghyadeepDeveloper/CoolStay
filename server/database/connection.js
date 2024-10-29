const mongoose = require('mongoose');

const db_url = "mongodb://127.0.0.1:27017/CoolStay";

async function connectToDatabase() {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectToDatabase;

module.exports = connectToDatabase;
