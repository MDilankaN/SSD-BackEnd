const { ref, set } = require("firebase/database");
const { database } = require("../firebase/firebase_crud");

const registerUser = async (req, res) => {
  try {
    if (!req.body) {
      res.status(200).send("No registration yet");
    } else {
      const { username, email, password, type } = req.body;

      const usersRef = ref(database , "users/"+username);
    
      set(usersRef, {
        username: username,
        password: password,
        email: email,
        type: type,
      });
      res.status(200).send("registration completed");
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err)
  }
};

module.exports = {
  registerUser,
};
