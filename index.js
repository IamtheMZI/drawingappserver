var server  = require('http').createServer();
var io      = require('socket.io')(server);
io.on('connection', function (socket) {  
    var tweet = {user: "nodesource", txt: "Hello, world!"};
		console.log("Connected "+ io.sockets.clients());
    // to make things interesting, have it send every second
    var interval = setInterval(function () {
        socket.emit('tweet', tweet);
		//console.log(tweet);
    }, 7000);
	
	socket.on('tweet', function (tweet) {
        // we received a tweet from the browser

        console.log(tweet);
    });

    socket.on('disconnect', function () {
		console.log("Disconnected "+ io.sockets.clients());
        clearInterval(interval);
    });
});

server.listen(3000); 