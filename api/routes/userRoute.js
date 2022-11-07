const router = require("express").Router();
const {
    registerUser, loginUser
} = require("../controllers/userController");
const verifyJWT = require('../middleware/verifyJWT')

router.post("/register",verifyJWT, registerUser);
router.post("/login", loginUser);

module.exports = router;