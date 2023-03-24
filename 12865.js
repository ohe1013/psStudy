const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, K] = input.shift().split(" ").map(Number);
const w = [null];
const v = [null];
const dp = new Array(N + 1).fill(0).map((item) => new Array(K + 1).fill(0));

for (let i = 0; i < N; i++) {
    const [_w, _v] = input[i].split(" ").map(Number);
    w.push(_w);
    v.push(_v);
}
for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= K; j++) {
        if (j - w[i] >= 0) {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
        } else {
            dp[i][j] = dp[i - 1][j];
        }
    }
}
console.log(Math.max(...dp[N]));
