var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    var filename = '뚱이.jpeg';
    var infile = fs.createReadStream(filename, {flags: 'r'});
    var filelength = 0;
    var curlength = 0;

    fs.stat(filename, function(err, stats) {
        filelength = stats.size;
    });

    res.writeHead(200, {"Content-Type": "image/png"});

    infile.on('readable', function() {
        var chunk;
        while (null != (chunk = infile.read())) {
            console.log('읽어 들인 데이터 크기: %d bytes', chunk.length);
            curlength += chunk.length;
            res.write(chunk, 'utf-8', function(err) {
                console.log('파일 부분 쓰기 완료: %d, 파일 크기: %d', curlength, filelength);
                if (curlength >= filelength) {
                    res.end();
                }
            });
        }
    });
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