const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const log = console.log;

const [R, C, T] = input.shift().split(" ").map(Number);
const map = [];
const cleaner = [];
for (let i = 0; i < R; i++) {
    const line = input[i].split(" ").map(Number);
    for (let j = 0; j < C; j++) {
        if (line[j] === -1) cleaner.push(i);
    }
    map.push(line);
}
let count = 0;

const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const okayToGo = (loc, dir) => {
    const x = loc[0] + dir[0];
    const y = loc[1] + dir[1];
    if (x >= 0 && y >= 0 && x < R && y < C) {
        if (cleaner.includes(x) && y == 0) {
            return { okay: false };
        }
        return { okay: true, pos: [x, y] };
    }
    return { okay: false };
};
const doCleaner = () => {
    let idx = 0;
    for (const c of cleaner) {
        if (idx % 2 === 0) {
            const pushedLine = [-1, 0, ...map[c].slice(1, C - 1)];
            const tempValue = map[0][C - 1];
            for (let i = 0; i < c; i++) {
                map[i][C - 1] = map[i + 1][C - 1];
            }
            map[c] = pushedLine;
            const pulledLine = [...map[0].slice(1, C - 1), tempValue, map[0][C - 1]];
            for (let i = c - 1; i > 0; i--) {
                map[i][0] = map[i - 1][0];
            }
            map[0] = pulledLine;
        } else {
            const pushedLine = [-1, 0, ...map[c].slice(1, C - 1)];
            const tempValue = map[R - 1][C - 1];
            for (let i = R - 1; i >= c; i--) {
                map[i][C - 1] = map[i - 1][C - 1];
            }
            map[c] = pushedLine;
            const pulledLine = [...map[R - 1].slice(1, C - 1), tempValue, map[R - 1][C - 1]];
            for (let i = c + 1; i < R - 1; i++) {
                map[i][0] = map[i + 1][0];
            }
            map[R - 1] = pulledLine;
        }
        idx++;
    }
};
while (count !== T) {
    let pushList = [];
    for (let i = 0; i < R; i++) {
        const line = map[i];
        for (let j = 0; j < C; j++) {
            if (line[j] >= 5) {
                const [val, loc] = [line[j], [i, j]];
                const divVal = (val / 5) >> 0;
                for (const dir of dirs) {
                    const okay = okayToGo(loc, dir);
                    if (okay.okay) {
                        pushList.push([divVal, okay.pos]);
                        map[loc[0]][loc[1]] -= divVal;
                    }
                }
            }
        }
    }
    for (const push of pushList) {
        const [val, loc] = push;
        map[loc[0]][loc[1]] += val;
    }
    doCleaner();
    count++;
}
const answer = map.reduce((prev, cur) => {
    return cur.reduce((p, c) => p + c, 0) + prev;
}, 0);
log(answer + 2);
