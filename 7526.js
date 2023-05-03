const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);

const box = [];
box.push(new Array(N + 2).fill(-1));
for (let j = 0; j < M; j++) {
    box.push([-1, ...input[j].split(" ").map(Number), -1]);
}
box.push(new Array(N + 2).fill(-1));
const queue = [];
const s = new Array(M + 2).fill(0).map(() => new Array(N + 2).fill(false));
for (let j = 0; j < M + 2; j++) {
    for (let i = 0; i < N + 2; i++) {
        if (box[j][i] === -1) {
            s[j][i] = true;
        }
        if (box[j][i] === 1) {
            s[j][i] = true;
            queue.push([j, i]);
        }
    }
}
let index = 0;
const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

let answer = 0;

while (index < queue.length) {
    const temp = [...queue.slice(index)];
    while (temp.length > 0) {
        const [i, j] = temp.pop();
        s[i][j] = true;
        for (let dir of dirs) {
            if (s[dir[0] + i][dir[1] + j] === false) {
                s[dir[0] + i][dir[1] + j] = true;
                queue.push([dir[0] + i, dir[1] + j]);
            }
        }
        index++;
    }
    answer++;
}
for (let i = 0; i < M + 2; i++) {
    for (let j = 0; j < N + 2; j++) {
        if (s[i][j] === false) return console.log(-1);
    }
}
console.log(answer - 1);
