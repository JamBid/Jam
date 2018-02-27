const db = require('../../models/models');

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
            db.bids.selectAllWithMultConOrderLimit(
                {
                    prodId:{
                        vals:msg.msg.prodId,
                        where:"EQUALS",
                        join:"AND"
                    }
                },
                [
                    {amount:"desc"}
                ],
            1)
            .then(function(result){
                if(result.length === 0 || result[0].amount < msg.msg.bid){
                    db.bids.insertOne(
                        ['amount','buyerId','prodId'],
                        [msg.msg.bid, msg.msg.userId, msg.msg.prodId]
                    ).
                    then(res => {
                        nsp.in("prod"+msg.room).emit('bid', {msg:'success'});
                    })
                    .catch(error => {
                        console.log(error);
                        socket.emit('bid','error')
                    })
                }
                    
                else
                    socket.emit('bid',{msg:'too low'})
            })
            .catch(function(error){
                console.log(error);
                socket.emit('bid',{msg:'error'})
            });
        })

        // disconnect is fired when a client leaves the server
        socket.on('disconnect', () => {
            console.log('user disconnected from chat');
        });
    });
}