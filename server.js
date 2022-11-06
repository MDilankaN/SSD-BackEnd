const express = require('express')
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

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




app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use("/fileUploadRoute", require("./api/routes/fileRoute"));
app.use("/userRoute", require("./api/routes/userRoute"));


app.listen(PORT, () => {
    console.log(`this is running ${PORT}`)
})