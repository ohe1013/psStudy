const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);
/**
 * 정수 N과 K가 주어졌을 때, 다음 두 조건을 만족하는 문자열 S를 찾는 프로그램을 작성하시오.

문자열 S의 길이는 N이고, 'A', 'B'로 이루어져 있다.
문자열 S에는 0 ≤ i < j < N 이면서 s[i] == 'A' && s[j] == 'B'를 만족하는 (i, j) 쌍이 K개가 있다.
입력
첫째 줄에 N과 K가 주어진다. (2 ≤ N ≤ 50, 0 ≤ K ≤ N(N-1)/2)

출력
AAAAAAAAAA 0
BBBBBBBBBB 0
AAAAAAAAAB
BBBBBBBBBA 0
BAABBABAAB
B가 A 앞에 있으면 그냥 없는 칸이다. 계산에 포함하지 않는다.
AAAAAAAAAB 하면 9
B의 갯수로 만들 수 있는 값
B가 1개라면 9 부터 0
B가 2개라면 16 부터 0 
B가 3개라면 21 부터 0
B가 4개라면 24 부터 0
B가 5개라면 25 부터 0
AAAABBB 12가 최대
첫째 줄에 문제의 조건을 만족하는 문자열 S를 출력한다. 가능한 S가 여러 가지라면, 아무거나 출력한다. 만약, 그러한 S가 존재하지 않는 경우에는 -1을 출력한다.
 */

let [N, K] = input.shift().split(" ").map(Number);
let maxArr = [];
for (let i = 0; i <= N / 2; i++) {
    maxArr.push(i * (N - i));
}
if (K > Math.max(...maxArr)) return console.log(-1);
for (let i = 0; i < maxArr.length - 1; i++) {
    const [min, max] = [maxArr[i], maxArr[i + 1]];
    if (min <= K && K <= max) {
        let diff = max - K;
        let temp = "A".repeat(N - i - 1) + "B".repeat(i + 1);
        let idx = 0;
        while (diff > 0) {
            let currentIdx = temp.slice(idx).indexOf("B");
            if (currentIdx === 0) {
                idx++;
                continue;
            }
            temp = temp.slice(0, currentIdx + idx - 1) + "BA" + temp.slice(currentIdx + idx + 1);
            diff--;
        }
        console.log(temp);
    }
}
