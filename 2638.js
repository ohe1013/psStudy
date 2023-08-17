const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);

const map = input.map((item) => item.split(" ").map(Number));

const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

const newSet = new Set();
const sumArr = (arr) => {
    return arr.reduce((prev, cur) => prev + cur.reduce((p, c) => p + c, 0), 0);
};
let count = 0;
while (true) {
    count++;
    const real = [];
    const queue = [[0, 0]];
    const visited = input.map((item) => item.split(" ").map((i) => 0));
    while (queue.length) {
        const q = queue.pop();

        for (let dir of dirs) {
            const newX = dir[0] + q[0];
            const newY = dir[1] + q[1];

            if (0 <= newX && newX < N && 0 <= newY && newY < M && visited[newX][newY] === 0) {
                if (map[newX][newY] === 0) {
                    queue.push([newX, newY]);
                    visited[newX][newY] = 1;
                }
                if (map[q[0]][q[1]] === 0 && map[newX][newY] === 1) {
                    if (real.includes(JSON.stringify([newX, newY]))) {
                        newSet.add(JSON.stringify([newX, newY]));
                    }
                    real.push(JSON.stringify([newX, newY]));
                }
            }
        }
    }
    newSet.forEach((item) => {
        const b = JSON.parse(item);
        map[b[0]][b[1]] = 0;
    });
    if (sumArr(map) === 0) {
        break;
    }
}

console.log(count);
