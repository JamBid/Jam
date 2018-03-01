const db = require('../../models/models');

//function to handle bid logic
placeBid = (msg, socket, nsp) => {
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
        1
    )
    .then(function(result){
        if(result.length === 0){
            db.products.selectAllWithMultCon({'id':msg.msg.prodId})
            .then(result =>{
                if(result[0].startingPrice < msg.msg.bid){
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
        }      
        else if(result[0].amount < msg.msg.bid){
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
        }else
            socket.emit('bid',{msg:'too low'})
    })
    .catch(function(error){
        console.log(error);
        socket.emit('bid',{msg:'error'})
    });
}

//function to handle new answers
submitAnswer = (msg,socket,nsp) => {
    db.answers.insertOne(
        ['questionId','userId','note'],
        [msg.questionId,msg.userId,msg.answer]
    )
    .then(res => {
        nsp.in("prod"+msg.room).emit('answer', {msg:'success',answerId:res});
    })
    .catch(error => {
        console.log(error);
        socket.emit('answer','error')
    })
}

//channel for socket.io for a specific product
module.exports = function(io){
    const nsp = io.of("/prod");
    nsp.on('connection', function(socket){
        console.log("New client connected to prod: "+socket.conn.remoteAddress);

        //handles joining
        socket.on('room',(msg) =>{
            if(socket.room)
                socket.leave(socket.room);
            
            socket.join("prod"+msg);
        });

        //sending messages out to the room for bids
        socket.on('bid', (msg) => {
            placeBid(msg,socket,nsp);
        })

        //sending messages out to the room for new answers
        socket.on('answer', (msg) => {
            submitAnswer(msg,socket,nsp)
        })

        // disconnect is fired when a client leaves the server
        socket.on('disconnect', () => {
            console.log('user disconnected from chat');
        });
    });
}