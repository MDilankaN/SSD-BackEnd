const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, process.env.UPLOAD_DIR);
    },
    filename: (req, file, callback) => {
        callback(null, path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

module.exports = upload;