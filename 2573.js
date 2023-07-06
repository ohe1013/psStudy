const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [r, c] = input.shift().split(" ").map(Number);

const makeStringToArray = (item) => item.split(" ");

const mapStringToNumber = (item) => item.map(Number);

const pipe =
    (...fns) =>
    (arr) =>
        arr.map((x) => fns.reduce((v, f) => f(v), x));

const pipeWithMap = pipe(makeStringToArray, mapStringToNumber);

const iceMap = pipeWithMap(input);
let icePoints = [];
for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
        if (iceMap[i][j] !== 0) {
            icePoints.push([i, j, iceMap[i][j]]);
        }
    }
}
const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const findTrue = (visit) => {
    let y;
    for (let i = 0; i < r; i++) {
        y = visit[i].findIndex((item) => item === false);
        if (y != -1) {
            return true;
        }
    }
    return false;
};
const isOkayToCheck = (x, y) => {
    if (x >= 0 && y >= 0 && x < r && y < c) {
        return true;
    } else {
        return false;
    }
};
const makeBulk = (x, y, visit) => {
    for (const dir of dirs) {
        const dx = x + dir[0];
        const dy = y + dir[1];
        if (isOkayToCheck(dx, dy) && visit[dx][dy] === false) {
            visit[dx][dy] = true;
            makeBulk(dx, dy, visit);
        }
    }
};
const checkAround = (x, y, iceMap) => {
    let count = 0;
    for (dir of dirs) {
        const dx = dir[0] + x;
        const dy = dir[1] + y;
        if (isOkayToCheck(dx, dy)) {
            if (iceMap[dx][dy] === 0) count++;
        }
    }
    return count;
};
let count = 0;
while (icePoints.length > 0) {
    const tempPoints = [...icePoints];
    const visitedArr = iceMap.map((item) =>
        item.map((i) => {
            if (i === 0) return true;
            else return false;
        })
    );
    makeBulk(tempPoints[0][0], tempPoints[0][1], visitedArr);
    if (findTrue(visitedArr)) {
        return console.log(count);
    }
    tempPoints.forEach((point) => {
        const [x, y, val] = point;
        const countAroundZero = checkAround(x, y, iceMap);
        point[2] = val - countAroundZero;
    });

    tempPoints.forEach((point) => {
        const [x, y, val] = point;
        if (val <= 0) {
            iceMap[x][y] = 0;
        } else {
            iceMap[x][y] = val;
        }
    });
    icePoints = tempPoints.filter((point) => point[2] > 0);
    count++;
}
console.log(0);
