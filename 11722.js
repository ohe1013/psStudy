/*

예를 들어, 수열 A = {10, 30, 10, 20, 20, 10} 인 경우에 가장 긴 감소하는 부분 수열은 A = {10, 30, 10, 20, 20, 10}  이고, 
길이는 3이다.

입력
첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다.

둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ Ai ≤ 1,000)

출력
첫째 줄에 수열 A의 가장 긴 감소하는 부분 수열의 길이를 출력한다.

예제 입력 1 
6
10 30 10 20 20 10
예제 출력 1 
3
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());
//순서를 고려해서
const numSeq = input[0].split(" ").map(Number);
const dp = new Array(1000).fill(0);
for (let i = numSeq.length - 1; i >= 0; i--) {
    dp[numSeq[i]] = Math.max(...dp.slice(0, numSeq[i])) + 1;
}
console.log(Math.max(...dp));
