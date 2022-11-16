const {
  storage,
  uploadBytes,
  uploadBytesResumable,
} = require("../firebase/firebase_crud");
// const path = require("path");
const { ref } = require("firebase/storage");

const addFiles = async (req, res) => {
  console.log("Called");
  console.log(req.files);
  if (!req.files) {
    res.send({
      status: false,
      message: "No file uploaded",
    });
  } else {
    try {
      let files = req.files;
      console.log(req.files);

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

      //   Object.keys(files).forEach((key) => {
      //     const filepath = path.join(__dirname, "files", files[key].name);

      //     files[key].mv(filepath, (err) => {
      //       if (err) res.status(500).send(err);
      //     });
      //   });

      //   console.log(__dirname+'\\'+files.file.name);

      const storageRef = ref(storage, "FileUpload/" + files.file.name);

      uploadBytes(storageRef, files.file.data).then((snapshot) => {
        console.log(snapshot.metadata.fullPath);
      });
      res.send({
        status: true,
        message: "File is uploaded",
        // data: {
        //   name: fileUpload.name,
        //   mimetype: fileUpload.mimetype,
        //   size: fileUpload.size,
        // },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

module.exports = {
  addFiles,
};
