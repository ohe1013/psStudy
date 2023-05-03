const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());
const arr = input
    .shift()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
const dict = {};
arr.forEach((item) => {
    if (dict[item] === undefined) {
        dict[item] = 1;
    } else {
        dict[item] = dict[item] + 1;
    }
});

const sumSet = new Set();

for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
        let count = 0;
        if (arr[i] === 0) count++;
        if (arr[j] === 0) count++;
        if (dict[arr[i] + arr[j]] > count) sumSet.add(arr[i] + arr[j]);
    }
}
let answer = 0;
for (let val of sumSet) {
    answer += dict[val] ?? 0;
}
console.log(answer);
