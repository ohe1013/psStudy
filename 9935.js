const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let [_string, bomb] = input;
let strArr = _string.split("");
const bomArr = bomb.split("");
while (true) {
    let j = 0;
    const stack = [];
    for (let word of strArr) {
        if (word === bomArr[0]) {
            j = 1;
        } else if (word === bomArr[j]) {
            j++;
        } else {
            j = 0;
        }
        stack.push(word);
        if (j === bomArr.length) {
            for (let k = 0; k < bomArr.length; k++) {
                stack.pop();
            }
        }
    }
    const newStrArr = [...stack];
    if (JSON.stringify(strArr) === JSON.stringify(newStrArr)) {
        strArr = newStrArr;
        break;
    }
    if (newStrArr.length === 0) {
        strArr = ["F", "R", "U", "L", "A"];
        break;
    }
    strArr = newStrArr;
}
console.log(strArr.join(""));
