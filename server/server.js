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

    // socket.emit from admin Welcome to the chat app
    // socket.broadcast.emit from Admin text New user joined

    socket.emit('newMessage', {
        text: 'Welcome to the Chat App!',
        from: 'admin',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        text: 'New user joined the Chat App!',
        from: 'admin',
        createdAt: new Date().getTime()
    })


    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        io.emit(
            'newMessage',
            {
                from: message.from,
                text: message.text,
                createdAt: new Date().getTime()
            })

        //     socket.broadcast.emit(
        //         'newMessage',
        //         {
        //             from: message.from,
        //             text: message.text,
        //             createdAt: new Date().getTime()
        //         })

    })

    socket.on('disconnect', function (socket) {
        console.log('User was disconnected');
    })
})



app.get('/', (req, res) => {

});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server Running On Port ${PORT}`))
