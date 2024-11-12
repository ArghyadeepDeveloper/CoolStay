const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, and .png files are allowed!"));
  }
};

// Multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
  fileFilter: fileFilter,
});

const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Set file size limit to 2MB
  fileFilter: fileFilter,
}).single("image"); // 'photo' is the field name

const singleFileUpload = (req, res, next) => {
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    } else if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }
    next();
  });
};

const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Set file size limit to 2MB per file
  fileFilter: fileFilter,
}).array("images", 6); // 'photos' is the field name, max 5 files

const multipleFileUpload = (req, res, next) => {
  uploadMultiple(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    } else if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }
    next();
  });
};

module.exports = { singleFileUpload, multipleFileUpload };
