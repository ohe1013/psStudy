const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);
const [i, j, d] = input.shift().split(" ").map(Number);
let answer = 0;
const dirMap = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
];
const getDir = (num) => {
    return dirMap[num % 4];
};
const checkCurrent = (x, y) => {
    if (room[x][y] === 0) return true;
    else return false;
};
const clean = (x, y) => {
    answer++;
    room[x][y] = 3;
};
const checkAround = (x, y) => {
    for (let dir of dirMap) {
        if (room[dir[0] + x][dir[1] + y] === 0) return true;
    }
    return false;
};
/**
 * 현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
현재 칸의 주변 
4칸 중 청소되지 않은 빈 칸이 없는 경우,
바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
현재 칸의 주변 
$4$칸 중 청소되지 않은 빈 칸이 있는 경우,
반시계 방향으로 
$90^\circ$ 회전한다.
바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
1번으로 돌아간다.
 */
const room = [];
let robot = {
    x: i + 1,
    y: j + 1,
    dir: 4 - d,
};
room.push(new Array(M + 2).fill(1));
for (let i = 0; i < N; i++) {
    let line = input[i].split(" ").map(Number);
    line = [1, ...line, 1];
    room.push(line);
}
room.push(new Array(M + 2).fill(1));
while (true) {
    if (checkCurrent(robot.x, robot.y)) {
        clean(robot.x, robot.y);
    }
    if (checkAround(robot.x, robot.y)) {
        while (true) {
            robot.dir++;
            const [x, y] = getDir(robot.dir);
            if (room[robot.x + x][robot.y + y] === 0) {
                robot.x = robot.x + x;
                robot.y = robot.y + y;
                break;
            }
        }
    } else {
        const [x, y] = getDir(robot.dir);
        if (room[robot.x - x][robot.y - y] === 1) {
            break;
        } else {
            robot.x = robot.x - x;
            robot.y = robot.y - y;
        }
    }
}
console.log(answer);
