const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const N = parseInt(input[0]);
const numArr = input[1].split(" ").map(Number);
const upper = "1".repeat(N).split("").map(Number); //상승
const lower = new Array(N).fill(1); //하락

for (let i = 0; i < N; i++) {
    for (j = 0; j < i; j++) {
        if (numArr[i] > numArr[j]) {
            upper[i] = Math.max(upper[j] + 1, upper[i]);
        }
    }
}
for (let i = N - 1; i >= 0; i--) {
    for (j = N - 1; j >= i; j--) {
        if (numArr[i] > numArr[j]) {
            lower[i] = Math.max(lower[j] + 1, lower[i]);
        }
    }
}
let answer = 0;
for (let i = 0; i < N; i++) {
    answer = answer > upper[i] + lower[i] - 1 ? answer : upper[i] + lower[i] - 1;
}
console.log(answer);
