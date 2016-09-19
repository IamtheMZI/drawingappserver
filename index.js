var server  = require('http').createServer();
var io      = require('socket.io')(server);
io.on('connection', function (socket) {  
    
		console.log("Connected "+ io.sockets.clients());
    // to make things interesting, have it send every second
	
	// Initiating a connection
	socket.on('adduser', function (username,roomname) {	
		if(roomname == '') roomname = username;
		socket.username = username; // store the username in the socket session for this client
		socket.room = roomname; // store the room name in the socket session for this client
		//usernames[username] = username; // add the client's username to the global list
		socket.join(roomname); // send client to room 1
		socket.emit('tweet','you have connected to room1'); // echo to client they've connected
		socket.broadcast.to(roomname).emit('tweet', 'SERVER', username + ' has connected to this room'); // echo to room 1 that a person has connected to their room
    });	
	
	socket.on('tweet', function (data) {
		// we tell the client to execute 'tweet' with 2 parameters
		io.sockets.in(socket.room).emit('tweet', data);
	});
	
/*	socket.on('tweet', function (tweet) {
        // we received a tweet from the browser
		socket.broadcast.emit('tweet',tweet);
        console.log(tweet);
    });*/

    socket.on('disconnect', function () {
		console.log("Disconnected "+ io.sockets.clients());
    });
	
});

server.listen(3000); 