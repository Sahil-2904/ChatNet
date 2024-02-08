const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
app.use(cors());

const server  = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        method:["GET","POST"]
    }
})

io.on("connection",(socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("joinRoom",(data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} connected to room ${data}`);
    })
    socket.on("message",(data) => {
        console.log(data);
        socket.to(data.room).emit("receiveMsg",data);
    })
    socket.on("disconnect",() => {
        console.log(`User Disconnected: ${socket.id}`);
    })
})


server.listen(3001,() => {
    console.log("Server running on port 3001");
});
