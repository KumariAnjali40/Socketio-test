// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Store room participants
const rooms = new Map();

io.on('connection', socket => {
  socket.on('createRoom', room => {
    // Create a new room if it doesn't exist
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room).add(socket.id);
    socket.join(room);
    socket.emit('roomCreated', room);
  });

  socket.on('joinRoom', room => {
    if (rooms.has(room)) {
      rooms.get(room).add(socket.id);
      socket.join(room);
      socket.emit('roomJoined', room);
      socket.to(room).emit('userJoined', socket.id);
    } else {
      socket.emit('roomNotFound');
    }
  });

  socket.on('offer', ({ to, offer }) => {
    socket.to(to).emit('offer', { from: socket.id, offer });
  });

  socket.on('answer', ({ to, answer }) => {
    socket.to(to).emit('answer', { from: socket.id, answer });
  });

  socket.on('iceCandidate', ({ to, candidate }) => {
    socket.to(to).emit('iceCandidate', { from: socket.id, candidate });
  });

  socket.on('disconnect', () => {
    rooms.forEach(users => {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        const room = [...rooms].find(([_, users]) => users.has(socket.id));
        if (room) {
          socket.to(room[0]).emit('userLeft', socket.id);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Signaling server is running on port ${PORT}`);
});
