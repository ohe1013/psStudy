const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = +input.shift();

//push 앞에 더 작은것들 다 출력 끝가지 가서 남은것들 -1 출력

const arr = input[0].split(" ").map((item, idx) => [parseInt(item), idx]);
let stack = [];
const answer = new Array(N).fill(-1);

arr.forEach((item, i) => {
    while (stack.length > 0 && stack[stack.length - 1][0] < item[0]) {
        const [value, idx] = stack.pop();
        answer[idx] = item[0];
    }
    stack.push([item[0], i]);
});
console.log(answer.join(" "));
