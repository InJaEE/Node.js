const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("<h1>BOADRD-ROOT</h1>")
})

router.get("/list", (req, res)=>{
    res.send("<h1>BOADRD-LIST</h1>")
})

module.exports = router;