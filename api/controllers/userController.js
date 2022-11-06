const { async } = require("@firebase/util");
const {
    database
} = require("../firebase/firebase_crud");

const registerUser = async (req, res) => {
    try {
        if (!req.body) {
            res.status(200).send("Empty Request");
        } else {
            const { username, email, password, type } = req.body;

            console.log(req.body);
            const user = {
                username: username,
                password: password,
                type:type,
                email: email
            }

            const userRes =  await database.set(user);

            res.json(userRes);
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }

};


const loginUser = async 

module.exports = {
    registerUser
};