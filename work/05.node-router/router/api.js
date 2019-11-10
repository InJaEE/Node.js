const express = require("express");
const path = require('path');
const {sqlExec, ...db} = require(path.join(__dirname, "../modules/mysql-conn"));
const {alertLoc} = require(path.join(__dirname, "../modules/util-loc"));
const router = express.Router();

router.get("/", (req, res)=>{

    (async()=>{
        let sql = 'select * from rest order by id';
        let result = await sqlExec(sql);
        res.json(result[0]);
    })();

})
router.post("/", (req, res)=>{
    (async()=>{
        let sql = 'insert into rest set username=?, wdate=?'
        let sqlVals = [username, new Date()];
        let result = await sqlExec(sql, sqlVals);
        res.json(result[0]);
    })();
})
router.put("/", (req, res)=>{
    (async()=>{
        let sql = 'update rest set username=? where id=?';
        let sqlVals = [req.body.username, req.body.id];
        let result = await sqlExec(sql, sqlVals);
        res.json(result[0]);
    })();
})
router.delete("/", (req, res)=>{
    (async()=>{
        let sql = 'delete from rest where id='+req.body.id;
        let result = await sqlExec(sql);
        res.json(result[0]);
    })();
})

module.exports = router;