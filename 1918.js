const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

const line = input[0].split("");
const dict = {
    "*": 2,
    "+": 1,
    "-": 1,
    "/": 2,
};
const stack = [];
const ans = [];
line.forEach((item) => {
    if (item === "(") {
        stack.push("(");
    } else if (item === ")") {
        while (true) {
            const popVal = stack.pop();
            if (popVal === "(") break;
            else {
                ans.push(popVal);
            }
        }
    } else if (dict[item]) {
        while (stack.length > 0) {
            const popVal = stack.pop();
            if (dict[popVal] >= dict[item]) {
                ans.push(popVal);
            } else {
                stack.push(popVal);
                break;
            }
        }
        stack.push(item);
    } else {
        ans.push(item);
    }
});

console.log(ans.join("") + stack.reverse().join(""));
