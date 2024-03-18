const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

let [N, S] = input[0].split(" ").map(Number);

const numArr = input[1].split(" ").map(Number);

let sum = numArr.reduce((prev, cur) => prev + cur, 0);
if (Math.max(...numArr) >= S) return console.log(1);

if (sum < S) return console.log(0);
let left = 0;
let right = 0;
sum = numArr[0];
let ans = N;
while (true) {
    if (sum >= S) {
        ans = Math.min(ans, right - left + 1);
        sum -= numArr[left];
        left++;
    } else {
        right++;
        if (right === N) break;
        sum += numArr[right];
    }
}

console.log(ans);
