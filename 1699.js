const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let N = parseInt(input.shift());
//1 4 9 16 25 36 49 64 334 제곱까지
const dp = new Array(N + 1);
dp[0] = 0;
for (let i = 1; i <= N; i++) {
    dp[i] = i;
}
for (let i = 2; i <= N; i++) {
    for (let j = 2; j * j <= i; j++) {
        dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
}
console.log(dp[N]);
