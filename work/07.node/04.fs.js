const fs = require('fs');


let txt = '19년 11월 24일 15시 17분';
fs.writeFile('./readme.txt', txt, (err)=>{
    if(err) throw err;
});

fs.readFile('./readme.txt', (err, result) => {
    console.log(result.toString());
})


fs.writeFileSync('./readme2.txt', Date.now());

let result = fs.readFileSync('./readme2.txt');
console.log("!!", result.toString());

/* 
fs.readFile()
fs.writeFile()
fs.open()
fs.mkdir()
fs.opendir()
fs.rename()
fs.unlink()
fs.copyFile()
*/