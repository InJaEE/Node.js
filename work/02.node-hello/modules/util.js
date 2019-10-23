const zp = n=>n<10?"0"+n:n;

const isoDate = (d)=>{
    if(!d) d = new Date();
    // console.log(d)
    // console.log(!d);
    
    var year = d.getFullYear();
    var month = zp(d.getMonth()+1);
    var day = zp(d.getDate());
    var hour = zp(d.getHours());
    var min = zp(d.getMinutes());
    var sec = zp(d.getSeconds());
    return year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
}

module.exports = {
    zp, isoDate
    /* 같은 의미
    zp:zp,
    isoDate:isoDate
    */
}