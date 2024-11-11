function handleMongooseError(error) {
  // Check if it's a duplicate key error
  if (error.code === 11000) {
    // Extract the key causing the duplicate error
    const duplicateKey = Object.keys(error.keyPattern)[0];
    return `Duplicate key error: The value for "${duplicateKey}" already exists.`;
  }
  
  // If it's not a duplicate key error, return a generic message
  return 'An error occurred';
}

module.exports = handleMongooseError;
