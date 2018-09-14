'use strict';
const express = require('express');
const  path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000,() => {
    console.log('server is listening in port 3000')
});

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'))
});
io.on('connection',(socket) => {
    // socket.emit('news',{hello:'world'});
    socket.on('move',(data) => {
        console.log(data);
        socket.broadcast.emit('location',data)
    })
});
