const multer = require('multer');
const path = require('path');

// Set up multer storage with disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public',"images"));
  },
  filename: (req, file, cb) => {
    // Customize the filename as needed
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, 'uploads-' + uniqueSuffix + fileExtension);
  },
});

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
    },
    fileFilter: (req, file, cb) => {
      // Check file types (you can customize this as needed)
      if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Allow the file to be uploaded
      } else {
        cb(new Error('Invalid file type. Only images are allowed.')); // Reject the file
      }
    },
  });

module.exports = upload;