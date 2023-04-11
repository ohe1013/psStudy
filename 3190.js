const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const N = parseInt(input[0]);
const L = parseInt(input[1]);

const arr = new Array(N + 1).fill(0).map(() => new Array(N + 1).fill(0));

for (let i = 2; i < 2 + L; i++) {
    const [x, y] = input[i].split(" ");
    arr[x][y] = 1;
}

const D = parseInt(input[2 + L]);

let time = 0;
let curLoc = [1, 1];
const tails = new Array(10001);
let head = 10000;
tails[head] = [1, 1];
class Dir {
    dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    constructor(idx) {
        this.idx = idx;
    }
    changeDir(dir) {
        if (dir === "D") {
            this.idx++;
            if (this.idx === 4) {
                this.idx = 0;
            }
        } else {
            this.idx--;
            if (this.idx === -1) {
                this.idx = 3;
            }
        }
    }
    curDir() {
        return this.dirs[this.idx];
    }
}

const dir = new Dir(0);
let currentDir = dir.curDir();
for (let i = 3 + L; i < 3 + L + D; i++) {
    const [t, d] = input[i].split(" ");

    while (time < t) {
        time++;
        curLoc = [currentDir[0] + tails[head][0], currentDir[1] + tails[head][1]];
        if (JSON.stringify(tails.slice(head)).indexOf(JSON.stringify(curLoc)) > 0) {
            console.log(time);
            process.exit();
        }
        if (curLoc[0] < 1 || curLoc[1] < 1 || curLoc[0] > N || curLoc[1] > N) {
            console.log(time);
            process.exit();
        }
        head--;
        tails[head] = curLoc;
        if (arr[curLoc[0]][curLoc[1]] === 1) {
            arr[curLoc[0]][curLoc[1]] = 0;
        } else {
            tails.pop();
        }
    }
    dir.changeDir(d);
    currentDir = dir.curDir();
}
while (true) {
    time++;
    curLoc = [currentDir[0] + tails[head][0], currentDir[1] + tails[head][1]];
    if (JSON.stringify(tails.slice(head)).indexOf(JSON.stringify(curLoc)) > 0) {
        console.log(time);
        process.exit();
    }
    if (curLoc[0] < 1 || curLoc[1] < 1 || curLoc[0] > N || curLoc[1] > N) {
        console.log(time);
        process.exit();
    }
    head--;
    tails[head] = curLoc;
    if (arr[curLoc[0]][curLoc[1]] === 1) {
        arr[curLoc[0]][curLoc[1]] = 0;
    } else {
        tails.pop();
    }
}
