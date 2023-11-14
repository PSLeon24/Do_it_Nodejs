var express = require('express');
var router = express.Router();
var http = require('http');
var path = require('path');
var multer = require('multer');
var ejs = require('ejs');

var bodyParser = require('body-parser');
var static = require('serve-static');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 파일 저장 경로 설정
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 업로드된 파일명 변경
    }
});

var upload = multer({ storage: storage });

app.use('/public', static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('memoForm');
});

// 파일 업로드 처리 미들웨어
app.post('/submit', upload.single('file'), function(req, res, next) {
    try {
        if (!req.file) {
            throw new Error('파일이 업로드되지 않았습니다.');
        }

        console.log('첫 번째 미들웨어에서 요청을 처리함.');
        var paramMemo = req.body.memo || req.query.memo;
        var uploadedFile = req.file; // 업로드된 파일 정보

        res.render('memoResult', { paramMemo: paramMemo, uploadedFile: uploadedFile });
    } catch (err) {
        console.error('파일 업로드 에러:', err.message);
        res.status(500).send('파일 업로드에 실패했습니다.');
    }
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express로 웹 서버를 실행함 : ' + app.get('port'));
});
