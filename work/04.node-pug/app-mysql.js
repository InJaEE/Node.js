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

        default:
            break;
    }
}

// Router Callback - POST
function userPost(req, res){
    const type = req.params.type;
    switch(type){
        case "save":
            const userName = req.body.userName;
            const age = req.body.age;

            (async()=>{
                let sql = "INSERT INTO users SET userName=?, age=?, wdate=?";
                let sqlVals = [userName, age, isoDate(new Date())]
                let result = await sqlExec(sql, sqlVals);  
                res.send(alertLoc("데이터가 저장되었습니다.", "/user/li"));
            })(); // 즉시 실행함수로 async/await 사용

            break;
        default:
            break;
    }
}