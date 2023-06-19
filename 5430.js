const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = +input.shift();
const answer = [];

const currentFunc = (i) => {
    if (i % 2 === 1) {
        return "shift";
    } else {
        return "pop";
    }
};

const doFun = (arr, funPipe, arrLen) => {
    let funIdx = 0;
    let shiftIdx = 0;
    let popIdx = arrLen;
    const currentArr = [...arr];

    for (let i = 0; i < funPipe.length; i++) {
        if (funPipe[i] === "R") {
            funIdx++;
        } else {
            const operationType = currentFunc(funIdx);
            if (operationType === "pop") {
                shiftIdx += 1;
            } else {
                popIdx -= 1;
            }
        }
    }
    if (shiftIdx > popIdx) return null;
    const slicedArr = currentArr.slice(shiftIdx, popIdx);
    if (currentFunc(funIdx) === "pop") return slicedArr;
    else return slicedArr.reverse();
};
for (let i = 0; i < N; i++) {
    const currentIdx = i * 3;
    const funPipe = input[currentIdx];
    const arrLen = input[currentIdx + 1];
    const arr = JSON.parse(input[currentIdx + 2]);
    answer.push(doFun(arr, funPipe, arrLen));
}
const _answer = answer
    .map((item) => {
        if (item === null) return "error";
        else {
            return JSON.stringify(item);
        }
    })
    .join("\n");

console.log(_answer);
