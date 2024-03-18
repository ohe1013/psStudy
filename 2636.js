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
const canGo = (newPos, visited) => {
  const [x, y] = newPos;
  if (
    x >= 0 &&
    y >= 0 &&
    x < row &&
    y < col &&
    visited[x][y] === false &&
    cMap[x][y] === 0
  ) {
    return true;
  }
  return false;
};

const isAir = (newPos) => {
  const [x, y] = newPos;
  if (cMap[x][y] === 0) return true;
  return false;
};
let sum = 0;
/**
 * start point를 00으로 시작
 * 1씩 늘려가면서 start point를 이동한다.
 * 한번 다 순회하면서 1이 있는 점들을 찾는다.
 * 해당 점들은 모두 외부에 있는 것이므로 list에 넣으면된다.
 *
 */

let x = 0;
let y = 0;
const bfs = (loc, removeList) => {
  const visited = new Array(row)
    .fill(0)
    .map((item) => new Array(col).fill(false));
  const queue = [loc];

  while (queue.length > 0) {
    const curLoc = queue.pop();
    for (const dir of dirs) {
      const dx = curLoc[0] + dir[0];
      const dy = curLoc[1] + dir[1];
      if (canGo([dx, dy], visited)) {
        removeList.push([dx, dy]);
        visited[dx][dy] = true;
        queue.push([dx, dy]);
      }
    }
  }
  return removeList;
};

let count = 0;
while (x < (row / 2) >> 0) {
  let _sum = 0;
  count++;
  const removeList = [[x, y]];
  const newRL = bfs([x, y], removeList);
  _sum = 0;
  newRL.forEach((rl) => {
    for (const dir of dirs) {
      const [x, y] = [rl[0] + dir[0], rl[1] + dir[1]];

      if (x >= 0 && y >= 0 && x < row && y < col && cMap[x][y] === 1) {
        cMap[x][y] = 0;
        _sum++;
      }
    }
  });
  if (_sum === 0) break;
  sum = _sum;
  x++;
  y = x;
}
console.log([count - 1, sum].join("\n"));
// while (pointList.length > 0) {
//     pointList.forEach((point) => {
//         const [x, y] = point;
//         for (const dir of dirs) {
//             const newPos = [x + dir[0], y + dir[1]];
//             if (canGo(newPos) && isAir(newPos)) {
//                 removeList.push([x, y]);
//                 return;
//             }
//         }
//     });
//     removeList.forEach((remove) => {
//         const [x, y] = remove;
//         cMap[x][y] = 0;
//     });
//     console.log(pointList);
//     if (pointList.length === removeList.length) {
//         sum = pointList.length;
//     }
//     removeList = [];
//     pointList = [];
//     for (let i = 0; i < row; i++) {
//         for (let j = 0; j < col; j++) {
//             if (cMap[i][j] === 1) {
//                 pointList.push([i, j]);
//             }
//         }
//     }

//     count++;
// }
// console.log(sum, count);
