const express = require('express')
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const https = require('https');
const fs = require('fs')

const PORT = process.env.PORT || 5000;
const app = express()
dotenv.config();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(
    "/api/public/uploads",
    express.static(path.join(__dirname, "/api/public/uploads"))
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
)


app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use("/fileUploadRoute", require("./api/routes/fileRoute"));
app.use("/userRoute", require("./api/routes/userRoute"));
app.use("/messageRoute", require("./api/routes/messageRoute"));


sslServer.listen(PORT, () => {
    console.log(`this is running  port ${PORT}`)
})
