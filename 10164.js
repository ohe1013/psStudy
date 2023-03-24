const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M, K] = input.shift().split(" ").map(Number);

let idx = 1;
let record = [];
if (K === 0) record[0] = [0, 0];
else {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (idx === K) record.push([i, j]);
            idx++;
        }
    }
}
let dp = new Array(N + M).fill(1);
const factorial = (n) => {
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] * i;
    }
};
factorial(N + M - 1);
const answer =
    (dp[N + M - 2 - record[0][0] - record[0][1]] /
        (dp[N - 1 - record[0][0]] * dp[M - 1 - record[0][1]])) *
    (dp[record[0][0] + record[0][1]] / (dp[record[0][0]] * dp[record[0][1]]));
console.log(answer);
