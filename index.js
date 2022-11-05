var PORT = 5000;
var express = require('express');
var app = express();

var http = require('http');
// var server = http.server(app);

app.use(express.static('client'));

app.listen(PORT, function () {
    console.log("Server is now running");
})
