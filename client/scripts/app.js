// YOUR CODE HERE:
$(() => {
  app.init();
});

// var _ = underscore;
var app = {};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function () {

  // var loadMessages = function loadMessages () {
  app.clearMessages();
  var data = app.fetch('', () => {
    var messages = data.responseJSON.results;

    for (let i = 0; i < messages.length; i++) {
      app.renderMessage(messages[i]);
    }
  });
  // };

  // var everyMessage = $.ajax({
  //   url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  //   type: 'GET',
  //   success: () => { loadMessages(); }
  // });
  app.handleUsernameClick('#chats', '.username');
  app.handleSubmit();

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

app.fetch = function fetch (data, success = console.log('successful fetch')) {
  data = data ? '/' + data : '';
  return $.ajax({
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages' + data,
    success: success
  });
};

app.clearMessages = function clearMessages() {
  $('#chats').children().remove();
};

app.renderMessage = function renderMessage(message) {
  var $message = $('<div class="message"></div>');
  var $username = $(`<h2 class="username" id="${_.escape(message.username)}"> ${_.escape(message.username)} </h2>`);
  var $text = $(`<p class="text"> ${_.escape(message.text)} </p>`);

  if (!message.roomname) {
    message.roomname = '';
  }
  var $roomname = $(`<h3 class="roomname"> ${_.escape(message.roomname)} </h3>`);
  $message.append($username, $text, $roomname);
  $('#chats').prepend($message);
};

app.renderRoom = function renderRoom(roomname) {
  var $room = $(`<div id=" ${roomname} "> ${roomname} </div>`);
  $('#roomSelect').append($room);
};

app.handleUsernameClick = function handleUsernameClick (parent, type) {
  $(parent).on('click', type, function (event) {
    // console.log('event:', event, 'this:', this);
    // console.log('this.id:', this.id);
    console.log(_.escape(this.id) + ' clicked');
  });
};

app.handleSubmit = function handleSubmit() {
  $('#send').submit(function (event) {
    event.preventDefault();
    console.log('event: ', event);
    let text = $('#message').val();
    let message = {
      username: 'lil bobby t',
      text: text,
      roomname: 'SFM8'
    };
    console.log('handling submit with message: ', message);
    app.renderMessage(message);
  });
};


