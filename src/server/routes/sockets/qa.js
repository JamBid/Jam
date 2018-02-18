//example of the channel for socket.io
module.exports = function(io){
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
    });
}