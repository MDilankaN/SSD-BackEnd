const { initializeApp } = require('firebase/app')
const { getStorage, uploadBytes ,ref, uploadBytesResumable } = require('firebase/storage')
const { getDatabase } = require('firebase/database');
const { getFirestore } = require('firebase/firestore');

require('dotenv').config();

const firebaseConfig = {
    apiKey: "AIzaSyBGV1iXgRlJH9YJ5zFHF2GGCXUnjoI9F_Y",
    authDomain: "ssd-assignment-2-6723b.firebaseapp.com",
    databaseURL: "https://ssd-assignment-2-6723b-default-rtdb.firebaseio.com",
    projectId: "ssd-assignment-2-6723b",
    storageBucket: "ssd-assignment-2-6723b.appspot.com",
    messagingSenderId: "238802327118",
    appId: "1:238802327118:web:2bd8771762755d9b1f551f",
    measurementId: "G-K303J998JX"
};
  
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const firestoredb = getFirestore();

const storage = getStorage(firebase,'gs://ssd-assignment-2-6723b.appspot.com/');



module.exports = {
    storage,
    uploadBytes,
    firestoredb,
    uploadBytesResumable
};

// const uploadFile = (File file) => {
//     uploadBytes(storageRef, file).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//     });
// }

//storage.child("images/example.jpg").put(imgValue)

