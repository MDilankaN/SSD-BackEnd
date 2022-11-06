const upload = require("../middleware/fileMiddleware")
const app = require("express").Router();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const {
    addFiles
} = require("../controllers/fileUploadController");


app.post("/fileAdd", addFiles);

module.exports = app;