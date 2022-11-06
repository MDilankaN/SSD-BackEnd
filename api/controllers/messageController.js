const {
    database
} = require("../firebase/firebase_crud");



const messageSend = async (req, res) => {
    try {

        if (!req.body) {
            res.status(200).send("No message sent");
        } else {
            const { message } = req.body;
            const messageRef = database.child('messages');
            messageRef.set({
                message: message,
            });
            res.status(200).send("message sent successfully");
        }
    } catch (err) {
        res.status(500).send(err);
    }

};

module.exports = {
    messageSend
};