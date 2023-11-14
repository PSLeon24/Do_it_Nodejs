// Express 기본 모듈 불러오기
var express = require('express'),
    http = require('http'),
    path = require('path');

// Express 미들웨어 불러오기
var bodyParser = require('body-parser'),
    static = require('serve-static');

var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var expressSession = require('express-session');

var multer = require('multer');
var fs = require('fs');

var cors = require('cors');

// 익스프레스 객체 생성
var app = express();

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 applicaiton/json 파싱
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uplodas', static(path.join(__dirname, 'uploads')));

app.use(cookieParser());

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

app.use(cors());

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname + Date.now());
    }
});

var router = express.Router();

router.route('/process/photo').post(upload.array('photo',1) , (req,res) => {
    console.log('/process/photo 호출됨.');
  
    try{
      const files = req.files;
  
      console.log('-------업로드 된 첫번째 파일 정보-------');
      console.dir(req.files[0]);
      console.log('--------');
  
      //현재의 파일 정보를 저장할 변수 선언
      let originalname = '',
      filename = '',
      mimetype = '',
      size = 0;
  
      if(Array.isArray(files)) { // 배열에 들ㅇ가 있는 경우 (설정에서 1개의 파일도 배열에 넣ㄱ 했음)
        console.log('배열에 들어있는 파일 갯수 : %d', files.length);
  
        for(let index=0; index<files.length; index++){
          originalname = files[index].originalname;
          filename = files[index].filename;
          mimetype = files[index].mimetype;
          size =  files[index].size;
        }
      } else { // 배열에 들어가 있지 않은 경우(현재설정에서는 해당 없음)
        console.log('파일 갯수 : 1');
  
        originalname = files[index].originalname;
        filename = files[index].name;
        mimetype = files[index].mimetype;
        size =  files[index].size;
      }
  
      console.log('현재 파일 정보 : ',originalname,',',filename,',',mimetype,',',size);
  
      //클라이언트에 응답 전송
      res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
      res.write('<h1>파일 업로드 성공</h1>');
      res.write('<hr/>');
      res.write('<div><p>원본파일 이름 : '+originalname+' -> 저장 파일명 : '+filename+'</p></div>');
      res.write('<div><p>mimetype : '+mimetype+'</p></div>');
      res.write('<div><p>파일크기 : '+size+'</p></div>');
      res.write('<br><br><a href="/public/photo.html">photo.html이동하기</a>');
      res.end();
  
    } catch(err) {
      console.dir(err.stack);
    }
  });

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if (req.session.user) {
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');


        res.redirect('/public/product.html');
    } else {
        req.session.user = {
            id: paramId,
            name: '소녀시대',
            authorized: true
        };

    }

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write('<h1>로그인 성공.</h1>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>ParamPassword : ' + paramPassword + '</p></div>');
    res.write("<br><br><a href='/public/product.html'>상품 페이지로 돌아가기</a>");
    res.end();
});

router.route('/process/logout').get(function(req, res) {
    console.log('/process/logout is called');

    if (req.session.user) {
        console.log('로그아웃합니다.');

        req.session.destroy(function (err) {
            if (err) throw err;

            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/public/login2.html');
        });
    } else {
        console.log('아직 로그인되어 있지 않습니다.');

        res.redirect('/public/login2.html');
    }
});

router.route('/process/users/:id').get(function(req, res) {
    console.log('/progress/users/:id 처리함');

    var paramId = req.params.id;

    console.log('/process/users와 토큰 %s를 이용해 처리함', paramId);

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param Id : ' + paramId + '</p></div>');
    res.end();
});

router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 호출됨');

    res.cookie('user', {
        id: 'mike',
        name: '소녀시대',
        authorized: true
    });

    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie is called');

    res.send(req.cookies);
})

router.route('/process/product').get(function(req, res) {
    console.log('/process/product is called');

    if (req.session.user) {
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
})

app.use('/', router);

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});