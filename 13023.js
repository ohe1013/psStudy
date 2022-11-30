const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

const [N, M] = input.shift().split(" ").map(Number);

const visited = new Array(N).fill(false);
const arr = new Array(N).fill(0);
let answer = [];
for (let i = 0; i < N; i++) {
    arr[i] = new Array();
}
input.forEach((item) => {
    const [a, b] = item.split(" ").map(Number);
    arr[a].push(b);
    arr[b].push(a);
});
const answerArr = [];
const dfs = (cur) => {
    visited[cur] = true;
    answer.push(cur);

    if (answer.length === 5) {
        console.log(1);
        process.exit();
    }
    for (let i = 0; i < arr[cur].length; i++) {
        const next = arr[cur][i];
        if (visited[next] === false) {
            dfs(next);
        }
    }
    visited[cur] = false;
    answer.pop();
};
for (let i = 0; i < N; i++) {
    dfs(i);
}
console.log(0);
