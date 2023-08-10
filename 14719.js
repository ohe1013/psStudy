const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);
const [H, W] = input[0].split(" ").map(Number);
const wallList = input[1].split(" ").map(Number);
const visited = new Array(W).fill(false);
const rightFindMax = (arr) => {
    const max = Math.max(...arr);
    const idx = arr.indexOf(max);
    return idx;
};
const leftFindMax = (arr) => {
    const max = Math.max(...arr);
    const idx = arr.lastIndexOf(max);
    return idx;
};
const setVisit = (start, end) => {
    for (let i = start; i < end; i++) {
        visited[i] = true;
    }
};
const makeList = (arr, start, end) => {
    const temp = [];
    for (let i = start; i < end; i++) {
        temp.push(arr[i]);
    }
    return temp;
};
let leftBreakPoint = rightFindMax(wallList);
let rightBreakPoint = rightFindMax(wallList) + 1;
const leftEnd = 0;
const rightEnd = W - 1;
const arrL = [];
const arrR = [];
while (true) {
    const leftSide = wallList.slice(leftEnd, leftBreakPoint);
    const newLeftBreakPoint = leftFindMax(leftSide);
    if (leftBreakPoint === newLeftBreakPoint + 1) {
        if (leftBreakPoint === leftEnd) break;
        leftBreakPoint = newLeftBreakPoint;
        continue;
    }
    arrL.push(makeList(wallList, newLeftBreakPoint, leftBreakPoint));
    leftBreakPoint = newLeftBreakPoint;
    if (leftBreakPoint === leftEnd) break;
}
while (true) {
    const rightSide = wallList.slice(rightBreakPoint);
    const newRightBreakPoint = rightFindMax(rightSide) + rightBreakPoint;
    if (newRightBreakPoint === rightBreakPoint) {
        if (rightBreakPoint === rightEnd) break;
        rightBreakPoint = newRightBreakPoint + 1;
        continue;
    }
    arrR.push(makeList(wallList, rightBreakPoint, newRightBreakPoint + 1));
    if (rightBreakPoint === rightEnd) break;
    rightBreakPoint = newRightBreakPoint;
}
let sum = 0;
arrL.forEach((item) => {
    if (item.length < 2) {
        return;
    }
    for (let i = 1; i < item.length; i++) {
        sum += item[0] - item[i];
    }
});
arrR.forEach((item) => {
    if (item.length < 2) {
        return;
    }
    for (let i = 0; i < item.length - 1; i++) {
        sum += item[item.length - 1] - item[i];
    }
});

console.log(sum);
