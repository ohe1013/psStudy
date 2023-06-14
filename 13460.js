const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const mapSize = input.shift().split(" ").map(Number);

const board = [];
const DIR = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1],
};
const red = [0, 0];
const blue = [0, 0];

input.forEach((row, rowIdx) => {
    const line = row.split("");
    if (line.indexOf("B") > 0) {
        blue[0] = rowIdx;
        blue[1] = line.indexOf("B");
    }
    if (line.indexOf("R") > 0) {
        red[0] = rowIdx;
        red[1] = line.indexOf("R");
    }
    board.push(line);
});
const checkRedFirst = (red, blue, dir) => {
    if (
        (dir === "U" && red[0] < blue[0]) ||
        (dir === "D" && red[0] > blue[0]) ||
        (dir === "L" && red[1] < blue[1]) ||
        (dir === "R" && red[1] > blue[1])
    ) {
        return true;
    } else {
        return false;
    }
};

const moveBall = (ball, ohter, dir, type) => {
    while (true) {
        const nx = DIR[dir][0] + ball[0];
        const ny = DIR[dir][1] + ball[1];
        if (nx === ohter[0] && ny === ohter[1]) {
            break;
        } else if (board[nx][ny] === ".") {
            ball[0] = nx;
            ball[1] = ny;
        } else if (board[nx][ny] === "O") {
            ball[0] = -1;
            ball[1] = -1;
            break;
        } else {
            break;
        }
    }
};

function check(ball) {
    if (ball[0] === -1 && ball[1] === -1) return true;
    else return false;
}
const queue = [[...red, ...blue, 1]];
let answer = Infinity;
while (queue.length > 0) {
    const [red_x, red_y, blue_x, blue_y, cnt] = queue.pop();
    for (let dir of Object.keys(DIR)) {
        const reds = [red_x, red_y];
        const blues = [blue_x, blue_y];
        if (checkRedFirst(reds, blues, dir)) {
            moveBall(reds, blues, dir, "R");
            moveBall(blues, reds, dir, "B");
        } else {
            moveBall(blues, reds, dir, "B");
            moveBall(reds, blues, dir, "R");
        }

        if (check(blues)) {
            continue;
        }
        if (check(reds)) {
            answer = answer < cnt ? answer : cnt;
            break;
        }
        if (cnt === 10) continue;

        queue.push([...reds, ...blues, cnt + 1]);
    }
}
if (answer === Infinity) return console.log(-1);
console.log(answer);
