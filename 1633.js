const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const N = input.length;
const dp = new Array(1001).fill(0).map(() => new Array(16).fill(0).map(() => new Array(16).fill(0)));
const dfs = (idx, w, b) => {
    if (w === 15 && b === 15) return 0;
    if (idx == input.length) return 0;
    let ans = dfs(idx + 1, w, b);
    if (dp[idx][w][b] != 0) {
        return dp[idx][w][b];
    }
    if (w < 15) {
        ans = Math.max(ans, dfs(idx + 1, w + 1, b) + input[idx].split(" ").map(Number)[0]);
    }
    if (b < 15) {
        ans = Math.max(ans, dfs(idx + 1, w, b + 1) + input[idx].split(" ").map(Number)[1]);
    }
    dp[idx][w][b] = ans;
    return ans;
};
console.log(dfs(0, 0, 0));
console.log(dp[29]);
