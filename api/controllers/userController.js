const { ref, set } = require("firebase/database");
const { collection, getDocs, addDoc } = require("firebase/firestore");
const { firestoredb } = require("../firebase/firebase_crud");

// const userDatabase = {
//   users : require('../models/users.json')
// }

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const registerUser = async (req, res) => {
  try {
    if (!req.body) {
      res.status(200).send("No registration yet");
    } else {
      const { username, email, password, type } = req.body;
      console.log(req.body)

      const hashedPwd = await bcrypt.hash(password, 10);

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

      if (!datausers) {
        const userObj = {
          username: username,
          password: hashedPwd,
          email: email,
          type: type,
        };

        const value = await addDoc(userCollection, userObj, username);

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

const loginUser = async (req, res) => {
  try {
    if (!req.body) {
      res.status(200).send("Empty Body");
    } else {
      const { username, password } = req.body;

      const userCollection = collection(firestoredb, "users");

      const datausers = await getDocs(userCollection)
        .then((snapshot) => {
          let val = "invalid creds";
          snapshot.docs.forEach((doc) => {
            if(doc.data().username === username) {
              val = "Invalid password";
              if (bcrypt.compare(password, doc.data().password )) {
                val = doc.data();
              }
            }
          });
          return val;
        })
        .catch((e) => {
          console.log(e);
        });

        console.log(datausers);

      if (datausers === "invalid creds" || datausers === "Invalid password") {
        res.status(200).send('Error occored');
      } else {
        //sending obj
        const accessToken = jwt.sign(
          {
            "user": datausers,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
          {
            "username": datausers,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        

        res.json({"accessToken" : accessToken, "refreshToken": refreshToken, "user": datausers});
      }
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
