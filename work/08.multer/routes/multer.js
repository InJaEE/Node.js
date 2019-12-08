var express = require('express');
var router = express.Router();
const {upload} = require('../modules/multer-conn');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('multer-list', { title: 'Express' });
});

router.post('/', upload.single('img'), (req, res, next) => {
  if(req.isFileValidate) res.json(req.file);
  else res.send("잘못된 확장자입니다.")
})

module.exports = router;
