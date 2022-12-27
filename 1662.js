const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
input = input[0];

const leftPart = [];
const rightPart = [];

for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
        leftPart.unshift(i);
    }
    if (input[i] === ")") {
        rightPart.push(i);
    }
}

const partLength = leftPart.length;
let changRightLimit = 0;
for (let i = 0; i < partLength; i++) {
    if (i === partLength - 1) {
        changRightLimit =
            (input[leftPart[i] - 1] - 1) * (rightPart[i] - leftPart[i] - 1 + changRightLimit);
        break;
    }
    if (input[leftPart[i] - 1] === 0) {
        changRightLimit -= 4;
    } else {
        changRightLimit =
            (input[leftPart[i] - 1] - 1) * (rightPart[i] - leftPart[i] - 1 + changRightLimit) - 3;
    }
}

if (partLength === 0) {
    console.log(input.length);
} else {
    console.log(
        input.length -
            (rightPart[rightPart.length - 1] - leftPart[leftPart.length - 1] + 2) +
            changRightLimit
    );
}
