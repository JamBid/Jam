const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const path = require('path')

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

// This is what the socket.io syntax is like
io.on('connection', socket => {
    console.log('New client connected: '+socket.conn.remoteAddress);

    // just like on the client side, we have a socket.on method that takes a callback function
    socket.on('change color',(color) =>{
        // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
        // we make use of the socket.emit method again with the argument given to use from the callback function above
        console.log('Color Changed to: ', color);

        io.sockets.emit('change color', color);
    });

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//example of the channel for socket.io
const nsp = io.of("/chat");
nsp.on('connection', function(socket){
    console.log("New client connected to chat: "+socket.conn.remoteAddress);

    //handles the chat
    socket.on('chat history',(msg) =>{
        console.log('Chat msg:', JSON.stringify(msg)+" ID: "+socket.client.id);

        nsp.emit('chat history', msg);
    });

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('user disconnected from chat');
    });
})

server.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});