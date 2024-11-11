const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get the token from the Authorization header
  if(!req.headers['authorization']){
    return res.status(401).json({message: "no token provided"})
  }
  const token = req.headers['authorization'].slice(7, req.headers['authorization'].length);

  console.log(token.slice(7, token.length))

  // Check if token exists
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // Save the decoded token (payload) in the request for use in other routes
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
