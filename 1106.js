const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [C, N] = input.shift().split(" ").map(Number);
//3원에 5명 1원에 한명 6원 2원 8명 9원 15명
//3원 1명 2원 2명 1원 3명
//이건 배열이 1차원 아닌가? 제한이 없자나 그냥 dp[원] = 사람수
const dp = new Array(C + 1).fill(0);
const _obj = {};
for (let i = 0; i < N; i++) {
    const [_w, _v] = input[i].split(" ").map(Number);
    if (_obj[_w] !== undefined) {
        _obj[_w] = _v;
    } else {
        _obj[_w] = Math.max(_v, _obj[_w]);
    }
}
console.log(_obj);
for (let i = 1; i <= C; i++) {
    for (let j = 0; j < i; j++) {}
}
