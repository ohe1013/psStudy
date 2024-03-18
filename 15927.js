const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

/**
 * 가장 긴 회문을 찾고 -1을 하던가,
 * 전체가 회문이 아닌걸 찾던가.
 */
const strArr = input[0].split("");
const arrLen = strArr.length;
let isAll = true;
if (new Set(strArr).size === 1) return console.log(-1);
for (let i = 0; i < arrLen / 2; i++) {
    const left = strArr[i];
    const right = strArr[arrLen - i - 1];
    if (left != right) {
        isAll = false;
        break;
    }
}
if (isAll === true) return console.log(arrLen - 1);
else return console.log(arrLen);
