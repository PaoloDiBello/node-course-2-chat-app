
var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

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
