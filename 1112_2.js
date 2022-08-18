const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const mod = ( n, b) => {
    let r = n % Math.abs(b);
    if(r<0) r+=Math.abs(b);
    return r;
}
const base = (n,b, r) => {
    
    let na = b > 0 ? Math.abs(n): n;
    let t;
    let c = 0;
    while(na) {
        t= mod(na,b);
        na= (na -t)/b;
        r[c++] = t;
    }
    if(!c) r[c++]='0';
    return (b>0 && n<0);
}

let [n,b] = input[0].split(' ').map(Number);
let r = new Array();
let m = base(n,b,r);
let ans = ''
if(m) {
    ans = '-';
    for(let i=r.length-1;i>=0;i--){
        ans += r[i];
    }
} else {
    ans = '';
    for(let i=r.length-1;i>=0;i--){
        ans += r[i];
    }
}

console.log(ans)