const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);
const arr = [];
for (let i = 0; i <= N; i++) {
    arr.push(i);
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
const answer = [];
input.forEach((item) => {
    const [type, x, y] = item.split(" ").map(Number);
    if (type === 0) {
        union_root(x, y);
    } else {
        if (find_root(x) === find_root(y)) {
            answer.push("YES");
        } else {
            answer.push("NO");
        }
    }
});

console.log(answer.join("\n"));
