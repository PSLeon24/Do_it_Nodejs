var express = require('express');
var router = express.Router();
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var bodyParser = require('body-parser');
var static = require('serve-static');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('memoForm');
});

app.post('/submit', function(req, res) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    var paramMemo = req.body.memo || req.query.memo;

    res.render('memoResult', { paramMemo: paramMemo });
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express로 웹 서버를 실행함 : ' + app.get('port'));
});