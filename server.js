const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const PORT = process.env.PORT || 5000;

const app = express()

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.post('/upload', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let fileupload = req.files.fileupload;
            fileupload.mv('./uploads/' + fileupload.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: fileupload.name,
                    mimetype: fileupload.mimetype,
                    size: fileupload.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(PORT, () => {
    console.log(`this is running ${PORT}`)
})