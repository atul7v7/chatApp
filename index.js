const express = require('express')
const socket = require('socket.io')

const app = express()

app.use(express.static('public/'));

const server = app.listen(5000,() => console.log("listening on port 5000"))

// sending file to bowser


const io = socket(server)  // it will take the arguemnnt on where webSocket is to be established

// this will listen to connection event
//each client will have unique socket
io.on('connection',(socket) => {
    
        console.log("connection established with socketId",socket.id);
        // LISTENING TO PARTICULAR SOCKET FROM WHICH THE CONNECTION IS ESTABLISHED
        // as per my experience .on is used to listen to event
        socket.on('chat',(data) =>{
            console.log("we have the recieved the emit by client",data)
            // io.sockets refer to all the socket connencted with server
            io.sockets.emit('chat',data) // this is going to send data to all socket connected to server
            socket.broadcast.emit('typing', ' ')
        })
    // listening to typing message
    socket.on('typing',function(data){
        // to broadcast
        socket.broadcast.emit('typing',data)
    });
})