const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

/*
    길이가 1인 계단수 1~9
    dp[길이][계단층] dp[길이+1][계단층 = 이전 계단층 -1 + 이전 계단층 + 1]
*/
const N = parseInt(input.shift());
const dp = new Array(100).fill(0).map(() => []);
dp[0] = [BigInt(0)];
for (let i = 0; i < 9; i++) {
    dp[0].push(BigInt(1));
}
for (let i = 1; i < N; i++) {
    for (let j = 0; j < 10; j++) {
        const uF = j + 1;
        const dF = j - 1;
        if (dF === -1) {
            dp[i][j] = BigInt(dp[i - 1][uF]);
            continue;
        }
        if (uF === 10) {
            dp[i][j] = BigInt(dp[i - 1][dF]);
            continue;
        }
        dp[i][j] = BigInt(dp[i - 1][uF]) + BigInt(dp[i - 1][dF]);
    }
}
const sum = dp[N - 1].reduce((prev, cur) => prev + cur, BigInt(0)) % BigInt(1000000000);
console.log(Number(sum));
