const http = require('http');
const cluster = require('cluster');

let cpuCnt = require('os').cpus().length;

// console.log(cpuCnt);

if(cluster.isMaster){
    for(let i=0;i<cpuCnt;i++){
        cluster.fork(); // worker를 만든다.
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        cluster.fork();
        
    })
} else{
    http.createServer((req, res) => {
        console.log(process.pid, "구동");
        res.end('<h1>HELLO WORLD</h1>');
    }).listen(3001);
    
    console.log(process.pid+'번 server on');
}