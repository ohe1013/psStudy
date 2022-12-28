const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
/*
    순차적으로 진행되야한다.
    root에 있는 값부터 다 돌면서 값을 넣으면서, 더 큰 값이 있다면 그 값을 넣으면된다.
    근데 해당 값에 도달하지 않은 값일 수 있다.
    근데 상관없다. 결국 모든값은 돋라하고 체크할 수 있다.
*/

const N = +input.shift();
const dp = new Array(N + 1).fill(0);
const dpOriginal = new Array(N + 1).fill(0);
let toGo = new Array(N + 1).fill(0);
let indegrees = new Array(N + 1).fill(0);
let queue = [];
toGo = toGo.map(() => new Array());

input.forEach((line, iIndex) => {
    line.split(" ")
        .map(Number)
        .forEach((item, lIndex) => {
            if (item === -1) {
                return;
            }
            if (lIndex === 0) {
                dp[iIndex + 1] = item;
                dpOriginal[iIndex + 1] = item;
            } else {
                toGo[item].push(iIndex + 1);
                indegrees[iIndex + 1]++;
            }
        });
});
for (let i = 1; i <= N; i++) {
    if (indegrees[i] === 0) {
        queue.push(i);
    }
}
while (queue.length) {
    const from = queue.shift();
    for (const next of toGo[from]) {
        indegrees[next]--;
        if (indegrees[next] === 0) queue.push(next);
        dp[next] = Math.max(dp[next], dp[from] + dpOriginal[next]);
    }
}
dp.shift();
console.log(dp.join("\n"));
