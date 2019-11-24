
/* const interval = setInterval(() => {
    console.log("hhh");
    
}, 2000); */

/* const interval2 = setImmediate(() => {
    console.log("!!!");
});
 */

console.time("측정");
 for(var i=0;i<100000000;i++){

 }
console.timeEnd("측정");

console.error("error");


const obj = {
    name: '홍길동',
    summary: {
        age: 25
    }
}
console.log(obj);
console.dir(obj);

const os = require('os');
// 운영체제 정보
console.log(os.arch());
console.log(os.platform());
console.log(os.type());
console.log(os.uptime());
console.log(os.hostname());
console.log(os.release());

// 경로
console.log(os.homedir());
console.log(os.tmpdir());
// CPU
console.log(os.cpus());
console.log(os.cpus().length);
// 메모리 정보
console.log(os.freemem());
console.log(os.totalmem());

console.clear();

const path = require('path');
const fileStr = __filename;
console.log("dirname:", path.dirname(fileStr));
console.log("extname:", path.extname(fileStr));
console.log("basename:", path.basename(fileStr));
console.log("", path.parse(fileStr));

const parse = path.parse(fileStr);
const str = path.format(parse);
console.log("str:", str);

console.log(path.normalize("C:\\Users\\hi\\Documents\\weekend\\///\\Node.js\\work\\07.node"));


console.log("path:",path.join(path.dirname(fileStr), path.basename(fileStr)));

console.clear();


/* url */
const url = require('url');
const querystring = require('querystring');
const myurl = new URL('https://nodejs.org/dist/latest-v12.x/docs/api/url.html?aa=bb&name=innee');

console.log(myurl);
console.log("!!!", url.format(myurl));

const urlStr = 'https://nodejs.org/dist/latest-v12.x/docs/api/url.html#url_url_pathname';
const parseUrl = url.parse(urlStr);
console.log(parseUrl);

console.clear();

console.log(myurl.searchParams);
console.log(myurl.searchParams.keys());
console.log(myurl.searchParams.values());

myurl.searchParams.append('test', 'tt');
console.log(myurl.searchParams);
console.log(url.format(myurl));

myurl.searchParams.delete('aa');
console.log(myurl.searchParams);
console.log(url.format(myurl));
console.log(myurl.searchParams.toString());

console.log(querystring.parse(parseUrl.query));
console.clear();