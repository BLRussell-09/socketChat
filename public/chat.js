// Make connection

var socket = io.connect();

// Query Dom
var handle = $('#handle');
var message = $('#message');
var btn = $('#send');
var output = $('#output');
var feedback = $('#feedback');

// Emit Events

btn.click(() =>
{
  if (message.val().length > 70 )
  {
    message.length = 70;
  }
  socket.emit('chat',
  {
    message: message.val().replace(/[\W_]+/g," "),
    handle : handle.val()
  });
});

message.keypress((e) =>
{
  if (e.which === 13)
  {
    socket.emit('chat',
    {
      message: message.val().replace(/[\W_]+/g," "),
      handle : handle.val()
    });
  };
});

message.keypress((e) =>
{
  if (e.which !== 13)
  {
    socket.emit('typing', handle.val());
  };
});

// Listen For Events

socket.on('chat', (data) =>
{
  feedback.html('');
  console.log(data)
  output.append(`<p><strong>${data.handle}:</strong> ${String(data.message)}</p>`);
});

socket.on('typing', (data) =>
{
  feedback.html(`<p><em>${data} is typing a message</em></p>`);
});
