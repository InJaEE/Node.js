const mysql = require("mysql2/promise");
const pool = mysql.createPool({
    host : "localhost",
    port : "3307",
    user : "test",
    password : "in11202",
    database : "node",
    connectionLimit : 10,
    waitForConnections : true
});

const sqlExec = async (sql, sqlVals) => {
    const connect = await pool.getConnection();
    const result = await connect.query(sql, sqlVals);
    connect.release();
    return result;
}

// async 사용안했을때 작성방법
/* const sqlExec = (sql, sqlVals) =>{
    conn.getConnection((err, connect)=>{
        connect.query(sql, sqlVals, (err, result)=>{

        })
    })
} */
module.exports={
    mysql, pool, sqlExec
};