const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = +input.shift();

let arr = new Array(500);

input.forEach((item) => {
    const [a, b] = item.split(" ").map(Number);
    arr[a - 1] = b;
});

arr = arr.filter((item) => item !== undefined);
const dp = new Array(501).fill(0);
arr.forEach((item) => {
    dp[item] = Math.max(...dp.slice(0, item)) + 1;
});
console.log(N - Math.max(...dp));
