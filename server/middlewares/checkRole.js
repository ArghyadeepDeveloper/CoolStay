function checkRole(userType) {
  return (req, res, next) => {
    try {
      if (userType == req.user.type) {
        next();
      } else {
        res.status(403).json({ message: "Unauthorized" });
      }
    } catch (err) {
      res.status(500).json({ mesage: "Server error" });
    }
  };
}

module.exports = checkRole
