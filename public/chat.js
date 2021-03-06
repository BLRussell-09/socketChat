const wordFilter = (message) =>
{
  if (message.includes('<script>') || message.includes('</script>'))
  {
    message = '';
    console.log('message: ', message);
  }
  else
  {
    message = `/${message}/`
    console.log('message: ', message);
  };
  return message;
};

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
  var messageText = wordFilter(message.val());
  socket.emit('chat',
  {
    message: messageText,
    handle : handle.val()
  });
});

message.keypress((e) =>
{
  if (e.which === 13)
  {
    var messageText = wordFilter(message.val());
    socket.emit('chat',
    {
      message: messageText,
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
  output.append(`<p><strong>${data.handle}:</strong> ${data.message}</p>`);
});

socket.on('typing', (data) =>
{
  feedback.html(`<p><em>${data} is typing a message</em></p>`);
});
