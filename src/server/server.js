const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// Serve up static assets
app.use(express.static(path.join(__dirname,"../../build")));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname+'./index.html');
});

//global socket
require('../routes/sockets/global.js')(io);

//QA socket
require('../routes/sockets/qa.js')(io);

// Routes
// =============================================================
require("../routes/api/routes")(app);

server.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});