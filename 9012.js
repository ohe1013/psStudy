let input = require('fs').readFileSync('example.txt').toString().trim().split('\r\n'); /// /dev/stdin
let n = input.shift();
let answer = [];
const check = ( val ) => {
    let res = [];
    for(let i =0; i<val.length; i++) {
        if(val[i] === '(') res.push(val[i]);
        else{
            if (!res.pop()) return false;
        }
    }
    if(res.length !==0) return false;
    
    return true;
}
input.forEach((item) => {
    if(check(item)) {
        answer.push('YES');
    } else {
        answer.push('NO');
    }
})
console.log(answer.join('\n'))
