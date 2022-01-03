const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require('mongoose')
db = 'mongodb://localhost:27017/chatroom'
let chatModel = require('./db/chatSchema')

async function connectdb() {
    try {
        await mongoose.connect(db, { useNewUrlParser: true })
        console.log("Mongodb connected")
    }
    catch (err) {
        console.error(err.message)
    }
}
connectdb()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    chatModel.find({}, (err, data) => {
        socket.emit('chat message', data)
        if (err) throw err;
        // console.log(data)
    })
    socket.on('message', async (msg) => {
        console.log(msg)
        const inc = new chatModel({ Message: msg })
        await inc.save((err, data) => {
            if (err) throw err;
            else {

            }
        }
        )




        chatModel.find({}, (err, data) => {
            io.emit('chat message', data)
            if (err) throw err;
            console.log(data)
        })
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});