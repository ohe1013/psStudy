const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = +input.shift();
const map = input.map((item) => item.split(""));
const rgMap = input.map((item) => item.split("").map((i) => (i === "G" ? "R" : i)));
const dirs = [
    [0, 1],
    [-1, 0],
    [1, 0],
    [0, -1],
];
const same = (visited, arr, type, pos) => {
    const [x, y] = pos;
    if (x >= 0 && x < N && y >= 0 && y < N && visited[x][y] === false && arr[x][y] === type) {
        visited[x][y] = true;
        return true;
    } else {
        return false;
    }
};
const findBulk = (visited, arr, type, postion) => {
    visited[postion[0]][postion[1]] = true;
    const queue = [postion];
    while (queue.length > 0) {
        const popV = queue.pop();
        for (const dir of dirs) {
            const newPos = [popV[0] + dir[0], popV[1] + dir[1]];
            if (same(visited, arr, type, newPos)) {
                queue.push(newPos);
            }
        }
    }
};
const findFalse = (visited) => {
    for (r in visited) {
        for (c in visited[+r]) {
            if (visited[+r][+c] === false) {
                return [+r, +c];
            }
        }
    }
    return null;
};
const answer = [];
let count = 0;
let visited = new Array(N).fill(0).map((item) => new Array(N).fill(false));
while (true) {
    const check = findFalse(visited);
    if (check) {
        findBulk(visited, map, map[check[0]][check[1]], check);
    } else {
        break;
    }
    count++;
}
answer.push(count);
count = 0;
visited = new Array(N).fill(0).map((item) => new Array(N).fill(false));
while (true) {
    const check = findFalse(visited);
    if (check) {
        findBulk(visited, rgMap, rgMap[check[0]][check[1]], check);
    } else {
        break;
    }
    count++;
}

answer.push(count);

console.log(answer.join(" "));
