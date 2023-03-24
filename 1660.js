const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let N = parseInt(input.shift());
const DP = Array.from(Array(300000));
const triAngel = Array.from(Array(300000));
let A = 1;
let B = 3;
let C = 3;
//정사면채당 들어가는 대포알을 미리 넣어놓는 반복문, 2차 계차수열
for (let i = 0; i < 121; i++) {
    triAngel[i] = A;
    A = A + B;
    B = B + C;
    C++;
}
for (let i = 0; i < 300001; i++) {
    DP[i] = i;
}
for (let i = 1; i <= N; i++) {
    for (let j = 0; j <= 121; j++) {
        if (i < triAngel[j]) {
            break;
        }
        DP[i] = Math.min(DP[i], DP[i - triAngel[j]] + 1);
        //console.log(DP[i]);
    }
}
console.log(DP[N]);
//1 3 6 10 15 21 28

//1 4 10 20 35 56 84
//어떻게 알 수 있을까 안에 있는거로 완성시킬 수 있는지?
//아래에서부터 만들어간다? 다이나믹 프로그래밍 122개로
