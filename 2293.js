const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const dp = new Array(100000).fill(0);

const [N, K] = input.shift().split(" ").map(Number);
const [...coins] = input.map(Number);

coins.forEach((coin) => {
    dp[coin] = 1;
});
for (let i = 1; i <= K; i++) {
    for (let coin of coins) {
        if (i - coin >= 0) {
            dp[i] = Math.max(dp[i - coin] + 1, dp[i]);
        }
    }
}
console.log(dp[K]);
