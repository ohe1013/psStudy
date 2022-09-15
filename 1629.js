const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [A,B,C] = input[0].split(' ').map(Number);

// C로 나눈다는건 C로 N번 곱해지고 나머지값만큼 더하면된다. 여기서 N은 중요하지않다. (A) * (A) * (A) 는 (C*N + b) * (C*N + b) .. 로 바꿀 수 있다. 이러고나면 b^B를 같은 방식으로 구한다.


let temp = 1;

for( let i = 0; i< B; i++ ){
    temp *= A;
    let N = parseInt(temp/C);
    let b = temp - C*N;
    temp =b;
}
console.log(temp)