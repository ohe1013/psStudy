const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

/*
    내분점이 의미가 있냐 없냐로 접근하면 좀 더 쉬울 것 같다.
    아니다 그냥 각 갯수를 만드는 가장 비싼 방법으로 접근하는게 제일 좋겠다.
    dp[i] = Math.max(dp[i-val[i]]+val[i])
*/
const N = parseInt(input.shift());

const arr = [0, ...input[0].split(" ").map(Number)];
const dp = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
    let max = arr[i];
    for (let j = 1; j < i; j++) {
        if (i % j === 0) {
            max = max > dp[j] * (i / j) ? max : dp[j] * (i / j);
        }
        max = max > dp[i - j] + dp[j] ? max : dp[i - j] + dp[j];
    }
    dp[i] = max;
}
console.log(dp[N]);
