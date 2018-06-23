var express = require('./lib/node_modules/express');
var app = express();
var http = require('http').Server(app);
var io = require('./lib/node_modules/socket.io')(http);

http.listen(3000, () =>
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
