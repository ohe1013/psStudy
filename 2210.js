const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const answer = new Set();

const arr = new Array();

input.forEach((item) => {
    arr.push(item.split(" "));
});

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const dfs = (x, y, count, value) => {
    count++;
    if (count === 6) {
        answer.add(value);
        return;
    }
    for (let i = 0; i < 4; i++) {
        if (x + dx[i] >= 0 && x + dx[i] < 5 && y + dy[i] >= 0 && y + dy[i] < 5) {
            dfs(x + dx[i], y + dy[i], count, value + arr[x + dx[i]][y + dy[i]]);
        }
    }
};
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        dfs(i, j, 0, arr[i][j]);
    }
}

console.log(answer.size);
