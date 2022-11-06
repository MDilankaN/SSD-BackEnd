const {
    database
} = require("../firebase/firebase_crud");

const registerUser = async (req, res) => {
    try {

        if (!req.body) {
            res.status(200).send("No registration yet");
        } else {
            const { username, email, password, reneterpassword, type } = req.body;

            if (password == reneterpassword){
                console.log(database.ref())
                const usersRef = database.ref().child('users');

                await usersRef.set({
                    username: username,
                    password: password,
                    email: email,
                    type: type
                });
                res.status(200).send("registration completed");
            }else{
                res.send({
                    status: true,
                    message: 'reenter password incorrect',
                });
            }

        }
    } catch (err) {
        res.status(500).send(err);
    }

};

module.exports = {
    registerUser
};