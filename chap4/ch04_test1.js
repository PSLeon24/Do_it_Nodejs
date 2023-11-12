var url = require('url');
var querystring = require('querystring');

var curURL = url.parse('https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty');

var curStr = url.format(curURL);

console.log('주소 문자열: %s', curStr);
console.dir(curURL);

var param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값: %s', param.query);
console.log('요청 파라미터 중 where의 값: %s', param.where);
console.log('요청 파라미터 중 sm의 값: %s', param.sm);
console.log('원본 요청 파라미터: %s', querystring.stringify(param));