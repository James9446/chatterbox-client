// YOUR CODE HERE:
$(() => {
  app.init();
  $('#chat-header').on('click', function (event) {
    console.log('click event', event);
    var button = $(event.relatedTarget); // Button that triggered the modal
    var recipient = button.data('whatever'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient);
    modal.find('.modal-body input').val(recipient);
  });
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
      app.init();
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
  var $message = $(`<div class="container-fluid message-container"><div class="container-fluid"><h2 class="username" id="${_.escape(message.username)}">${_.escape(message.username)}</h2><span>${_.escape(message.createdAt)}</span></div><p>${_.escape(message.text)}</p></div>`);
  // var $username = $(`<h2 class="username" id="${_.escape(message.username)}"> ${_.escape(message.username)} </h2>`);
  // var $text = $(`<p class="text"> ${_.escape(message.text)} </p>`);

  // if (!message.roomname) {
  //   message.roomname = '';
  // }
  // var $roomname = $(`<h3 class="roomname"> ${_.escape(message.roomname)} </h3>`);
  // $message.append($username, $text, $roomname);
  $('#chats').append($message);
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
    app.send(message);
  });
};




