var server  = require('http').createServer();
var io      = require('socket.io')(server);
var tweet={x_val:0,y_val:0,touch:''};
io.on('connection', function (socket) {  
    
		console.log("Connected "+ io.sockets.clients());
    // to make things interesting, have it send every second
    var interval = setInterval(function () {
        socket.emit('tweet', tweet);
		console.log(tweet);
    }, 7000);
	
	socket.on('tweet', function (tweet) {
        // we received a tweet from the browser
		var sweet = {x_val:tweet.x_val,y_val:tweet.y_val,touch:tweet.touch};
		socket.emit('tweet',sweet);
        console.log(sweet);
    });

    socket.on('disconnect', function () {
		console.log("Disconnected "+ io.sockets.clients());
    });
});

server.listen(3000); 