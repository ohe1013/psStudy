const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [r, c] = input.shift().split(" ").map(Number);
/**
 * 테트리미노는 총 5가지 타입이있다.
 * ㅣ, ㄱ , ㅗ, ㅁ, ㄹ
 */

const visited = new Array(r).fill(0).map((_) => new Array(c).fill(false));
const map = input.map((i) => i.split(" ").map(Number));

const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
];
let answer = 0;
const dfs = (x, y, count, value) => {
    if (count === 4) {
        answer = answer > value ? answer : value;
        return;
    }

    for (const dir of dirs) {
        const nx = dir[0] + x;
        const ny = dir[1] + y;
        if (nx >= 0 && ny >= 0 && nx < r && ny < c && !visited[nx][ny]) {
            if (count === 2) {
                visited[nx][ny] = true;
                dfs(x, y, count + 1, value + map[nx][ny]);
                visited[nx][ny] = false;
            }
            visited[nx][ny] = true;
            dfs(nx, ny, count + 1, value + map[nx][ny]);
            visited[nx][ny] = false;
        }
    }
};
for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
        dfs(i, j, 0, 0);
    }
}

console.log(answer);
