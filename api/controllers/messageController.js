const { collection, addDoc } = require("firebase/firestore");
const { firestoredb } = require("../firebase/firebase_crud");


const messageSend = async (req, res) => {
    try {

        if (!req.body) {
            res.status(200).send("No message sent");
        } else {
            const { message, username } = req.body;
            console.log(message);
            const msgCollection = collection(firestoredb, "messages");
            const data = {
                "username": username,
                "message" : message
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