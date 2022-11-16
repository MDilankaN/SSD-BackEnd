const {
    storageRef,
    uploadBytes,
    uploadBytesResumable
} = require("../firebase/firebase_crud");


const addFiles = async (req, res) => {


        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            try {
                let fileUpload = req.files.fileUpload;
                // uploadTask.on(
                //     "state_changed",
                //     (snapshot) => {
                //         const uploaded = Math.floor(
                //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                //         );
                //     },
                //     (error) => {
                //         console.log(error);
                //     },
                //     () => {
                //
                //     }
                // );
                uploadBytes(storageRef, fileUpload).then((snapshot) => {
                    console.log(snapshot);
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

            } catch (err) {
                console.log(err)
                res.status(500).send(err);
            }
        }


};

module.exports = {
    addFiles
};