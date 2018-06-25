var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(process.env.PORT || 3000, () =>
{
  console.log('listening to requests on port 3000');
});

app.use(express.static('public'));

io.on('connection', (socket) =>
{
  console.log('made socket connection', socket.id);

  socket.on('chat', (data) =>
  {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) =>
  {
    socket.broadcast.emit('typing', data);
  })
});
