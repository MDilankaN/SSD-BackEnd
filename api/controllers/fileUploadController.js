const {
    storageRef,
    uploadBytes,
} = require("../firebase/firebase_crud");

const addFiles = async (req, res) => {
    try {
        console.log(req.files)

        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let fileUpload = req.files.fileUpload;
            uploadBytes(storageRef, fileUpload).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: fileUpload.name,
                    mimetype: fileUpload.mimetype,
                    size: fileUpload.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }

};

module.exports = {
    addFiles
};