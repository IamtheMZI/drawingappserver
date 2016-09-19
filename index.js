var server  = require('http').createServer();
var io      = require('socket.io')(server);
io.on('connection', function (socket) {  
    
		console.log("Connected "+ io.sockets.clients());
    // to make things interesting, have it send every second
	
	socket.on('tweet', function (tweet) {
        // we received a tweet from the browser
		socket.broadcast.emit('tweet',tweet);
        console.log(tweet);
    });

    socket.on('disconnect', function () {
		console.log("Disconnected "+ io.sockets.clients());
    });
});

server.listen(3000); 