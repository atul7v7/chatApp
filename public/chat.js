// socket libriray is loaded it got acces to io 
//io.connect('addres to connect') this will establish the websocket connection between client and server address provided
var socket = io.connect('http://localhost:5000')

// QUERYING DOM

var output = document.getElementById('output');
var handle = document.getElementById('handle')
var message = document.getElementById('message')
var btn = document.getElementById('send')
var feedback = document.getElementById('feedback')

// EMIT EVENTS
btn.addEventListener('click',function(){
    feedback.innerHTML=" ";
    socket.emit('chat',{   //this is going to message over socket two parameter first is the name of message and the second is data
        handle: handle.value,
        message:message.value
    });
});

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value + ' is typing...');
})

// LISTENG TO INCOMING MESSAGE
socket.on('chat',function(data){
    console.log("server have recieved the data send by client or particular browser")
    output.innerHTML += '<p><strong>'+ data.handle + ':<strong>'+ data.message + '<p>'
})

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+ data + '</em></p>'
})