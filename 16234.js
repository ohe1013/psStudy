const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, L, R] = input.shift().split(" ").map(Number);

const pMap = input.map((item) => item.split(" ").map(Number));

//bfs로 접근하는게 제일 무난한가? 최대로
/**
 * visited Map을 만든다. 그리고 방문하는지 체크한다.
 * 모두 방문했으면, count를 넘긴다.
 * 4방향으로 방문하는 형식으로 방문한다.
 * L보다 크고 R보다 작으면 하나의 벌크에 넣는다.
 * visited에 행마다 다 방문했는지 체크,
 * 벌크를 만들어서 행렬에 넣는다.
 * bulk행렬넣는거, 값 넣는거 2개로 만들어서 넣는다.
 */

const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const bfs = (x, y, pMap, visited, _bulkItems, _bulkValues) => {
    _bulkItems.push([x, y]);
    _bulkValues.push(pMap[x][y]);
    visited[x][y] = true;
    for (const dir of dirs) {
        const dx = dir[0] + x;
        const dy = dir[1] + y;
        // console.log("bbb", dx, dy, visited[x][y]);
        if (dx >= 0 && dy >= 0 && dx < N && dy < N && visited[dx][dy] === false) {
            // console.log("aaa", dx, dy);
            const diff = Math.abs(pMap[dx][dy] - pMap[x][y]);
            if (diff >= L && diff <= R) {
                bfs(dx, dy, pMap, visited, _bulkItems, _bulkValues);
            }
        }
    }
    return { _bulkItems, _bulkValues };
};
let count = 0;

while (true) {
    let check = 0;
    const visitedMap = new Array(N).fill(0).map((_) => new Array(N).fill(false));
    while (true) {
        const bullkItems = [];
        const bulkValues = [];

        let x, y;
        for (let i = 0; i < N; i++) {
            const h = visitedMap[i].indexOf(false);
            if (h > -1) {
                x = i;
                y = h;
                break;
            }
        }
        // console.log(x, y);
        if (x === undefined || y === undefined) break;
        bfs(x, y, pMap, visitedMap, bullkItems, bulkValues);

        const sumBulkValue = bulkValues.reduce((prev, cur) => prev + cur, 0);
        const avgBulkValue = parseInt(sumBulkValue / bullkItems.length);
        if (bullkItems.length > 1) {
            check++;
        }
        bullkItems.forEach((item) => {
            pMap[item[0]][item[1]] = avgBulkValue;
        });
    }

    if (check === 0) break;
    count++;
}
console.log(count);
