const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let [v, n] = input[0].split(' ').map(Number);
if (v===0) return console.log(0);
let _ = [];

const makeMinusNotation = ( v , n) => {
    if (v === 0) return;
    if ( v<0 && n<0) {
        if (Math.abs(v%n) ===0){
            _.push(v%n);
            v= (v- (v%n))/n;
        } else {
            _.push(v%n - n);
            v = (v - (v%n-n)) / n;
        }
    }
    else{
        _.push(v%n);
        v = parseInt(v/n);
    }
    makeMinusNotation(v,n)
}

makeMinusNotation(v,n);
let ans = '';


for (let i=0; i<_.length; i++){
    ans= Math.abs(_[i]) +ans;
}
if (_[0] < 0) {
    ans = '-'+ans;
}

console.log(parseInt(ans));