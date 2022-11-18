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
      
      const storageRef = ref(storage, "FileUpload/" + files.file.name);

      uploadBytes(storageRef, files.file.data).then((snapshot) => {
        console.log(snapshot.metadata.fullPath);
      });
      res.send({
        status: true,
        message: "File is uploaded",

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
