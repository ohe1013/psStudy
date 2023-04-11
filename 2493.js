const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let [N, ...tops] = fs.readFileSync(filePath).toString().trim().split(splitType);

let topArr = tops[0].split(" ").map(Number);
let topIdx = [0];
let topHArr = [0];
const answer = [];
topArr.forEach((top, idx) => {
    let temp = 1;
    while (topHArr.length > 0) {
        if (topHArr[topHArr.length - 1] > top) {
            topHArr.push(top);
            answer.push(topIdx[topIdx.length - 1]);
            topIdx.push(idx + 1);
            temp = 1;
            break;
        } else {
            topHArr.pop();
            topIdx.pop();
            temp = 0;
        }
    }
    if (temp == 0) answer.push(0);
    topHArr.push(top);
    topIdx.push(idx + 1);
});
console.log(answer.join(" "));
