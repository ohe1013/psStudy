const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input[0]);
//dp[N] = ( dp[N - 2] * dp[2] ) + ( dp[N - 4] * 2 ) + ( dp[N - 6] * 2) + ( dp[N - 8] * 2 ) + ... + ( dp[0] * 2 )
const dp = new Array(31).fill(0);
dp[0] = 1;
dp[2] = 3;
for (let i = 4; i <= N; i += 2) {
    let val = 0;
    for (let j = 0; j < i; j++) {
        if (j % 2 === 0 && j === i - 2) {
            val += dp[j] * dp[2];
            continue;
        }
        if (j % 2 === 0) val += dp[j] * 2;
    }
    dp[i] = val;
}
console.log(dp[N]);
