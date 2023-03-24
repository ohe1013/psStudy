const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M, R] = input.shift().split(" ").map(Number);
let originArr = [];
for (let i = 0; i < N; i++) {
    originArr.push(input[i].split(" ").map(Number));
}
/*
    00 04   11 13 
    05 45   14 34
    55 51   44 42
    50 10   41 21
*/

const depth = Math.min(N, M) / 2;
const makeArr = (depth) => {
    const temp = [];
    for (let i = depth; i < M - depth - 1; i++) {
        temp.push(originArr[depth][i]);
    }
    for (let i = depth; i < N - depth - 1; i++) {
        temp.push(originArr[i][M - depth - 1]);
    }
    for (let i = M - depth - 1; i > depth; i--) {
        temp.push(originArr[N - depth - 1][i]);
    }
    for (let i = N - depth - 1; i > depth; i--) {
        temp.push(originArr[i][depth]);
    }
    return temp;
};
let count = 0;
const arrs = [];
while (depth != count) {
    arrs.push(makeArr(count));
    count++;
}
count = 0;
while (count != R) {
    arrs.forEach((arr) => {
        arr.push(arr.shift());
    });
    count++;
}
const makeOrigin = (arr, depth) => {
    let count = 0;
    for (let i = depth; i < M - depth - 1; i++) {
        originArr[depth][i] = arr[count];
        count++;
    }
    for (let i = depth; i < N - depth - 1; i++) {
        originArr[i][M - depth - 1] = arr[count];
        count++;
    }
    for (let i = M - depth - 1; i > depth; i--) {
        originArr[N - depth - 1][i] = arr[count];
        count++;
    }
    for (let i = N - depth - 1; i > depth; i--) {
        originArr[i][depth] = arr[count];
        count++;
    }
};
count = 0;
arrs.forEach((arr, idx) => {
    makeOrigin(arr, idx);
});
count++;
let answer = "";
originArr.forEach((item) => {
    answer += item.join(" ");
    answer = answer + "\n";
});
console.log(answer);
