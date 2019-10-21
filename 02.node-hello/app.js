// 경로없이 작성하면 node_modules -> express -> package.json -> index.js를 express라는 변수에 담는다.
const express=require("express");
// express가 가지고 있는 모든것을 app에 담는다.
const app=express(); // 괄호를 열고 닫는다? -> 함수를 실행한다.
const bodyParser=require("body-parser");

// 사용자 지정 모듈
const util=require('./modules/util');

// 3000번 포트로 서버를 열고 서버를 열게되면 function을 실행한다.
app.listen(3000, function(){
    console.log("http://127.0.0.1:3000");
});


// 루트 경로로 접속하면 public폴더로 접속(정적 Route)(기본 값 index)
app.use("/", express.static("./public"));
// x-www-form-urlencoded를 사용하지 않도록 설정
app.use(bodyParser.urlencoded({extended: false}));

// Router-GET
app.get('/hello',(req, res)=>{
    var name=req.query.name;
    res.send(`<h1>${name}님 반갑습니다.</h1>`);
});
app.get("/test", (req, res, next)=>{
    res.send("<h1>practice!!!</h1>");
});
// 시멘틱 방식으로 데이터를 받는다.
app.get(["/book", "/book/:id"], (req, res)=>{
    var id = req.params.id; // undefined == false
    if(!id) id=0;
    const books=[
        {id:0, name:"별주부전", desc:"용왕이 거북이의 간을..."},
        {id:0, name:"홍길동전", desc:"아버지를 아버지라..."}
    ];
    res.send(`
    <h1>${books[id].name}</h1>
    <h3>${books[id].desc}</h3>
    `);
});

app.post("/join-save", (req, res)=>{
    var userid=req.body.userid;
    var username=req.body.username;
    var wdate=new Date();
    res.send(userid+"("+username+") "+util.isoDate(wdate));
});