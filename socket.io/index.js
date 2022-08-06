const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
  // socket.on('chat message', (msg) => {
  //     console.log('message: ' + msg);
  // });

  socket.on('chat message', (msg, room) => {
    console.log(msg, room)
    if (room === "") {
      console.log(room)
      io.emit('chat message', msg);
    }
    else {
      io.to(room).emit('chat message', msg)
    }
  });

  socket.on('join room', (room) => {
    console.log(room)
    socket.join(room)
    console.log(io.sockets.adapter.rooms)

    // io.to(room).emit("chat message")
    console.log()
  });

  socket.on("typing",(room)=>{
    // console.log(room)
    if (room === "") {
      // console.log(1)
      socket.broadcast.emit("typing")
      // io.emit("typing");
    }
    else {
      // console.log(2)
      io.to(room).emit('typing')
    }

  })

  socket.on("nottyping",(room)=>{
    // console.log(room)
      // console.log(4)
      setTimeout(()=>{
        io.emit("nottyping");
      },500)    

  })
// console.log(socket)

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


