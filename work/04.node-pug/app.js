const express = require("express");
const app = express();
const port = 3000;
app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port}`);
});

// mysql.js
const mysql = require('mysql');
// createPool은 동시접속자 처리가 가능하다.
const pool = mysql.createPool({
    host : "localhost",
    port : "3307",
    user : "test",
    password : "in11202",
    database : "node",
    connectionLimit : 10
});
/* var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'test',
    port     : "3307",
    password : 'in11202',
    database : 'node'
}); */

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// 정적 루트 설정
app.use("/", express.static("./public"));

// PUG 설정
app.set("view engine", "pug"); // View Engine 지정
app.set("views", "./views"); // View가 저장된 폴더 지정
app.locals.pretty = true; // response되는 소스를 페이지소스보기에서 정렬해서 보여준다.

const users = [
    {id: 1, name:"홍길동", age:27},
    {id: 2, name:"홍길순", age:22},
    {id: 3, name:"홍길만", age:29}
]

app.get(["/pug", "/pug/:type"], (req, res)=>{
    let name = req.query.name;
    let titleChk = req.query.titleChk;
    let type = req.params.type;

    const vals = {name, title:"PUG Practice", users, titleChk};
    switch(type){
        case "include":
            res.render("include", vals);
            break;
        default:
            res.render("block", vals);
            break;
    }

});

app.get(["/api", "/api/:type"], (req, res) => {
    let type = req.params.type;
    if(!type) type="list";
    switch(type){
        case "list":
            res.json({
                result : users
            });
            break;
        default :
            break;
    }
});

app.get(["/date", "/date/:type"], (req, res)=>{
    let type=req.params.type;
    if(!type) type="ts";
    switch(type){
        case "ts":
            // res.send(new Date().getTime().toString);
            res.send('<h1>'+String(new Date().getTime())+'</h1>');
            break;
        default:
            res.send(String(new Date()));
            // res.send(new Date().toString);
            break;
    }
});

app.get("/insert-in", insertIn);
function insertIn(req, res){
    const vals = {tit:"데이터 입력", subTit:"회원가입"};
    res.render("sql/insert", vals);
}


app.post("/insert/:type", insertFn);
function insertFn(req, res){
    const type = req.params.type;
    switch(type){
        // 기본적인 mysql 처리 - createConnection()
        case "save":

            conn.connect();

            var userName = req.body.userName;
            var age = req.body.age;
            var wdate = "2019-11-03- 11:55:55";

            // var sql = `INSERT INTO users SET userName="${userName}", age="${age}", wdate="${wdate}"`;
            var sql = "INSERT INTO users SET userName=?, age=?, wdate=?";
            var sqlVals = [userName, age, wdate];
 
            // conn.query(sql, function (error, results, fields) {
            conn.query(sql, sqlVals, function (error, results, fields) {
            if (error) {
                console.log(error);             
                res.send(error);
            }
            else {
                console.log('The solution is: ', results);
                if(results.affectedRows == 1){
                    res.send("complete");
                } else{
                    res.send("fail");
                }
            }
            });
            conn.end();
 
            break;

        // 기본적인 mysql 처리 - createPool()
        case "save-pool":

            var userName = req.body.userName;
            var age = req.body.age;
            var wdate = "2019-11-03- 11:55:55";

            // var sql = `INSERT INTO users SET userName="${userName}", age="${age}", wdate="${wdate}"`;
            var sql = "INSERT INTO users SET userName=?, age=?, wdate=?";
            var sqlVals = [userName, age, wdate];

            pool.getConnection((err, connect)=>{
                if(err) console.log(err);
                else{
                    connect.query(sql, sqlVals, (err, results, field)=>{
                        if(err) console.log(err);
                        else {
                            res.json(results);
                        }
                        connect.release();
                    });                    
                }
            });

            break;

        default:
            res.send("취소");
            break;
    }
}