var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        console.log('Should scroll');
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    params.room = params.room.toLowerCase();
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No error');
        }

    });
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    console.log('users', users)
    var ol = $('<ol></ol>')
    users.forEach(function (user) {
        ol.append($('<li></li>').text(user))
    })

    $('#users').html(ol);
})

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var template = $('#message-template').html();

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var html = Mustache.render(template, {
        createdAt: formattedTime,
        from: message.from,
        text: message.text
    });


    $('#messages').append(html)
    scrollToBottom();

});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        createdAt: formattedTime,
        url: message.url,
        from: message.from
    })
    $('#messages').append(html);
    scrollToBottom();

});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    const message = $('[name=message]');
    if (!message.val()) { return }
    socket.emit('createMessage', {
        from: 'User',
        text: message.val()
    }, function () {
        message.val('')
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    locationButton.prop('disabled', true).text('Sending location...');
    fetch('https://api.ipdata.co/?api-key=test')
        .then(res => res.json()
            .then(res => {
                socket.emit('createLocationMessage', {
                    latitude: res.latitude,
                    longitude: res.longitude
                });
                locationButton.prop('disabled', false).text('Send location')
            })
        )



});
