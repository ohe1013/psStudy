const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const n = parseInt(input[0]);

const limit = Math.ceil(n / 2) + 1;

const ansArr = [];
for (let i = 1; i < limit; i++) {
    for (let j = +1; j <= limit; j++) {
        if (Math.pow(j, 2) - Math.pow(i, 2) == n) {
            ansArr.push(j);
            break;
        }
    }
}
if (ansArr.length === 0) return console.log(-1);
console.log(ansArr.join("\n"));
