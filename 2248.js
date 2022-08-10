const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

// 5 3 19면

// 5자리중에서 3개 이하의 비트만 1이면 11100 11010 11001 10110 10101 10011 01110 01101 01011 00111 이게 아니다.

// 5C3 5C2 5C1 5C0 순으로 10 10 5 1 총 26이다. 
let [size,key,target] = input[0].split(' ');

let dp = Array.from(new Array(parseInt(size) +1 ), ()=> new Array(parseInt(size) +1));
let answer = '';
const dpAl = (x,y) => {
    if (x === y) return Math.pow(2,x);
    if (y === 0) return 1;
    dp[x][y] =  dpAl(x-1,y-1) + dpAl(x-1,y);
    return dp[x][y]
}
dpAl(parseInt(size),parseInt(key));
let max = dp[size-1][key];
const findVal = ( t, s , k ) => {
    console.log(t,s,k)
    if ( t > max) {
        answer+='1';
        max +=dp[s-1][k];
        findVal(t,s-1,k-1)
    } else if(t<max) {
        answer+='0'
        max = dp[s-1][k];
        findVal(t,s-1,k);
    } else {
        answer+='011'
    }
    if (k==1) return
}
findVal(target,size,key);
console.log(answer)