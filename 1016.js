const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [min, max] = input[0].split(" ").map(Number);

const start = 2;

const end = parseInt(Math.sqrt(max));
let arr = [];
let boolArr = {};
let count = max - min + 1;

for (let i = min; i <= max; i++) {
    arr.push(i);
    boolArr[i] = false;
}

for (let i = start; i <= end; i++) {
    let temp = i * i;
    let sNum = parseInt(min / temp);
    if (min % temp !== 0) sNum += 1;

    while (sNum * temp <= max) {
        if (boolArr[sNum * temp] === false) {
            boolArr[sNum * temp] = true;
            count--;x
        }
        sNum++;
    }
}
console.log(count);
