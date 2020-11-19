var socket = io.connect('http://localhost:8085');


var message = document.getElementById('message'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');


btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
    });
    message.value = "";
});


socket.on('chat', function (data) {
    output.innerHTML += data.message +'  from server';
});