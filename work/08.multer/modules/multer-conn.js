const multer  = require('multer')
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, getPath());
  },
  filename: function (req, file, cb) {
    const saveFile = getFile(file.originalname); //{} -> originalname -> 1912-1233333-99.jpg
    cb(null, saveFile.filename);
  }
})

const allowExt = ['.jpg', '.png', 'jpeg', '.gif', '.zip', '.pdf']
const chkFile = function(req, file, cb){
    const ext = path.extname(file.originalname).toLowerCase();
    if(allowExt.indexOf(ext)>-1){
        req.isFileValidate = true;
        cb(null, true);
    } else{
        req.isFileValidate = false;
        cb(null, false);
    }
}

const upload = multer({storage, fileFilter: chkFile});
function getPath(){
  const newPath = path.join(__dirname, `../public/uploads/${makePath()}`);
  if(!fs.existsSync(newPath)){
    fs.mkdirSync(newPath);
  }
  return newPath; // 1912
}
function makePath(){
  const d= new Date();
  const year = String(d.getFullYear()).substr(2); // 19
  const month = (d.getMonth() + 1 < 10)?"0"+(d.getMonth()+1):d.getMonth()+1
  return year + month;
}

function getFile(oriFile){
  const ext = path.extname(oriFile); 
  const fname = path.basename(oriFile, ext);
  const f1 = makePath();
  const f2 = Date.now(); // timestamp
  const f3 = Math.floor(Math.random() * 90 + 10);
  const filename = f1+"-"+f2+"-"+f3+ext;
  return {oriFile, ext, fname, filename};
}

module.exports = {upload}