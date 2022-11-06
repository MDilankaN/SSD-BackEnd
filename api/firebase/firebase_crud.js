const { initializeApp } = require('firebase/app')
const { getStorage, uploadBytes ,ref } = require("firebase/storage")
const { getDatabase } = require('firebase/database');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_ADMIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET_ID,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MESUREMENT_ID,
    databaseURL: process.env.DATABES_URL
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
// Get a database reference to our blog
const database = getDatabase(appFirebase);


const storageRef = getStorage();




module.exports = {
    storageRef,
    appFirebase,
    uploadBytes,
    database
};

// const uploadFile = (File file) => {
//     uploadBytes(storageRef, file).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//     });
// }

//storage.child("images/example.jpg").put(imgValue)

