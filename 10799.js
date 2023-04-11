const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let bars = [];
let answer = 0;
let a = new Set();
let len = 0;
for (let i = 0; i < input[0].length; i++) {
    if (input[0][i] === "(") {
        // bars.push(i);

        len = len + 1;
    } else {
        if (input[0][i - 1] === "(") {
            //bars.pop();
            //bars.forEach((bar) => a.add(bar));
            //answer += bars.length;
            len = len - 1;
            answer += len;
        } else {
            //bars.pop();
            a.add(i);
            len = len - 1;
        }
    }
}
console.log(answer + a.size);
