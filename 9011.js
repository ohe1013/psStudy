const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);
/* 
 * 
 * 문제
n개의 정수로 된 순서 S= (s1, s2, ..., sn)가 있다. 
여기서 si ≠ sj이고, 1 ≤ si ≤ n이다. 
S로부터 새로운 순서 R = (r1, r2, ..., rn)을 얻을 수 있는데, 
여기서 ri는 S의 부분 순서 {s1, s2, ..., si-2, si-1} 중에서 si보다 작은 수의 개수이다.


n = 10인 경우의 예를 보자. S = (6, 4, 3, 5, 1, 2, 7, 8, 9, 10)이라면 
R = (0, 0, 0, 2, 0, 1, 6, 7, 8, 9)이 된다.

어떤 순서 R이 주어질 때, 여러분은 R을 이용하여 
S를 찾는 프로그램을 작성하어야 한다. 
경우에 따라서는 R로부터 S를 찾는 것이 불가능할 수 있다. 

예를 들어, 만약 n = 5이고, R = (0, 2, 2, 0, 1)이라면 
이런 R에 대응하는 S는 존재하지 않는다.

입력
입력 데이터는 표준입력을 사용한다. 입력은 T개의 테스트 데이터로 구성된다. 입력의 첫 번째 줄에는 입력 데이터의 수를 나타내는 정수 T가 주어진다. 
각 테스트 데이터의 첫째 줄에는 S에 있는 정수의 개수 n (1 ≤ n ≤ 100)이 주어진다. 
그 다음 줄에는 n개의 정수로 된 R이 주어진다. 

출력
출력은 표준출력을 사용한다. 주어진 각 순서 R 에 대해, 대응하는 순서 S 를 찾아 한 줄에 출력하여야 한다. 만약 R로부터 S를 찾는 것이 불가능할 경우에 “IMPOSSIBLE”을 출력한다.

예제 입력 1 
3
10
0 0 0 2 0 1 6 7 6 9
10
0 0 0 0 0 0 0 0 0 0
12
0 3 4 5 0 1 2 3 4 5 6 7
예제 출력 1 
6 4 3 5 1 2 8 9 7 10
10 9 8 7 6 5 4 3 2 1
IMPOSSIBLE
 */
const N = +input.shift();
const answer = [];
let idx = 0;
const findLess = (arr, key) => {
    return arr.filter((val) => val < key).length;
};

while (N * 2 > idx) {
    const val = +input[idx];
    idx++;
    const rArr = input[idx].split(" ");
    idx++;
    let numSet = new Array(val).fill(1).map((item, idx) => val - idx - 1);
    let ans = "";
    for (let i = rArr.length - 1; i >= 0; i--) {
        const sum = findLess(numSet, Math.max(...numSet));
        const diff = sum - rArr[i];
        if (diff < 0) {
            ans = "IMPOSSIBLE";
            break;
        }
        ans = +numSet.splice(diff, 1) + 1 + " " + ans;
    }
    console.log(ans);
}
