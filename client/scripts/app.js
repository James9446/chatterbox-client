// YOUR CODE HERE:
$(() => {
  app.init();
});

var app = {};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function () {

  // var loadMessages = function loadMessages () {

  //   // console.log('Loading messages');
  //   // var $message = $('<p></p>');

  //   var messages = everyMessage.responseJSON.results;

  //   for (let i = 0; i < messages.length; i++) {
  //     $message.append(messages[i].text);
  //     $('#every-message').append($message);
  //     $message = $('<p></p>');
  //   }
  // };

  var everyMessage = $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET'
  });

  app.fetch();

/*,
    success: loadMessages*/
};

app.send = function send (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    //  contentType: 'application/json',
    success: function (data) {
      console.log('data: ', data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function fetch (data) {
  data = data ? '/' + data : '';
  return $.ajax({
    type: 'GET',
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages' + data,
    success: console.log // put a function here that returns what we ask for
  });
};