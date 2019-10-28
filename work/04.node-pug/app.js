const express = require("express");
const app = express();
const port = 3000;
app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port}`);
});

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
})