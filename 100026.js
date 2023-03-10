const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

const N = input.length;
const map = new Array(N).fill(0).map((_, i) => input[i].split(""));

const boolArr = new Array(N).fill(0).map(() => new Array(N).fill(0));

const d = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const dfs = (x, y, c) => {
  if (boolArr[x][y] === true) return;
  else {
    for (let i = 0; i < 4; i++) {
      let dx = d[i][0] + x;
      let dy = d[i][1] + y;
      if (dx < 0 || dx > N - 1 || dy < 0 || dy > N - 1) continue;
      if (map[dx][dy] == c && boolArr[dx][dy] === false) {
        console.log(1);
        boolArr[x][y] = true;
        dfs(dx, dy, c);
        boolArr[x][y] = false;
      }
    }
  }
};
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    dfs(i, j, "R");
  }
}
dfs(0, 0, "G");
