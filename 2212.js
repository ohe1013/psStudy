const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input[0]);

const K = parseInt(input[1]);

const recivs = input[2]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

if (K >= N) return console.log(0);
const diffs = [0];
for (let i = 1; i < recivs.length; i++) {
    diffs.push(recivs[i] - recivs[i - 1]);
}
//13'6679(14)

const answer = diffs
    .sort((a, b) => a - b)
    .reduce((prev, cur, idx) => {
        if (idx > N - K) return prev;
        else return prev + cur;
    }, 0);

console.log(answer);
