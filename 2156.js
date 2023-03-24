const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

/*
    이런 문제는 잘 생각만 해도 반은 간다.
    3개 연속이 되지 않았다는걸 어떻게 증명할 수 있나?
    최대 연속 2개라는 것
    예를들어 12 45 67 89 이렇게도 되지만
    1 34 67 
    1 3 56 이 이득일 수 있다.
    8번째 값을 넣을때
    6까지의 최대에 8로 시작할지라 
    5까지의 최대에 78로 시작할지를 정해야하는것이다.
    근데 이 경우에 처리 못하는게 2자리를 비우는 경우이다.
    그리고 7까지의 값을 이어서가는경우 이 경우는 8에서 8을 선택하는게 아닌 6까지에서 8추가할래? 5까지에서 78로 시작할래? 7까지의 최대값으로할래?
    7까지의 최대값은 5까지에서 7추가 or 4까지에서 67 or 6까지에서 8추가, 5까지에서 78 추가 반드시 이번걸 추가할래에서
    이전까지의 최대값을 이어서 쓰면 선택하지 않으면 
*/

const N = parseInt(input.shift());
const val = [0, 0, 0];
for (let i = 0; i < N; i++) {
    val.push(parseInt(input[i]));
}
const dp = new Array(N + 3).fill(0);

for (let i = 3; i < N + 3; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + val[i], dp[i - 3] + val[i] + val[i - 1]);
}
console.log(Math.max(...dp));
