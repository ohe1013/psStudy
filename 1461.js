const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);

const arr = input.shift().split(" ").map(Number);
const absArr = arr.map((item) => Math.abs(item));
const answer = [];
let value = 0;
while (arr.length > 0) {
    const tempArr = [];
    const maxValue = Math.max(...absArr);
    const maxIndex = absArr.indexOf(maxValue);
    const realMaxValue = arr[maxIndex];
    tempArr.push(realMaxValue > 0 ? realMaxValue : -realMaxValue);
    arr.splice(maxIndex, 1);
    absArr.splice(maxIndex, 1);
    if (realMaxValue > 0) {
        for (let i = 0; i < M - 1; i++) {
            let max = Math.max(...arr);
            let index = arr.indexOf(max);
            if (max > 0) {
                tempArr.push(max);
                arr.splice(index, 1);
                absArr.splice(index, 1);
            } else {
                break;
            }
        }
    } else {
        for (let i = 0; i < M - 1; i++) {
            let min = Math.min(...arr);
            let index = arr.indexOf(min);
            if (min < 0) {
                tempArr.push(-min);
                arr.splice(index, 1);
                absArr.splice(index, 1);
            } else {
                break;
            }
        }
    }
    answer.push(tempArr);
}
answer.forEach((item, index) => {
    if (index === 0) {
        value += Math.max(...item);
    } else {
        value += 2 * Math.max(...item);
    }
});

console.log(value);
