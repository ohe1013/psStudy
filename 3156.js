const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const N = +input.shift();

input.sort((a, b) => a[5] - b[5]);
const ranks = {};
input.forEach((i) => {
    const [count, _, top, ...items] = i.split(" ");
    let temp = [];
    let temp2 = [];
    items.forEach((item, idx) => {
        Object.keys(ranks).forEach((rank) => {
            if (rank < top) {
                if (ranks[rank].includes(item)) {
                    temp.push(idx);
                }
                if (rank <= ranks[rank].length) temp2.push(parseInt(rank));
            }
        });
    });
    items.forEach((item, idx) => {
        if (temp.includes(idx)) return;
        else {
            for (let i = 1; i <= top; i++) {
                if (temp2.includes(i)) continue;
                if (ranks[i] === undefined) ranks[i] = [item];
                else ranks[i].push(item);
            }
        }
    });
});
let answer = [];
let realAnswer = [];
const max = Math.max(...Object.keys(ranks));
for (let i = max; i >= 1; i--) {
    let count = 0;
    if (ranks[i] !== undefined) {
        ranks[i].forEach((item) => {
            if (!answer.includes(item)) count++;
        });
        if (count === 1) {
            ranks[i].forEach((item) => {
                if (!answer.includes(item)) {
                    realAnswer.push([i, item]);
                    answer.push(...ranks[i]);
                }
            });
        }
    }
}
realAnswer.sort((a, b) => a[0] - b[0]);
for (let i = 0; i < realAnswer.length; i++) {
    console.log(realAnswer[i][0] + " " + realAnswer[i][1]);
}
