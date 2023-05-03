const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const _string = input[0];

const numDividedSub = _string.split("-");

let sum = 0;
let subSum = 0;
numDividedSub.forEach((item, index) => {
    if (index == 0) {
        sum += item
            .split("+")
            .map(Number)
            .reduce((prev, cur) => prev + cur, 0);
    } else {
        subSum += item
            .split("+")
            .map(Number)
            .reduce((prev, cur) => prev + cur, 0);
    }
});
console.log(sum - subSum);
