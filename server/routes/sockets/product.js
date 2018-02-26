//channel for socket.io for a specific product
module.exports = function(io){
    const nsp = io.of("/prod");
    nsp.on('connection', function(socket){
        console.log("New client connected to prod: "+socket.conn.remoteAddress);

        //handles joining
        socket.on('room',(msg) =>{
            console.log('Chat msg:', msg+" ID: "+socket.client.id);

            if(socket.room)
                socket.leave(socket.room);
            
            socket.join("prod"+msg);
        });

        //sending messages out to the room
        socket.on('bid', (msg) => {
            console.log(msg)
            nsp.in("prod"+msg.room).emit('bid', 'I placed a bid.');
        })

        // disconnect is fired when a client leaves the server
        socket.on('disconnect', () => {
            console.log('user disconnected from chat');
        });
    });
}