const express = require('express');
const path = require('path');
const http = require('http')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname + "/../public")
console.log(path.join(__dirname + "/../public"));

const app = express();
var server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function (socket) {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'user',
        text: 'hi there',
        createdAt: 123
    })

    socket.on('createMessage', (newMessage) => {
        newMessage.createdAt = new Date();
        console.log('createMessage', newMessage)
    })

    socket.on('disconnect', function (socket) {
        console.log('User was disconnected');
    })
})



app.get('/', (req, res) => {

});


const PORT = process.env.lPORT || 3000;
server.listen(PORT, () => console.log(`Server Running On Port PORT`));
