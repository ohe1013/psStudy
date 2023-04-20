const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());
const dp = [];
dp.push([parseInt(input.shift())]);
input.forEach((line, idx) => {
    const temp = [];
    const li = line.split(" ").map(Number);
    li.forEach((item, index) => {
        if (index === 0) {
            temp.push(item + dp[idx][index]);
        } else if (index === li.length - 1) {
            temp.push(item + dp[idx][index - 1]);
        } else {
            temp.push(Math.max(item + dp[idx][index - 1], item + dp[idx][index]));
        }
    });
    dp.push(temp);
});

console.log(Math.max(...dp[N - 1]));
