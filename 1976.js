const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const cityCount = +input.shift();
const toGoCityCount = +input.shift();

const map = [];

for (let i = 0; i < cityCount; i++) {
    map.push(input[i].split(" ").map(Number));
}

const toGoList = input[input.length - 1].split(" ").map((item) => parseInt(item) - 1);
const parent = new Array(cityCount).fill(0).map((_, idx) => _ + idx);
function find_root(x) {
    //x가 root이면, 그대로 반환한다.
    if (x === parent[x]) return x;
    parent[x] = find_root(parent[x]);
    return find_root(parent[x]);
}

function union_root(x, y) {
    //x, y 정점의 최상위 정점을 각각 찾는다. (속한 트리의 루트 노드를 찾는다.)
    x = find_root(x);
    y = find_root(y);
    if (x < y) {
        parent[y] = x;
    } else {
        parent[x] = y;
    }
}

map.forEach((line, lIdx) => {
    console.log(parent);
    line.forEach((item, idx) => {
        if (item === 1) {
            union_root(lIdx, idx);
        }
    });
});
for (let i = 0; i < toGoCityCount - 1; i++) {
    if (find_root(toGoList[i]) !== find_root(toGoList[i + 1])) {
        return console.log("NO");
    }
}
console.log("YES");
