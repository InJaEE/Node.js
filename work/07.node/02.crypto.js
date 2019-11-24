const crypto = require('crypto');
let sha512 = crypto.createHash('sha512').update('12334').digest('base64');
console.log(sha512);


crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt: ', salt);
    crypto.pbkdf2('1234', salt, 3179, 64, 'sha512', (err, key) => {
        console.log(key.toString('base64'));
    })
});

// console.time('암호화');
crypto.pbkdf2('1234', 'salt', 627900, 64, 'sha512', (err, key) => {
    console.log(key.toString('base64'));
    // console.timeEnd('암호화');
})

console.clear();

/* util */
const util = require('util');
const randomBytesPro = util.promisify(crypto.randomBytes);
const pbkdf2Pro = util.promisify(crypto.pbkdf2);


// promise 버전
randomBytesPro(64).then(buf => {
    const salt = buf.toString('base64');
    console.log('salt: ', salt);
    return pbkdf2Pro('1234', 'salt', 3179, 64, 'sha512');
}).then(key=>{
    console.log(key.toString('base64'));
}).catch(err=>{
    console.error(err);
});

// async/await 버전
(async()=>{
    let buf = await randomBytesPro(64);
    let salt = buf.toString('base64');
    let key = await pbkdf2Pro('1234', salt, 3179, 64, 'sha512');
    console.log(key.toString('base64'));
})();

console.clear();

const password = '1234';
const cryptoSalt = require('./modules/util-crypto');
console.log('!!!', cryptoSalt(password));
