const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input[0].split(" ").map(Number);
const [c, ...biz] = input[1].split(" ").map(Number);
const arr = new Array(N + 1);
for (let i = 0; i < N + 1; i++) {
    arr[i] = i;
}
const find_root = (x) => {
    if (x === arr[x]) return x;
    return (arr[x] = find_root(arr[x]));
};

const union_root = (x, y) => {
    x = find_root(x);
    y = find_root(y);
    if (x != y) {
        arr[x] = y;
    }
};
for (let i = 2; i < M + 2; i++) {
    const [c, ...res] = input[i].split(" ").map(Number);
    res.sort((a, b) => a - b);
    for (let j = 1; j < c; j++) {
        union_root(res[j], res[0]);
    }
}
let count = 0;
const _biz = biz
    .sort((a, b) => a - b)
    .map((item) => {
        return find_root(item);
    });
for (let i = 2; i < M + 2; i++) {
    const [c, ...res] = input[i].split(" ").map(Number);
    let temp = 0;
    for (let j = 0; j < c; j++) {
        if (!_biz.includes(find_root(res[j]))) {
            temp++;
        }
    }
    if (temp !== 0) count++;
}
console.log(count);
