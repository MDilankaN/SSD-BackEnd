
const router = require("express").Router();
const {
    messageSend
} = require("../controllers/messageController");

const verifyJWT = require('../middleware/verifyJWT')
router.post("/sendmessage", verifyJWT,messageSend);

module.exports = router;