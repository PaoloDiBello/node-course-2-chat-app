
var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = $('<li></li>');
    li.text(`${formattedTime} - ${message.from} : ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${formattedTime} - ${message.from} : `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
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
