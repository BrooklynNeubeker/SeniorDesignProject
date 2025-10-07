const express = require("express");

//Think we want these once the server is setup
const PORT = 8080;
const HOST = '0.0.0.0';

// The app
const app = express();

app.use(express.static('src'));

app.get("/", function(req, res) {
    return res.sendFile("./src/test.html", { root: __dirname});
});


app.listen(PORT, HOST, function(){
    console.log('Running on http://${HOST}:${PORT}');
});

// app.listen(3000, function(){
//     console.log('Listening on port 3000');
// });