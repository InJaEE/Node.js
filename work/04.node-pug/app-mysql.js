const express = require("express");
const app = express();
const port = 3000;
app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port}`);
});

// node module
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// my module
/* const db = require("./modules/mysql-conn");
const mysql = db.mysql;
const pool = db.pool;
const sqlExec = db.sqlExec; */
const {mysql, pool, sqlExec} = require("./modules/mysql-conn");
const {alertLoc} = require("./modules/util-loc");
const {zp, isoDate, js2iso} = require("./modules/util-date");

app.use("/", express.static("./public"));

app.set("view engine", "pug"); 
app.set("views", "./views");
app.locals.pretty = true;

// Router - GET
app.get(["/user/:type", "/user/:type/:id"], userGet);

// Router - POST
app.post("/user/:type", userPost);

// Router Callback - GET
function userGet(req, res){
    const type = req.params.type;
    const id = req.params.id;
    switch(type){
        case "wr":
            const vals = {tit:"데이터 입력", subTit:"회원가입"};
            res.render("sql/insert", vals);
            break;
        case "li":
            (async ()=>{
                let sql = "SELECT * FROM users ORDER BY id DESC";
                let result = await sqlExec(sql);

                const vals = {tit:"데이터 출력", subTit:"회원리스트", datas:js2iso(result[0], "wdate")}
                res.render("sql/list", vals);
            })();
            break;
        case "rm":
            (async()=>{
                const sql = "DELETE FROM users WHERE id="+id;
                const result = await sqlExec(sql);
                if(result[0].affectedRows == 1) res.send(alertLoc("삭제되었습니다.", "/user/li"));
                else res.send(alertLoc("삭제 실패. 관리자에게 문의하세요.", "/user/li"));
            })();
            break;    
        case "up":
            (async ()=>{
                let sql = 'SELECT * FROM users WHERE id=?'
                let sqlVals = [req.params.id];
                let result = await sqlExec(sql, sqlVals);
                let vals = {
                    title:"데이터 수정",
                    subTit:"회원 수정",
                    datas: result[0][0]
                }
                // res.render("sql/update", {data:result[0][0]});
                res.render("sql/update", vals);
                // res.json({data:result[0]})
            })();

        default:
            break;
    }
}

// Router Callback - POST
function userPost(req, res){
    let type = req.params.type;
    let userName = req.body.userName;
    let age = req.body.age;
    let id = req.body.id;
    let sql = '';
    let sqlVals = [];
    let result = null;
    switch(type){

        case "save":
            (async()=>{
                sql = "INSERT INTO users SET userName=?, age=?, wdate=?";
                sqlVals = [userName, age, isoDate(new Date())]
                result = await sqlExec(sql, sqlVals);  
                res.send(alertLoc("데이터가 저장되었습니다.", "/user/li"));
            })(); // 즉시 실행함수로 async/await 사용

            break;
        case "update":
            (async()=>{
                sql = "UPDATE users SET userName=?, age=? WHERE id=?";
                
                sqlVals = [userName, age, id];
                result = await sqlExec(sql, sqlVals);
                if(result[0].affectedRows>0) res.send(alertLoc("수정되었습니다.", "/user/li"));
                else res.send(alertLoc("수정 실패", "/user/li"));
                // res.json(result);
                // res.send(alertLoc("데이터가 수정되었습니다.", "/user/li"));

            })(); // 즉시 실행함수로 async/await 사용

            break;
        default:
            break;
    }
}