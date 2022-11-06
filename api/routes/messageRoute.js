const router = require("express").Router();
const {
    messageSend
} = require("../controllers/messageController");

router.post("/sendmessage", messageSend);

module.exports = router;