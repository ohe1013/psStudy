const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = Number(input[0]);

const dp = new Array(N+1).fill(0);
//1에서부터 bottom-up 해가는 방식이다.
//해당 값을 2를 곱해서 오는게 빠른지, 3을곱해서 오는게 빠른지 계속 계산한 뒤 결과출력
for( let i = 2; i <= N; i++ ){
    dp[i] = dp[i-1] +1;// 1을 더하는 경우 1번의 경우의수 추가
    if (i % 2 ===0) {
        dp[i] = Math.min(dp[i], dp[i/2] +1); //1을 더하는거랑 2를 곱하는것중에서 현재값에 가장 빨리 오는 방법은 무엇인가? 
    } 
    if (i % 3 ===0) {
        dp[i] = Math.min(dp[i], dp[i/3] +1);
    }
}

console.log(dp[N])