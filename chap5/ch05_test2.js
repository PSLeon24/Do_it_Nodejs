var http = require('http');

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
    console.log('web server started: %d', port);
});

// Client connection event process
server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다.: %s %d', addr.address, addr.port);
});

// Client request event process
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');
    console.dir(req);
});

// Server exit event process
server.on('close', function() {
    console.log('the server exited...')
});