/* Node Express */
const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const httpErrors = require('http-errors');

/* node_modules */
const bodyParser = require("body-parser"); // POST방식으로 접근된 데이터를 req.body로 쉽게 접근할 수 있다.
const methodOverride = require("method-override");
const morgan = require("morgan");
const rfs = require('rotating-file-stream')

app.listen(3000, ()=>{
    console.log("http://127.0.0.1:3000");
});

// console.log(__dirname); // 경로
// console.log(__filename); // 파일 이름을 포함한 경로

/* Express Basic Setting */
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.locals.pretty = true;

/* Morgan Setting */
var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory) // 폴더가 존재하면 넘어가고 없으면 만들어라
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  }); 
app.use(morgan('combined', { stream: accessLogStream }))

/* Method-Override Setting */
app.use(methodOverride('X-HTTP-Method')) //          Microsoft
app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
app.use(methodOverride('X-Method-Override')) //      IBM
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
/* Router Setting */
const boardRouter = require(path.join(__dirname, "./router/board"));
const adminRouter = require(path.join(__dirname, "./router/admin"));
const restRouter = require(path.join(__dirname, "./router/rest"));
const apiRouter = require(path.join(__dirname, "./router/api"));
const seqRouter = require(path.join(__dirname, "./router/seq"));

app.use("/board", boardRouter); // board로 접속하면 boardRouter가 역할을 수행한다.
app.use("/admin", adminRouter);
app.use("/rest", restRouter);
app.use("/api", apiRouter);
app.use("/seq", seqRouter);

/* 예외처리 */
app.use((err, req, res, next) => {
  next(httpErrors(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.render('error');
});