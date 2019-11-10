const express = require("express");
const path = require('path');
const {sqlExec, ...db} = require(path.join(__dirname, "../modules/mysql-conn"));
const {alertLoc} = require(path.join(__dirname, "../modules/util-loc"));
const router = express.Router();

router.get("/", (req, res)=>{

    (async()=>{
        let sql = 'select * from rest order by id';
        let result = await sqlExec(sql);
        res.render("rest/crud.pug", {datas:result[0]});
    })();

})
router.post("/", (req, res)=>{
    (async()=>{
        let username = req.body.username;
        let sql = 'insert into rest set username=?, wdate=?'
        let sqlVals = [req.body.username, new Date()];
        let result = await sqlExec(sql, sqlVals);
        res.redirect("/rest");
    })();
})
router.put("/", (req, res)=>{
    (async()=>{
        let sql = 'update rest set username=? where id=?';
        let sqlVals = [req.body.username, req.body.id];
        let result = await sqlExec(sql, sqlVals);
        if(result[0].affectedRows>0) res.send(alertLoc("수정되었습니다.", "/rest"));
        else res.send(alertLoc("수정실패", "/rest"));
    })();
})
router.delete("/", (req, res)=>{
    (async()=>{
        let sql = 'delete from rest where id='+req.body.id;
        let result = await sqlExec(sql);
        if(result[0].affectedRows>0) res.send(alertLoc("삭제되었습니다.", "/rest"));
        else res.send(alertLoc("삭제실패", "/rest"));
    })();
})

module.exports = router;