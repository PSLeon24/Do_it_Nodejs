var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    var filename = '뚱이.jpeg';
    fs.readFile(filename, function(err, data) {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(data);
        res.end()
    })
});

var port = 3000;
server.listen(port, function() {
    console.log('web server started: %d', port);
});

// Client connection event process
server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다.: %s %d', addr.address, addr.port);
});

// Server exit event process
server.on('close', function() {
    console.log('the server exited...')
});