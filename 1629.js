const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [A,B,C] = input[0].split(' ').map(BigInt);

// C로 나눈다는건 C로 N번 곱해지고 나머지값만큼 더하면된다. 여기서 N은 중요하지않다. 
// (A) * (A) * (A) 는 (C*N + b) * (C*N + b) .. 로 바꿀 수 있다. 이러고나면 b^B를 같은 방식으로 구한다.
// divide & conquer
// 나눠지지 않을때까지 나눈다.

const dnc = (a,b) => {
    if (b==0){
        return BigInt(1);
    }
    let temp = dnc(a,BigInt(parseInt(b/BigInt(2))));
    if ((b) % BigInt(2) == 0 ) {
        return (temp * temp % C);
    } else {
        return (temp * temp * a % C);
    }
}
console.log(parseInt(dnc(A,B)))