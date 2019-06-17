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

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', (socket) => {
        console.log('User was disconnected');
    })
})



app.get('/', (req, res) => {

});


const PORT = process.env.lPORT || 3000;
server.listen(PORT, () => console.log(`Server Running On Port PORT`));
