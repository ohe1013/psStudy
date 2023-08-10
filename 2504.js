const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filePath).toString().split("");
function solution(input) {
    let stack = [];
    let count1 = 0;
    let count2 = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "(") {
            stack.push("(");
            count1++;
        }
        if (input[i] === "[") {
            stack.push("[");
            count2++;
        }
        if (input[i] === "]") {
            count2--;
            if (count2 < 0) {
                return 0;
            }
            if (stack[stack.length - 1] === "[") {
                stack[stack.length - 1] = 3;
            } else {
                let num = 0;
                while (stack[stack.length - 1] !== "[") {
                    num += stack.pop();
                    console.log(num);
                }
                stack[stack.length - 1] = num * 3;
            }
        }
        if (input[i] === ")") {
            count1--;
            if (count1 < 0) {
                return 0;
            }
            if (stack[stack.length - 1] === "(") {
                stack[stack.length - 1] = 2;
            } else {
                let num = 0;
                while (stack[stack.length - 1] !== "(") {
                    num += stack.pop();
                }
                stack[stack.length - 1] = num * 2;
            }
        }
    }

    if (count1 > 0 || count2 > 2 || stack.length === 0) {
        return 0;
    } else {
        return stack.reduce((a, b) => a + b);
    }
}

console.log(solution(input));
