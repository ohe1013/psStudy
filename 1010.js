const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());
const dp = new Array(31).fill(0).map((item) => new Array(31).fill(null));
for (let i = 0; i <= 30; i++) {
    for (let j = i; j <= 30; j++) {
        if (i === 0) {
            dp[i][j] = 0;
            continue;
        }
        if (i === j) {
            dp[i][j] = 1;
            continue;
        }
        if (i === 1) {
            dp[i][j] = j;
            continue;
        }
        let sum = 0;
        for (let k = j - 1; k >= i - 1; k--) {
            sum += dp[i - 1][k];
        }
        dp[i][j] = sum;
    }
}

for (let _i = 0; _i < N; _i++) {
    const [i, j] = input[_i].split(" ").map(Number);
    console.log(dp[i][j]);
}
