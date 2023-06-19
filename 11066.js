const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = +input.shift();
const answer = [];
const dp = new Array(501).fill(0).map((data) => new Array(501).fill(0));

/**
 *
 * @param {Number} size
 * @param {Array} arr
 */
const solution = (size, arr) => {
    const sum = new Array(size).fill(0);
    sum[0] = 0;
    for (let i = 1; i <= size; i++) {
        sum[i] = sum[i - 1] + arr[i - 1];
    }
    for (let i = 1; i < size; i++) {
        for (let j = 1; j + i <= size; j++) {
            const k = j + i;
            dp[j][k] = 100000000;
            for (let mid = j; mid < k; mid++) {
                dp[j][k] = Math.min(dp[j][k], dp[j][mid] + dp[mid + 1][k] + sum[k] - sum[j - 1]);
            }
        }
    }
    return dp[1][size];
};

for (let i = 0; i < N * 2; i += 2) {
    const size = +input[i];
    const arr = input[i + 1].split(" ").map(Number);
    answer.push(solution(size, arr));
}
console.log(answer.join("\n"));
/**
 * d01 d12 d23 d34 d45 d56
 * d02=> d00 d12 d01 d22 d13=> d11 d23 d12 d33 d24 d35 d46
 * d03=> d00 d13 -  d01 d23 - d02 d33, d14 d25 d36
 */
