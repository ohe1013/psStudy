const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const log = console.log;

const L = {};
L.map = function* map(f, iter) {
    for (const a of iter) {
        console.log(f(a));
        return f(a);
    }
};
const take = (length, iter) => {
    const res = [];
    for (const a of iter) {
        if (res.length === length) return res;
        res.push(a);
    }
    return res;
};

const [row, col] = input.shift().split(" ").map(Number);
let pointList = [];
let removeList = [];
const cMap = [];
for (let i = 0; i < row; i++) {
    const line = input[i].split(" ").map(Number);
    cMap.push(line);
    for (let j = 0; j < col; j++) {
        if (line[j] === 1) {
            pointList.push([i, j]);
        }
    }
}
const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
];
let count = 0;
const canGo = (newPos) => {
    const [x, y] = newPos;
    if (x > 0 && y > 0 && x < row && y < row) return true;
    return false;
};

const isAir = (newPos) => {
    const [x, y] = newPos;
    if (cMap[x][y] === 0) return true;
    return false;
};
let sum = 0;

const bfs = () => {};

while (pointList.length > 0) {
    pointList.forEach((point) => {
        const [x, y] = point;
        for (const dir of dirs) {
            const newPos = [x + dir[0], y + dir[1]];
            if (canGo(newPos) && isAir(newPos)) {
                removeList.push([x, y]);
                return;
            }
        }
    });
    removeList.forEach((remove) => {
        const [x, y] = remove;
        cMap[x][y] = 0;
    });
    console.log(pointList);
    if (pointList.length === removeList.length) {
        sum = pointList.length;
    }
    removeList = [];
    pointList = [];
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (cMap[i][j] === 1) {
                pointList.push([i, j]);
            }
        }
    }

    count++;
}
console.log(sum, count);
