const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M, K] = input[0].split(" ").map(Number);
const numList = input.slice(1, N + 1).map(Number);
const operList = input.slice(N + 1);

const segTree = [];
const initSegTree = (sIdx, eIdx, idx) => {
    if (sIdx === eIdx) {
        segTree[idx] = numList[sIdx];
        return segTree[idx];
    }
    const mid = parseInt((sIdx + eIdx) / 2);
    segTree[idx] = initSegTree(sIdx, mid, idx * 2) + initSegTree(mid + 1, eIdx, idx * 2 + 1);
    return segTree[idx];
};
initSegTree(0, N - 1, 1);

const sumSegTree = (sIdx, eIdx, idx, left, right) => {
    segTree
};
