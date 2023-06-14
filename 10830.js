const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

//분할정복이라는건 예를들어 20번은 10번 곱한거 * 10번 곱한거
//9번은 4*4+1
//1000은 500 500 500은 250 250 250은 125 125 125는 64 64 1
//어떻게 할까? 이렇게 쪼개면서 나간다음에 값을 pop하면서 마들어 나간다

const [N, B] = input[0].split(" ").map(Number);
const rc = [];
for (let i = 0; i < N; i++) {
    rc.push(input[i + 1].split(" ").map((item) => Number(item) % 1000));
}
let temp = B;
const arr = [B];
let count = 0;

const multiplyRc = (arr1, arr2) => {
    const tempRc = new Array(N).fill(0).map((item) => new Array(N));
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            let tempVal = 0;
            for (let k = 0; k < N; k++) {
                tempVal += arr1[i][k] * arr2[k][j];
            }
            tempRc[i][j] = tempVal % 1000;
        }
    }
    return tempRc;
};

while (temp > 1) {
    if (temp / 2 > parseInt(temp / 2)) {
        count++;
    }
    temp = parseInt(temp / 2);
    arr.push(temp);
}
const obj = { 1: rc };
while (arr.length > 0) {
    const N = arr.pop();
    if (obj[N]) {
        continue;
    } else {
        let temp = multiplyRc(obj[parseInt(N / 2)], obj[parseInt(N / 2)]);
        if (N / 2 > parseInt(N / 2)) {
            temp = multiplyRc(temp, obj[1]);
        }
        obj[N] = temp;
    }
}
console.log(obj[B].map((item) => item.join(" ")).join("\n"));
