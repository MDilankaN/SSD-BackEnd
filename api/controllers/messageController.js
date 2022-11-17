const { collection, addDoc } = require("firebase/firestore");
const { firestoredb } = require("../firebase/firebase_crud");
const CryptoJS = require('crypto-js');

const messageSend = async (req, res) => {
    try {

        if (!req.body) {
            res.status(200).send("No message sent");
        } else {
            const { message, username } = req.body;
            console.log(message);
            //decrypt the message
            const decrypt = CryptoJS.enc.Base64.parse(message).toString(CryptoJS.enc.Utf8);
            //create a collection in firebase store
            const msgCollection = collection(firestoredb, "messages");
            const data = {
                "username": username,
                "message" : decrypt
            }
            const value = await addDoc(msgCollection, data);
            
            res.status(200).send("successed");

        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

};

module.exports = {
    messageSend
};