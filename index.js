var express = require('./lib/node_modules/express');
var socket = require('./lib/node_modules/socket.io');

// App Setup
var app = express();
var server = app.listen(3000, () =>
{
  console.log('listening to requests on port 3000');
});


// Static Files
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

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
