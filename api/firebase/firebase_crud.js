const { initializeApp } = require('firebase/app')
const { getStorage, uploadBytes ,ref } = require("firebase/storage")
const { getDatabase } = require('firebase/database');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY || "AIzaSyBGV1iXgRlJH9YJ5zFHF2GGCXUnjoI9F_Y",
    authDomain: process.env.AUTH_ADMIN || "ssd-assignment-2-6723b.firebaseapp.com",
    projectId: process.env.PROJECT_ID || "ssd-assignment-2-6723b",
    storageBucket: process.env.STORAGE_BUCKET_ID || "ssd-assignment-2-6723b.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID || "238802327118",
    appId: process.env.APP_ID || "1:238802327118:web:2bd8771762755d9b1f551f",
    measurementId: process.env.MESUREMENT_ID || "G-K303J998JX",
    databaseURL: process.env.DATABES_URL || "https://ssd-assignment-2-6723b-default-rtdb.firebaseio.com/"
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

