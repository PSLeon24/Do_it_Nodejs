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
    
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<!doctype html>");
    res.write("<html>");
    res.write("  <head>");
    res.write("    <title>응답 페이지</title>");
    res.write("  </head>");
    res.write("  <body>");
    res.write("    <h1>NodeJS로부터의 응답 페이지</h1>");
    res.write("  </body>");
    res.write("</html>");
    res.end()
});

// Server exit event process
server.on('close', function() {
    console.log('the server exited...')
});