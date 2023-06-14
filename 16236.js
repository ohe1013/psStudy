const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());
const lShark = {
    x: 0,
    y: 0,
    size: 2,
};
const arr = [];
//지나면 true으로 바꿈 for bfs
let max_x = 20,
    max_y = 20,
    max_dist = 401;
let visited;
let min_x, min_y, min_dist;
const initVisited = () => {
    min_x = max_x;
    min_y = max_y;
    min_dist = max_dist;
    visited = new Array(20).fill(0).map((item) => new Array(20).fill(-1));
};

input.forEach((item, rowIdx) => {
    const line = item.split(" ").map(Number);
    if (line.indexOf(9) > 0) {
        lShark.x = rowIdx;
        lShark.y = line.indexOf(9);
    }
    arr.push(line);
});
arr[lShark.x][lShark.y] = 0;
const dir = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
];
const bfs = (x, y) => {
    const q = [];
    visited[x][y] = 0;
    q.push([x, y]);
    while (q.length > 0) {
        let cur = q.shift();
        let x = cur[0];
        let y = cur[1];
        for (let i = 0; i < 4; i++) {
            let dx = dir[i][1] + x;
            let dy = dir[i][0] + y;

            if (dx < 0 || dx > N - 1 || dy < 0 || dy > N - 1) continue;
            if (visited[dx][dy] !== -1 || arr[dx][dy] > lShark.size) continue;

            visited[dx][dy] = visited[x][y] + 1;

            if (arr[dx][dy] != 0 && arr[dx][dy] < lShark.size) {
                if (min_dist > visited[dx][dy]) {
                    min_x = dx;
                    min_y = dy;
                    min_dist = visited[dx][dy];
                } else if (min_dist == visited[dx][dy]) {
                    if (min_x === dx) {
                        if (min_y > dy) {
                            min_x = dx;
                            min_y = dy;
                        }
                    } else if (min_x > dx) {
                        min_x = dx;
                        min_y = dy;
                    }
                }
            }
            q.push([dx, dy]);
        }
    }
};
let result = 0;
let eat_cnt = 0;
while (true) {
    initVisited();
    bfs(lShark.x, lShark.y);
    if (min_x != max_x && min_y != max_y) {
        result += visited[min_x][min_y];
        eat_cnt += 1;
        if (eat_cnt === lShark.size) {
            lShark.size = lShark.size + 1;
            eat_cnt = 0;
        }
        arr[min_x][min_y] = 0;
        lShark.x = min_x;
        lShark.y = min_y;
    } else {
        break;
    }
}
console.log(result);
