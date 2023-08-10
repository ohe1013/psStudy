const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [y, x, z] = input.shift().split(" ").map(Number);
let goodTList = [];
const tomatoMap = new Array(z)
    .fill(0)
    .map((item) => new Array(x).fill(0).map(() => new Array(y).fill(false)));
let rottenCount = 0;
let sum = 0;
for (let i = 0; i < z; i++) {
    for (let j = i * x; j < i * x + x; j++) {
        const list = input[j].split(" ").map(Number);
        for (let k = 0; k < y; k++) {
            if (list[k] === 1) {
                goodTList.push([j - i * x, k, i]);
                rottenCount++;
                tomatoMap[i][j - i * x][k] = true;
            }
            if (list[k] === -1) {
                rottenCount++;
                tomatoMap[i][j - i * x][k] = true;
            }
        }
    }
}
const goal = y * x * z;
sum = rottenCount;
const dirs = [
    [0, 0, 1],
    [0, 0, -1],
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
];

const canGo = (_x, _y, _z) => {
    if (
        _x >= 0 &&
        _x < x &&
        _y >= 0 &&
        _y < y &&
        _z < z &&
        _z >= 0 &&
        tomatoMap[_z][_x][_y] === false
    ) {
        return true;
    }
    return false;
};
let count = 0;
while (sum !== goal) {
    if (goodTList.length === 0) {
        if (sum !== goal) {
            count = -1;
            break;
        }
    }
    let temp = [];
    goodTList.forEach((goodT) => {
        const [x, y, z] = goodT;
        for (const dir of dirs) {
            const newX = x + dir[0];
            const newY = y + dir[1];
            const newZ = z + dir[2];
            if (canGo(newX, newY, newZ)) {
                temp.push([newX, newY, newZ]);
                tomatoMap[newZ][newX][newY] = true;
                sum++;
            }
        }
    });
    goodTList = temp;
    count++;
}
console.log(count);
