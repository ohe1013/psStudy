const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, K] = input[0].split(" ").map(Number);

/**
 * 6 4 인 경우에
 * 6을 3개로 만드는 경우에 0을 더한거 5를 3개로 만든 경우에 1을 더한거 4를 3개로 더한 경우에 2를 더한거 3을 3개로 더한 경우에 3을 더한거...
 * 6을 3개로 만드는 경우는 6을 2개로 만든 경우에 0을 더한거 5를 2개로 만든 경우에 1을 더한거
 * 5를 3개로 만드는 경우는 5를 2개로 만든 경우에 0을 더한거
 * 6 4 = 6 3 + 5 3 + 4 3 + 3 3 + 2 3 + 1 3 + 0 3
 * 6 3 = 6 2 + 5 2 + 4 2 + 3 2 + 2 2 + 1 2 + 0 2
 * 0 2 03 04 05 06
 * 1 2 13 14 13= 12 + 02 14 = 13+03+ 15= 14+04
 * 2 2 23= 22 + 12 + 02 24 23 + 13
 * dp[a][b] = dp[a][b-1] + dp[a-1][b-1]..... + dp[0][b-1]
 * b가 2인 경우 a+1
 * a가 0인 경우 1
 */
const dp = new Array(201).fill(0).map((item) => new Array(201).fill(0));
for (let i = 0; i <= 200; i++) {
    for (let j = 1; j <= 200; j++) {
        if (j === 1) {
            dp[i][j] = 1;
            continue;
        }
        if (i === 1) {
            dp[i][j] = j;
            continue;
        }
        if (i === 0) {
            dp[i][j] = 1;
            continue;
        }
        if (j === 2) {
            dp[i][j] = i + 1;
            continue;
        }
        let temp = 0;
        for (let k = i; k >= 0; k--) {
            temp += dp[k][j - 1];
        }
        dp[i][j] = temp % 1000000000;
    }
}

console.log(dp[N][K]);
