const { ref, set } = require("firebase/database");
const { collection, getDocs, addDoc } = require("firebase/firestore");
const { firestoredb } = require("../firebase/firebase_crud");

const registerUser = async (req, res) => {
  try {
    if (!req.body) {
      res.status(200).send("No registration yet");
    } else {
      const { username, email, password, type } = req.body;

      const userCollection = collection(firestoredb, "users");

      const datausers = await getDocs(userCollection)
        .then((snapshot) => {
          let val = false;
          snapshot.docs.forEach((doc) => {
            // users.push({...doc.data(), id: doc.id}); // gatting user list example
            if (doc.data().username === username) {
              val = true;
            }
          });
          return val;
        })
        .catch((e) => {
          console.log(e);
        });

      console.log("value " + datausers);

      if (!datausers) {
        const userObj = {
          username: username,
          password: password,
          email: email,
          type: type,
        };
        console.log("userObj" + userObj);
        const value = await await addDoc(userCollection, userObj, username);
        console.log(value);
        res.status(200).send("successed");
      } else {
        res.status(200).send("User already exsits");
      }
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

module.exports = {
  registerUser,
};
