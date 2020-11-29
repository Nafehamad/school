var socket = io.connect('http://localhost:8085/',{

    transports: ['polling'],
    secure: true,
    'force new connection' : false,
    'reconnect' : true,
    
});


var output = document.getElementById('output');


    socket.on('chat', function (data) {
        output.innerHTML+=data.course+' course is available now \n\n';
    });
    /*socket.on('connect',function(socket){
        
    })*/
    


