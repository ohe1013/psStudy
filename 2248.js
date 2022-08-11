const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

// 5 3 19면

// 5자리중에서 3개 이하의 비트만 1이면 11100 11010 11001 10110 10101 10011 01110 01101 01011 00111 이게 아니다.

// 5C3 5C2 5C1 5C0 순으로 10 10 5 1 총 26이다. 
let [size,key,target] = input[0].split(' ');

let dp = Array.from(new Array(parseInt(size) +1 ), ()=> new Array(parseInt(size) +1).fill(0));
let answer = '';
dp[0][0] = 1;
for (let i =1; i<=parseInt(size); i++){
    dp[i][0] = 1;
    dp[i][i] = 1; 
}
for (let i =2; i<=parseInt(size); i++) {
    for (let j=1; j<=i; j++) {
        dp[i][j] = dp[i-1][j-1] + dp[i-1][j];
    }
}
const findVal = ( s, k , t ) => {
    if (s === 0) return;
    if (k === 0) {
        for(let i =0; i<s; i++) {
            answer +='0';
        }
        return
    }
    let sum = 0;
    for (let i=0; i<=k; i++) {
        sum+=dp[s-1][i];
    }
    if(sum > t){
        answer +='0';
        findVal(s-1,k,t);
    }else {
        answer += '1';
        findVal(s-1,k-1,t-sum);
    }
    return


}
findVal(parseInt(size),parseInt(key),parseInt(target-1));
console.log(answer)