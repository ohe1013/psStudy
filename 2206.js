const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);
//그냥 벽 만나면 무조건 한번 부수기 1회 허용권을 준다. 그리고 진행

const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

const canGo = (x, y, visited) => {
    if (x >= 0 && x < N && y >= 0 && y < M && visited[x][y] === 0) {
        visited[x][y] = 1;
        return true;
    }
    return false;
};

const map = input.map((item) => item.split("").map(Number));
const visited = input.map((item) => item.split("").map((item) => 0));
let answer = -1;
const bfs = (queue, visited, map, coin, count) => {
    const val = queue.pop();
    if (val[0] === N - 1 && val[1] === M - 1) {
        answer = count;
        return;
    }
    for (const dir of dirs) {
        const [newX, newY] = [val[0] + dir[0], val[1] + dir[1]];
        if (canGo(newX, newY, visited)) {
            if (coin === 1) {
                if (map[newX][newY] === 1) {
                    queue.push([newX, newY]);
                    bfs(queue, visited, map, coin - 1, count + 1);
                    visited[val[0]][val[1]] = 0;
                    bfs([val[0], val[1]], visited, map, coin, count);
                } else {
                    queue.push([newX, newY]);
                    bfs(queue, visited, map, coin, count + 1);
                }
            } else {
                if (map[newX][newY] === 0) {
                    queue.push([newX, newY]);
                    bfs(queue, visited, map, coin, count + 1);
                }
            }
        }
    }
};
bfs([[0, 0]], visited, map, 1, 1);
console.log(answer);

// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const splitType = process.platform === "linux" ? "\n" : "\r\n";
// const input = fs.readFileSync(filePath).toString().trim().split(splitType);

// const [N, M] = input.shift().split(" ").map(Number);
// //그냥 벽 만나면 무조건 한번 부수기 1회 허용권을 준다. 그리고 진행

// const dirs = [
//     [0, 1],
//     [0, -1],
//     [1, 0],
//     [-1, 0],
// ];

// const canGo = (x, y) => {
//     if (x >= 0 && x < N && y >= 0 && y < M) {
//         return true;
//     }
//     return false;
// };

// class Node {
//     constructor(x, y, cnt, isBreak) {
//         this.x = x;
//         this.y = y;
//         this.cnt = cnt;
//         this.isBreak = isBreak;
//         this.next = null;
//     }
// }
// class Queue {
//     constructor() {
//         this.head = null;
//         this.tail = null;
//         this.size = 0;
//     }
//     push(x, y, cnt, isBreak) {
//         let node = new Node(x, y, cnt, isBreak);
//         if (this.size === 0) {
//             this.head = node;
//         } else {
//             this.tail.next = node;
//         }
//         this.tail = node;
//         this.size++;
//     }
//     shift() {
//         let temp = this.head;
//         if (this.size === 0) {
//             this.head = null;
//             this.tail = null;
//         } else {
//             this.head = this.head.next;
//         }
//         this.size--;
//         return temp;
//     }
//     get length() {
//         return this.size;
//     }
// }

// const visited = Array.from({ length: N }, () =>
//     Array.from({ length: M }, () => Array.from({ length: 2 }, () => 0))
// );

// const graph = [];
// for (let i = 0; i < N; i++) {
//     const isBreak = input[i].split("").map(Number);
//     graph.push(isBreak);
// }
// let answer = -1;
// let queue = new Queue();
// queue.push(0, 0, 1, 0);
// while (queue.length) {
//     let q = queue.shift();
//     const [x, y, cnt, isBreak] = [q.x, q.y, q.cnt, q.isBreak];
//     if (x === N - 1 && y === M - 1) {
//         answer = cnt;
//         break;
//     }
//     if (visited[x][y][isBreak]) continue;
//     else visited[x][y][isBreak] = 1;

//     for (let dir of dirs) {
//         const xPos = x + dir[0];
//         const yPos = y + dir[1];
//         if (canGo(xPos, yPos)) {
//             let nextIsBreak = isBreak;
//             if (graph[xPos][yPos]) {
//                 if (!nextIsBreak) nextIsBreak = 1;
//                 else continue;
//             }
//             queue.push(xPos, yPos, cnt + 1, nextIsBreak);
//         } else {
//             continue;
//         }
//     }
// }
// console.log(answer);
