const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [total, popCount] = input[0].split(" ").map(Number);

const num = input[1];

const availableLen = total - popCount;

let stack = [];

const updateStack = (arr, num, lastLen) => {
    while (arr.length > 0) {
        const len = arr.length;
        if (num > arr[len - 1] && len + lastLen > availableLen) {
            arr.pop();
        } else {
            break;
        }
    }
};

for (let i = 0; i < total; i++) {
    updateStack(stack, num[i], total - i);
    stack.push(num[i]);
}
const leftLen = stack.length - availableLen;
if (leftLen > 0) {
    stack = stack.slice(0, stack.length - leftLen);
}
console.log(stack.join(""));
